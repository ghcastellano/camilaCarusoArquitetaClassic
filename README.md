# Camila Caruso Arquitetura e Interiores

Site institucional e portfólio de Camila Caruso, desenvolvido em Next.js com páginas dedicadas aos segmentos Residencial e Saúde.

## Rotas

- `/` - apresentação do escritório, trajetória, projetos e contato
- `/residencial` - diferenciais, processo, portfólio, depoimentos e FAQ
- `/saude` - arquitetura especializada para clínicas e espaços de saúde

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build
BASE_URL=http://localhost:3000 npm run qa
```

O conjunto de QA cobre responsividade de 320 a 1920 pixels, navegação, formulários, lightbox, FAQ, canvas 3D, conteúdo e acessibilidade.
