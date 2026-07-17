import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const base = process.env.BASE_URL || 'http://localhost:3300';
const out = new URL('../test-results/', import.meta.url);
await fs.mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

async function runViewport(name, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  for (const path of ['/', '/residencial', '/saude']) {
    const page = await context.newPage();
    const errors = [];
    const failed = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => failed.push(`${request.url()} :: ${request.failure()?.errorText}`));
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1300);
    await page.screenshot({ path: new URL(`${name}-${path === '/' ? 'home' : path.slice(1)}-hero.png`, out).pathname });

    const layout = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    }));
    if (layout.scrollWidth > layout.clientWidth + 2) errors.push(`horizontal overflow: ${layout.scrollWidth} > ${layout.clientWidth}`);
    if (!layout.h1) errors.push('missing h1');

    if (name === 'desktop') {
      const sections = path === '/' ? ['#projetos', '#sobre', '#contato'] : path === '/residencial' ? ['#diferenciais', '#processo', '#portfolio', '#depoimentos', '#faq'] : ['#diferenciais', '#processo', '#portfolio', '#sobre'];
      for (const selector of sections) {
        const section = page.locator(selector);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);
        await section.screenshot({ path: new URL(`${name}-${path === '/' ? 'home' : path.slice(1)}-${selector.slice(1)}.png`, out).pathname });
      }
    }
    results.push({ name, path, layout, errors, failed });
    await page.close();
  }
  await context.close();
}

await runViewport('desktop', { width: 1440, height: 900 });
await runViewport('mobile', { width: 390, height: 844 });

const expectedNav = ['Home', 'Camila Caruso', 'Projetos', 'Orçamento', 'Residencial', 'Saúde'];
const expectedLocalNav = {
  '/residencial': ['Início', 'Diferenciais', 'Processo', 'Portfólio', 'Depoimentos', 'Sobre', 'FAQ', 'Contato'],
  '/saude': ['Início', 'Diferenciais', 'Processo', 'Portfólio', 'Sobre', 'Contato'],
};

const requiredCopy = {
  '/': [
    'Trazendo uma experiência para você, transformando o seu ambiente.',
    'Projetos de Arquitetura Residenciais e Comerciais.',
    'Universidade Braz Cubas',
    'Gerenciamento de Obras',
    'projetos residenciais, comerciais e públicos',
    'CEO & Fundadora',
    'Solicite um orçamento.',
    'Avenida Vereador Narciso Yague Guimarães, 1145',
  ],
  '/residencial': [
    'Arquitetura que entende você.',
    'Atendimento integral e personalizado',
    'Da ideia à realidade, com maestria.',
    'Histórias de clientes satisfeitos.',
    'Karin Aradchnilzoff Vieira',
    'Kely Christie Fernandes',
    'Perguntas frequentes.',
    'Escutamos, compreendemos, criamos e entregamos com excelência.',
  ],
  '/saude': [
    'Arquitetura especializada para saúde',
    'RDC 50',
    'Transforme seu espaço em um diferencial competitivo.',
    'Da análise regulatória à clínica pronta.',
    'Hospital Albert Einstein',
    'Sua clínica está pronta para o próximo nível?',
  ],
};

