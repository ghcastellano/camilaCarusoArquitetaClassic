import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.BASE_URL || 'http://localhost:3300';
const browser = await chromium.launch({ headless: true });
const violations = [];

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-compact', width: 320, height: 568 },
]) {
  const context = await browser.newContext({ viewport });

  for (const path of ['/', '/residencial', '/saude']) {
    const page = await context.newPage();
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const report = await new AxeBuilder({ page }).analyze();
    for (const violation of report.violations) {
      if (violation.impact === 'critical' || violation.impact === 'serious') {
        violations.push({
          viewport: viewport.name,
          path,
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          nodes: violation.nodes.map((node) => ({
            target: node.target.join(' '),
            html: node.html,
            failure: node.failureSummary,
          })),
        });
      }
    }

    await page.close();
  }

  await context.close();
}

await browser.close();
console.log(JSON.stringify({ scans: 12, violations }, null, 2));
if (violations.length) process.exitCode = 1;
