export const contact = {
  primaryPhone: '+55 11 94512-1017',
  primaryPhoneDigits: '5511945121017',
  officePhone: '+55 11 98485-0828',
  officePhoneDigits: '5511984850828',
  email: 'camila@camilacarusoarquiteta.com.br',
  instagram: 'https://www.instagram.com/camilacarusoarquiteta',
  facebook: 'https://www.facebook.com/camilacarusoarquiteta/',
  address: 'Avenida Vereador Narciso Yague Guimarães, 1145, sala 1214, Jardim Armênia, Mogi das Cruzes - SP, 08780-000, Brasil',
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${contact.primaryPhoneDigits}?text=${encodeURIComponent(message)}`;

export const messages = {
  general:
    'Olá, vim através do site e gostaria de conversar sobre um projeto de arquitetura.',
  residential:
    'Olá! Vim pela página de arquitetura residencial e tenho interesse em um projeto para minha casa. Podemos conversar sobre as opções?',
  health:
    'Olá! Cheguei até vocês pela página de arquitetura para clínicas e gostaria de saber mais sobre projetos, reformas e adequações. Podem me ajudar?',
};

export const homeFeaturedProjects = [
  { src: '/assets/residential/casa-fazenda-itapety.jpg', title: 'Casa Fazenda Itapety', location: 'Residencial · exteriores', ratio: 'landscape', size: 'feature' },
  { src: '/assets/residential/apto-passeo.jpg', title: 'Apartamento Passeo', location: 'Residencial · interiores', ratio: 'landscape' },
  { src: '/assets/residential/apto-passeo-escritorio.jpg', title: 'Apartamento Passeo', location: 'Interiores', ratio: 'landscape' },
  { src: '/assets/health/IMG_5447.jpg', title: 'Instituto Dra. Karin Ardach', location: 'Saúde · Mogi das Cruzes', ratio: 'portrait' },
  { src: '/assets/health/IMG_5316.jpg', title: 'Espaço de Especialidades CESAP', location: 'Saúde · Guararema', ratio: 'portrait' },
  { src: '/assets/health/IMG_5507.jpg', title: 'Instituto Dra. Karin Ardach', location: 'Saúde · Mogi das Cruzes', ratio: 'portrait' },
  { src: '/assets/residential/casa-horizontes-04.jpg', title: 'Casa Horizontes', location: 'Residencial · exteriores', ratio: 'landscape', size: 'feature' },
];

export const homeArchiveProjects = [
  '/assets/home/projeto-1.jpg',
  '/assets/home/projeto-2.jpg',
  '/assets/home/projeto-3.jpg',
  '/assets/home/projeto-4.jpg',
  '/assets/home/portfolio-5.jpg',
  '/assets/home/portfolio-6.jpeg',
  '/assets/home/portfolio-7.jpeg',
  '/assets/home/portfolio-8.jpeg',
  '/assets/home/projeto-9.jpg',
  '/assets/home/projeto-10.jpg',
  '/assets/home/projeto-11.jpg',
  '/assets/home/projeto-12.jpg',
].map((src, index) => ({
  src,
  title: `Projeto autoral ${String(index + 1).padStart(2, '0')}`,
  location: 'Acervo do escritório',
  ratio: 'square',
  size: 'compact',
  lowResolution: true,
}));

export const homeStory = [
  'Camila Caruso está no mercado há 20 anos. Formada pela Universidade Braz Cubas, com pós-graduação em Gerenciamento de Projetos, tem seu amor pela arquitetura desde muito pequena. Passou a infância e a juventude explorando e admirando as estruturas arquitetônicas das cidades por onde passou.',
  'Em suas viagens, conheceu edifícios elaborados por arquitetos renomados no Brasil e no exterior, ampliando ainda mais seu repertório e sua paixão pela profissão. Com atendimento totalmente personalizado, cada cliente é recebido de forma individual e integral.',
  'O escritório trabalha com projetos de Arquitetura, Decoração de Interiores e Gerenciamento de Obras. São projetos residenciais, comerciais e públicos. Cada ambiente é pensado para atender e confortar seus usuários, garantindo bem-estar do início ao fim do processo.',
];

export const residential = {
  hero: {
    eyebrow: 'Arquitetura residencial de alto padrão',
    title: 'Sua casa parece comum? Crie um lar de alto padrão que reflete sua identidade única.',
    subtitle:
      'Há 20 anos, Camila Caruso traduz sonhos em projetos de arquitetura exclusivos. Cuidamos do seu projeto do conceito à entrega, garantindo sua tranquilidade e bem-estar.',
  },
  intro: {
    title: 'Arquitetura que entende você.',
    text: 'Cada projeto é único, assim como você. Nós mergulhamos fundo em suas necessidades, sonhos e rotina para criar espaços que transcendem a estética e funcionam perfeitamente para a sua vida.',
  },
  differentiators: [
    {
      title: 'Atendimento integral e personalizado',
      text: 'Você não é mais um número. Mergulhamos na sua rotina para criar um espaço que funcione para você.',
    },
    {
      title: '20 anos de excelência e gestão',
      text: 'Unimos a sensibilidade da arquitetura à precisão da gestão.',
    },
    {
      title: 'Design que inspira',
      text: 'Criamos refúgios atemporais inspirados em referências internacionais.',
    },
  ],
  manifesto: {
    title: 'O luxo está nos detalhes — e na tranquilidade do processo.',
    paragraphs: [
      'Imagine um lar onde cada centímetro foi pensado para o seu conforto, onde a luz entra nos horários exatos, onde os materiais respiram sofisticação e durabilidade. Onde você se sente em casa, sempre.',
      'Nosso compromisso vai além do projeto: garantimos sua tranquilidade em cada etapa, desde a concepção até a entrega final.',
    ],
  },
  process: [
    {
      title: 'Imersão e briefing',
      text: 'Mergulhamos em sua realidade, desejos, rotina e limitações. Cada detalhe importa.',
    },
    {
      title: 'Estudo e conceituação',
      text: 'Desenvolvemos conceitos visuais, fluxogramas e primeiros layouts que captem a essência do seu projeto.',
    },
    {
      title: 'Projeto executivo detalhado',
      text: 'Documentação completa para execução: plantas, cortes, elevações, especificações técnicas e materiais.',
    },
    {
      title: 'Gerenciamento e execução',
      text: 'Acompanhamento integral da obra, garantindo que cada detalhe seja executado conforme concebido.',
    },
  ],
  projects: [
    { src: '/assets/residential/casa-fazenda-itapety.jpg', title: 'Casa Fazenda Itapety', location: 'Exteriores', ratio: 'landscape', size: 'feature' },
    { src: '/assets/residential/apto-landscape-16.jpeg', title: 'Apartamento Landscape', location: 'Residencial', ratio: 'landscape' },
    { src: '/assets/residential/apto-passeo.jpg', title: 'Apartamento Passeo', location: 'Residencial', ratio: 'landscape' },
    { src: '/assets/residential/apto-landscape-03.jpeg', title: 'Apartamento Landscape', location: 'Residencial', ratio: 'landscape' },
    { src: '/assets/residential/apto-passeo-escritorio.jpg', title: 'Apartamento Passeo', location: 'Interiores', ratio: 'landscape' },
    { src: '/assets/residential/casa-horizontes-04.jpg', title: 'Casa Horizontes', location: 'Exteriores', ratio: 'landscape', size: 'feature' },
    { src: '/assets/residential/casa-horizontes-02.jpg', title: 'Casa Horizontes', location: 'Exteriores', ratio: 'landscape' },
    { src: '/assets/residential/hero.jpg', title: 'Apartamento Landscape', location: 'Interiores', ratio: 'landscape' },
    { src: '/assets/residential/detail.jpeg', title: 'Apartamento Passeo — detalhe', location: 'Interiores', ratio: 'square', size: 'compact', lowResolution: true },
    { src: '/assets/residential/casa-area-externa.jpeg', title: 'Casa — área externa', location: 'Residencial', ratio: 'square', size: 'compact', lowResolution: true },
  ],
  testimonials: [
    {
      name: 'Karin Aradchnilzoff Vieira',
      type: 'Clínica',
      avatar: '/assets/testimonials/karin.png',
      text: 'Faço meus projetos com a Camila Caruso desde 2019 e sempre superou minhas expectativas. Amo o trabalho dela, da equipe do escritório, do atendimento e acolhimento quando estamos lá. Sempre impecável tanto na apresentação do projeto quanto no desenvolvimento e execução. Obrigada por tudo.',
    },
    {
      name: 'Fernanda Flor',
      type: 'Residencial',
      avatar: '/assets/testimonials/fernanda.png',
      text: 'Profissional incrível! Camila Caruso é extremamente criativa, detalhista e comprometida. Transformou minhas ideias em um projeto perfeito, superando todas as expectativas. Recomendo de olhos fechados!',
    },
    {
      name: 'Rose Zanini',
      type: 'Residencial',
      avatar: '/assets/testimonials/rose.png',
      text: 'Ótima profissional. Quando a procurei, fui atendida com atenção e carisma. Fez o projeto de minha casa considerando minhas ideias. Ficou perfeito!',
    },
    {
      name: 'Kely Christie Fernandes',
      type: 'Executiva',
      avatar: '/assets/testimonials/kely.png',
      text: 'Parabéns, Camila e equipe, por toda dedicação, capricho e comprometimento com todos os projetos! Sempre impecável.',
    },
  ],
  about: {
    title: 'Paixão que constrói, gestão que realiza.',
    paragraphs: [
      'Camila Caruso é arquiteta com 20 anos de experiência em projetos residenciais de alto padrão. Sua trajetória é marcada pela precisão técnica aliada à sensibilidade criativa, sempre buscando transformar espaços em experiências memoráveis.',
      'Formada pela FAUUBC, Camila combina estudos contínuos em design internacional com uma gestão rigorosa de projetos. Para ela, arquitetura não é apenas desenho — é entender pessoas, resolver problemas complexos e criar ambientes que sustentem a qualidade de vida de seus clientes.',
      'Seu escritório, hoje com uma equipe multidisciplinar, opera com total transparência e compromisso: do primeiro briefing até a entrega final, cada etapa é documentada, acompanhada e refinada.',
    ],
  },
  faqs: [
    {
      q: 'Qual é o valor mínimo para um projeto?',
      a: 'Não temos um valor mínimo fixo. O investimento varia conforme a complexidade, tamanho e especificações do projeto. Fazemos uma análise personalizada durante o briefing para apresentar uma proposta adequada ao seu perfil e necessidades.',
    },
    {
      q: 'Quanto tempo leva um projeto do conceito à entrega?',
      a: 'O cronograma depende do escopo. Uma reforma pode levar de 3 a 6 meses, enquanto um projeto residencial completo pode variar de 1 a 3 meses. Na primeira reunião, apresentamos um cronograma detalhado e realista com base em sua demanda específica.',
    },
    {
      q: 'Como funciona o acompanhamento durante a obra?',
      a: 'Realizamos visitas regulares à obra, com frequência definida conforme cada fase, para garantir que tudo esteja sendo executado de acordo com o projeto. Você recebe relatórios fotográficos e acompanha todo o andamento por um aplicativo de gestão de obra. Como o escritório é composto por uma equipe de arquitetos, dúvidas e ajustes são resolvidos rapidamente.',
    },
    {
      q: 'Vocês trabalham com fornecedores e construtores específicos?',
      a: 'Possuímos uma rede confiável de fornecedores e construtores com quem trabalhamos há anos. No entanto, respeitamos sua preferência por parceiros específicos. O importante é garantir qualidade, pontualidade e excelência em tudo que fazemos.',
    },
    {
      q: 'Posso fazer alterações no projeto durante a execução?',
      a: 'Sim. Mudanças são possíveis, mas devem ser feitas o mais cedo possível. Alterações durante a obra podem impactar cronograma e orçamento. Avaliamos cada solicitação e informamos transparentemente qualquer implicação. Nosso objetivo é que você fique satisfeito com o resultado final.',
    },
    {
      q: 'Qual é o diferencial de trabalhar com a Camila Caruso?',
      a: 'Combinamos 20 anos de experiência em arquitetura residencial de alto padrão com uma gestão extremamente rigorosa de projetos. Você não é apenas um cliente — é um parceiro nessa jornada. Escutamos, compreendemos, criamos e entregamos com excelência. Cada projeto é único porque você é único.',
    },
  ],
};

export const health = {
  hero: {
    eyebrow: 'Arquitetura especializada para saúde',
    title: 'Sua clínica atrai pacientes ou gera ansiedade?',
    subtitle:
      'Unimos design humanizado, fluxo de trabalho eficiente e total conformidade com as normas ANVISA / RDC 50 para posicionar sua clínica como referência.',
  },
  intro: {
    title: 'Pare de perder pacientes para clínicas mais modernas.',
    text: 'Um projeto inadequado não afeta apenas a estética. Ele impacta o fluxo da sua equipe, a percepção de valor do seu paciente e pode gerar problemas graves de fiscalização.',
  },
  differentiators: [
    {
      title: 'Especialização em normas de saúde — RDC 50',
      text: 'Dominamos as complexidades regulatórias. Garantimos que seu projeto seja aprovado na Vigilância Sanitária, evitando multas, atrasos e retrabalho.',
    },
    {
      title: 'Fluxo de trabalho e ergonomia',
      text: 'Otimizamos seu espaço para a máxima eficiência. Desenhamos fluxos limpo/sujo, aprimoramos a ergonomia da equipe e reduzimos o tempo ocioso.',
    },
    {
      title: 'Arquitetura humanizada',
      text: 'Criamos ambientes que acalmam, acolhem e aumentam a confiança do paciente no tratamento. Da acústica à iluminação, cada detalhe é pensado para o bem-estar.',
    },
    {
      title: '20 anos de experiência e gestão de obras',
      text: 'Com pós-graduação em Gerenciamento de Projetos, asseguramos que sua clínica seja entregue no prazo, dentro do orçamento e com fidelidade total ao projeto.',
    },
  ],
  manifesto: {
    title: 'Transforme seu espaço em um diferencial competitivo.',
    text: 'No mercado de saúde, o ambiente é a primeira impressão. Ele precisa comunicar a excelência do seu serviço.',
    points: [
      'Posiciona você como autoridade no seu segmento.',
      'Justifica o valor da sua consulta ou procedimento.',
      'Aumenta a fidelização, fazendo o paciente se sentir seguro e bem cuidado.',
      'Atrai os melhores profissionais para sua equipe.',
    ],
    closing: 'Seu espaço deve ser uma extensão da sua competência médica.',
  },
  process: [
    {
      title: 'Diagnóstico e briefing técnico',
      text: 'Entendemos sua especialidade, equipamentos, fluxos de atendimento e todas as necessidades regulatórias específicas.',
    },
    {
      title: 'Estudo de viabilidade e layout funcional',
      text: 'Criamos a planta baixa otimizada, definindo os fluxos e garantindo o atendimento às normas ANVISA antes de avançar para a estética.',
    },
    {
      title: 'Projeto legal, executivo e humanização',
      text: 'Detalhamos elétrica, hidráulica, gases e acabamentos de fácil assepsia, aplicando design humanizado por meio de cores, iluminação e acústica.',
    },
    {
      title: 'Gerenciamento e entrega da obra',
      text: 'Coordenamos toda a execução com fornecedores especializados e garantimos que a clínica seja entregue pronta para operar.',
    },
  ],
  projects: [
    { src: '/assets/health/IMG_5316.jpg', title: 'Espaço de Especialidades CESAP', location: 'Guararema', ratio: 'portrait', position: 'center 38%' },
    { src: '/assets/health/IMG_5507.jpg', title: 'Instituto Dra. Karin Ardach', location: 'Mogi das Cruzes / SP', ratio: 'portrait' },
    { src: '/assets/health/IMG_5357.jpg', title: 'Espaço de Especialidades CESAP', location: 'Guararema', ratio: 'portrait' },
    { src: '/assets/health/IMG_5447.jpg', title: 'Instituto Dra. Karin Ardach', location: 'Mogi das Cruzes / SP', ratio: 'portrait' },
    { src: '/assets/health/IMG_5453.jpg', title: 'Instituto Dra. Karin Ardach', location: 'Mogi das Cruzes / SP', ratio: 'portrait' },
    { src: '/assets/health/IMG_5457.jpg', title: 'Instituto Dra. Karin Ardach', location: 'Mogi das Cruzes / SP', ratio: 'portrait' },
  ],
  about: {
    title: '20 anos unindo precisão técnica e sensibilidade.',
    quote:
      'Um projeto de saúde é complexo. Ele precisa ser funcional para a equipe, acolhedor para o paciente e rigorosamente técnico para os órgãos de saúde. Encontrar esse equilíbrio é minha paixão.',
    paragraphs: [
      'Com 20 anos de mercado, Camila Caruso lidera projetos que exigem alta complexidade sem abrir mão da humanização. Sua pós-graduação em Gerenciamento de Projetos e em Arquitetura Hospitalar pelo Hospital Albert Einstein é a garantia de que sua clínica será entregue no prazo e em total conformidade.',
      'Seu atendimento personalizado assegura que as especificidades da sua especialidade médica sejam o ponto central do design.',
    ],
  },
};