async function runResponsiveAudit(name, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  for (const path of ['/', '/residencial', '/saude']) {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const audit = await page.evaluate(({ copy }) => {
      const root = document.documentElement;
      const header = document.querySelector('header')?.getBoundingClientRect();
      const hero = document.querySelector('main > section')?.getBoundingClientRect();
      const h1 = document.querySelector('h1')?.getBoundingClientRect();
      const brokenImages = [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);
      const oversizedImages = [...document.images]
        .filter((image) => {
          const box = image.getBoundingClientRect();
          return image.complete && image.naturalWidth > 0 && box.width > image.naturalWidth * 1.15;
        })
        .map((image) => ({ src: image.currentSrc || image.src, rendered: Math.round(image.getBoundingClientRect().width), natural: image.naturalWidth }));
      const bodyText = (document.body.textContent || '').replace(/\s+/g, ' ');
      return {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        header: header && { top: header.top, bottom: header.bottom },
        hero: hero && { top: hero.top, right: hero.right, bottom: hero.bottom, left: hero.left },
        h1: h1 && { top: h1.top, right: h1.right, bottom: h1.bottom, left: h1.left },
        brokenImages,
        oversizedImages,
        missingCopy: copy.filter((text) => !bodyText.includes(text)),
      };
    }, { copy: requiredCopy[path] });

    if (audit.scrollWidth > audit.clientWidth + 2) errors.push(`horizontal overflow: ${audit.scrollWidth} > ${audit.clientWidth}`);
    if (!audit.hero || !audit.h1 || !audit.header) errors.push('missing hero/header geometry');
    if (audit.h1 && audit.hero && (audit.h1.left < -1 || audit.h1.right > viewport.width + 1 || audit.h1.top < audit.hero.top - 1 || audit.h1.bottom > audit.hero.bottom + 1)) errors.push(`hero title outside hero/viewport: ${JSON.stringify(audit.h1)}`);
    if (audit.brokenImages.length) errors.push(`broken images: ${audit.brokenImages.join(', ')}`);
    if (audit.oversizedImages.length) errors.push(`images rendered above source width: ${JSON.stringify(audit.oversizedImages)}`);
    if (audit.missingCopy.length) errors.push(`missing original copy: ${audit.missingCopy.join(' | ')}`);

    let labels;
    if (viewport.width >= 1280) {
      labels = await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link').allTextContents();
    } else {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      const mobileNav = page.getByRole('navigation', { name: 'Menu móvel' });
      labels = await mobileNav.getByRole('link').allTextContents();
      const menuBox = await mobileNav.boundingBox();
      if (!menuBox || menuBox.width < Math.min(viewport.width - 28, 292)) errors.push('mobile menu is not correctly sized');
      await page.getByRole('button', { name: 'Fechar menu' }).click();
    }
    labels = labels.map((label) => label.replace(/\d+$/, '').trim()).filter((label) => label !== 'Fale conosco');
    if (JSON.stringify(labels) !== JSON.stringify(expectedNav)) errors.push(`global navigation order: ${JSON.stringify(labels)}`);

    if (path !== '/') {
      const localName = path === '/saude' ? 'Seções de Saúde' : 'Seções de Residencial';
      const localLabels = (await page.getByRole('navigation', { name: localName }).getByRole('link').allTextContents()).map((label) => label.trim());
      if (JSON.stringify(localLabels) !== JSON.stringify(expectedLocalNav[path])) errors.push(`local navigation order: ${JSON.stringify(localLabels)}`);
    }

    results.push({ responsive: name, viewport, path, errors, audit });
    await page.close();
  }
  await context.close();
}

for (const item of [
  ['mobile-compact', { width: 320, height: 568 }],
  ['mobile-standard', { width: 360, height: 800 }],
  ['tablet-portrait', { width: 768, height: 1024 }],
  ['tablet-landscape', { width: 1024, height: 768 }],
  ['laptop', { width: 1280, height: 800 }],
  ['desktop-wide', { width: 1920, height: 1080 }],
]) await runResponsiveAudit(item[0], item[1]);

// Home interaction and WebGL checks.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: /Ideias ganham forma/ }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  const canvas = page.locator('canvas');
  const canvasCount = await canvas.count();
  if (canvasCount !== 1) throw new Error(`Expected one WebGL canvas, found ${canvasCount}`);
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox || canvasBox.width < 300 || canvasBox.height < 300) throw new Error('Canvas is not correctly sized');
  const frameA = await canvas.screenshot({ path: new URL('desktop-canvas.png', out).pathname });
  await page.mouse.move(canvasBox.x + canvasBox.width * .78, canvasBox.y + canvasBox.height * .3);
  await page.waitForTimeout(900);
  const frameB = await canvas.screenshot();
  const first = await sharp(frameA).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const second = await sharp(frameB).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let sum = 0;
  let sumSquare = 0;
  let frameDiff = 0;
  for (let index = 0; index < first.data.length; index += 3) {
    const luminance = first.data[index] * .2126 + first.data[index + 1] * .7152 + first.data[index + 2] * .0722;
    sum += luminance;
    sumSquare += luminance * luminance;
    frameDiff += Math.abs(first.data[index] - second.data[index]) + Math.abs(first.data[index + 1] - second.data[index + 1]) + Math.abs(first.data[index + 2] - second.data[index + 2]);
  }
  const pixels = first.data.length / 3;
  const mean = sum / pixels;
  const standardDeviation = Math.sqrt(sumSquare / pixels - mean * mean);
  const meanFrameDiff = frameDiff / first.data.length;
  if (standardDeviation < 12) throw new Error(`Canvas pixel variance too low: ${standardDeviation.toFixed(2)}`);
  if (meanFrameDiff < .15) throw new Error(`Canvas is not moving/interacting: frame diff ${meanFrameDiff.toFixed(3)}`);

  const galleryButton = page.locator('button[aria-label^="Ampliar projeto"]');
  if (await galleryButton.count() < 1) throw new Error('Portfolio buttons missing');
  await galleryButton.first().click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Próximo projeto' }).click();
  await page.getByRole('button', { name: 'Fechar imagem' }).click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  results.push({ interaction: 'home lightbox + animated process canvas', ok: true, canvasPixels: { standardDeviation: Number(standardDeviation.toFixed(2)), meanFrameDiff: Number(meanFrameDiff.toFixed(3)) } });
  await context.close();
}

// Global page order and anchor offsets.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const mainNav = page.getByRole('navigation', { name: 'Navegação principal' });
  await mainNav.getByRole('link', { name: 'Camila Caruso' }).click();
  await page.waitForTimeout(1800);
  const about = await page.locator('#sobre').evaluate((element) => ({ top: Math.round(element.getBoundingClientRect().top), y: Math.round(scrollY) }));
  await mainNav.getByRole('link', { name: 'Projetos' }).click();
  await page.waitForTimeout(1800);
  const projects = await page.locator('#projetos').evaluate((element) => ({ top: Math.round(element.getBoundingClientRect().top), y: Math.round(scrollY) }));
  if (about.top < 82 || about.top > 86) throw new Error(`Desktop About anchor offset is ${about.top}px, expected 84px`);
  if (projects.top < 82 || projects.top > 86) throw new Error(`Desktop Projects anchor offset is ${projects.top}px, expected 84px`);
  if (projects.y <= about.y) throw new Error(`Home page order is not linear: Projects ${projects.y} <= About ${about.y}`);
  results.push({ interaction: 'home linear navigation + desktop anchors', ok: true, about, projects });
  await context.close();
}

// Specialty pages retain the global shell and expose contextual navigation below it.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/residencial`, { waitUntil: 'networkidle' });
  const localNav = page.getByRole('navigation', { name: 'Seções de Residencial' });
  await localNav.getByRole('link', { name: 'Processo' }).click();
  await page.waitForTimeout(1800);
  const geometry = await page.evaluate(() => {
    const target = document.querySelector('#processo')?.getBoundingClientRect();
    const nav = document.querySelector('nav[aria-label="Seções de Residencial"]')?.parentElement?.parentElement?.getBoundingClientRect();
    const visibleSection = nav ? document.elementFromPoint(innerWidth / 2, nav.bottom + 2)?.closest('section')?.id : null;
    return { targetTop: target && Math.round(target.top), navBottom: nav && Math.round(nav.bottom), visibleSection };
  });
  if (!geometry.targetTop || geometry.targetTop < 70 || geometry.targetTop > 145) throw new Error(`Specialty anchor offset is invalid: ${JSON.stringify(geometry)}`);
  if (geometry.visibleSection !== 'processo') throw new Error(`Previous section remains visible below specialty navigation: ${JSON.stringify(geometry)}`);
  results.push({ interaction: 'specialty contextual navigation + anchor', ok: true, geometry });
  await context.close();
}

// Mobile menu.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  const menu = page.getByRole('button', { name: 'Abrir menu' });
  await menu.click();
  await page.getByRole('navigation', { name: 'Menu móvel' }).waitFor({ state: 'visible' });
  await page.waitForTimeout(350);
  await page.getByRole('navigation', { name: 'Menu móvel' }).getByRole('link', { name: /Camila Caruso/ }).click();
  await page.waitForTimeout(1800);
  const aboutTop = await page.locator('#sobre').evaluate((element) => Math.round(element.getBoundingClientRect().top));
  if (aboutTop < 70 || aboutTop > 74) throw new Error(`Mobile About anchor offset is ${aboutTop}px, expected 72px`);
  results.push({ interaction: 'mobile menu + anchor', ok: true, aboutTop });
  await context.close();
}

// Residential FAQ and form.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(`${base}/residencial`, { waitUntil: 'networkidle' });
  const faq = page.getByRole('button', { name: 'Como funciona o acompanhamento durante a obra?' });
  await faq.click();
  if ((await faq.getAttribute('aria-expanded')) !== 'true') throw new Error('FAQ did not expand');
  await page.locator('input[placeholder="Seu nome"]').fill('Teste Qualidade');
  await page.locator('input[placeholder="(11) 98765-4321"]').fill('(11) 99999-9999');
  await page.locator('input[placeholder="voce@email.com"]').fill('teste@example.com');
  const popupPromise = context.waitForEvent('page');
  await page.getByRole('button', { name: 'Iniciar meu projeto' }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded').catch(() => {});
  if (!popup.url().includes('whatsapp.com') && !popup.url().includes('wa.me')) throw new Error(`Unexpected form destination: ${popup.url()}`);
  await page.getByRole('status').waitFor({ state: 'visible' });
  await popup.close();
  results.push({ interaction: 'residential FAQ + form', ok: true });
  await context.close();
}

// Health form follows the specialty-specific WhatsApp flow.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${base}/saude`, { waitUntil: 'networkidle' });
  await page.locator('input[placeholder="Seu nome"]').fill('Teste Saúde');
  await page.locator('input[placeholder="(11) 98765-4321"]').fill('(11) 99999-9999');
  await page.locator('input[placeholder="voce@email.com"]').fill('saude@example.com');
  const popupPromise = context.waitForEvent('page');
  await page.getByRole('button', { name: 'Agendar consulta de viabilidade' }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded').catch(() => {});
  if (!popup.url().includes('whatsapp.com') && !popup.url().includes('wa.me')) throw new Error(`Unexpected health form destination: ${popup.url()}`);
  await page.getByRole('status').waitFor({ state: 'visible' });
  await popup.close();
  results.push({ interaction: 'health form', ok: true });
  await context.close();
}

// Legacy redirects.
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${base}/residencial.html`);
  if (!page.url().endsWith('/residencial')) throw new Error('Residential legacy redirect failed');
  await page.goto(`${base}/saude.html`);
  if (!page.url().endsWith('/saude')) throw new Error('Health legacy redirect failed');
  results.push({ interaction: 'legacy redirects', ok: true });
  await context.close();
}

await fs.writeFile(new URL('qa-results.json', out), JSON.stringify(results, null, 2));
await browser.close();

const problems = results.flatMap((item) => [
  ...(item.errors ?? []).map((message) => `${item.name ?? item.responsive} ${item.path}: ${message}`),
  ...(item.failed ?? []).map((message) => `${item.name ?? item.responsive} ${item.path}: ${message}`),
]);
console.log(JSON.stringify({ checks: results.length, problems }, null, 2));
if (problems.length) process.exitCode = 1;
