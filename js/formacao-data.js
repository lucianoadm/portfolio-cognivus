/* ==========================================================================
   Dados do painel de formação.
   Campos:
     h      horas (número; 4h42min = 4.7). null quando não se aplica.
     status concluido | andamento | pratico
     nota   texto curto exibido junto às horas (ex.: "carga total do curso")
     local  exibido no lugar das horas quando h é null
   Para atualizar o painel, edite apenas este arquivo: os totais são calculados.
   ========================================================================== */
window.FORMACAO_EIXOS = [
  {
    id: 1,
    titulo: 'Gestão de negócios, processos e compliance',
    itens: [
      { nome: 'Bacharelado em Administração de Empresas', inst: 'Faculdade Dehoniana', h: 3150, status: 'concluido', desc: 'Base sólida em governança corporativa, finanças e engenharia de processos organizacionais.' },
      { nome: 'MBA Executivo em Gestão de Negócios e Marketing', inst: 'Faculdade Cândido Mendes', h: 600, status: 'concluido', desc: 'Tomada de decisão de alto nível, cenários estratégicos e gestão mercadológica.' },
      { nome: 'Extensão em Compliance e Proteção de Dados', inst: 'PCRS / Escola de Direito', h: 10, status: 'concluido', desc: 'Governança, ESG, normas ISO e tratamento de dados pessoais (LGPD).' },
      { nome: 'Fundamentos de ESG', inst: 'FM2S', h: 7, status: 'concluido', desc: 'Economia circular, stakeholders e indicadores de sustentabilidade.' },
      { nome: 'Responsabilidade Jurídica nos Ambientes Digitais', inst: 'Gran Faculdade', h: 30, status: 'concluido', desc: 'Mitigação de riscos legais e compliance no ciberespaço.' },
      { nome: 'Introdução à Lei Brasileira de Proteção de Dados (LGPD)', inst: 'ENAP', h: 10, status: 'concluido', desc: 'Marco legal, bases de tratamento e direitos dos titulares.' },
      { nome: 'Privacidade e Proteção de Dados (LGPD)', inst: 'SENAI', h: 4, status: 'concluido', desc: 'Governança de dados, anonimização e deveres das empresas.' },
      { nome: 'Auditoria de Qualidade e Processos', inst: 'Certificações internas', h: 80, status: 'pratico', desc: 'Mapeamento de fluxos de produção, rastreabilidade e melhoria contínua de rotinas.' }
    ]
  },
  {
    id: 2,
    titulo: 'Jurimetria e Business Intelligence',
    itens: [
      { nome: 'Pós-graduação (Especialização) em Jurimetria', inst: 'Faculdade Unyleya', h: 420, status: 'andamento', nota: 'carga total do curso', desc: 'Aplicação de Ciência de Dados e Estatística ao universo jurídico.' },
      { nome: 'Microsoft Power BI para Business Intelligence', inst: 'Data Science Academy', h: 72, status: 'concluido', desc: 'Arquitetura e modelagem de dados com dashboards dinâmicos.' },
      { nome: 'Trilha Data Science (Excel avançado e dashboards)', inst: 'Alura', h: 60, status: 'concluido', desc: 'Simulação de cenários, tabelas dinâmicas, lógica booleana e análise de padrões.' },
      { nome: 'Trilha Power BI (ETL, DAX e visualização)', inst: 'Alura', h: 32, status: 'concluido', desc: 'Dashboards ponta a ponta, ETL com Power Query e cálculos em DAX.' },
      { nome: 'Análise de Dados e Inteligência de Negócios', inst: 'Gran Faculdade', h: 30, status: 'concluido', desc: 'Extração de valor e insights a partir de dados operacionais.' },
      { nome: 'Estatística Geral (conceitos e dispersão)', inst: 'IFRS / ENAP', h: 60, status: 'concluido', desc: 'Medidas de posição, dispersão e análise quantitativa.' },
      { nome: 'Excel com Inteligência Artificial (bootcamp)', inst: 'DIO / Santander', h: 26, status: 'concluido', desc: 'Integração de planilhas operacionais com ferramentas de IA.' },
      { nome: 'Análise de Dados em Linguagem R', inst: 'ENAP', h: 20, status: 'concluido', desc: 'Programação funcional para manipulação estatística e ciência de dados.' },
      { nome: 'Big Data em Apoio à Tomada de Decisão', inst: 'ENAP', h: 25, status: 'concluido', desc: 'Arquiteturas de Big Data para embasar processos corporativos.' },
      { nome: 'Governança de Dados', inst: 'ENAP', h: 30, status: 'concluido', desc: 'Políticas, qualidade e ciclo de vida da informação institucional.' },
      { nome: 'Introdução à Jurimetria', inst: 'Adequa Cursos', h: 80, status: 'concluido', desc: 'Análise quantitativa de risco processual e predição estratégica.' }
    ]
  },
  {
    id: 3,
    titulo: 'Inteligência Artificial e engenharia de prompts',
    itens: [
      { nome: 'Trilha Inteligência Artificial Generativa e Prompts', inst: 'Alura', h: 28, status: 'concluido', desc: 'Prompts eficazes e potencial generativo em ferramentas como o ChatGPT.' },
      { nome: 'Processamento de Linguagem Natural (PLN)', inst: 'ENAP', h: 25, status: 'concluido', desc: 'Tratamento de textos não estruturados e compreensão computacional da linguagem.' },
      { nome: 'Análise de Sentimentos em Computação', inst: 'UFRGS', h: 20, status: 'concluido', desc: 'Classificação de sentimentos via PLN e aplicações em machine learning.' },
      { nome: 'Fluência em IA Responsável (Framework 4D)', inst: 'Anthropic Academy', h: 8, status: 'concluido', desc: 'Delegação, descrição, discernimento e diligência no uso de LLMs.' },
      { nome: 'Fluência e Fundamentos da Inteligência Artificial', inst: 'SENAI', h: 8, status: 'concluido', desc: 'IA para produtividade, tomada de decisão e ferramentas corporativas (Copilot).' },
      { nome: 'Ética na Inteligência Artificial', inst: 'SENAI', h: 4, status: 'concluido', desc: 'Pilares da IA responsável, marco legal e mitigação de vieses algorítmicos.' },
      { nome: 'Prompting Responsável: Maximizar a IA', inst: 'Santander / Microsoft', h: 8, status: 'concluido', desc: 'Uso ético e seguro de IA em ambientes de negócios.' },
      { nome: 'Engenharia de Prompt Eficaz e IA para Justiça', inst: 'ENAP / Bradesco', h: 4, status: 'concluido', desc: 'Desenho lógico de prompts para extração de dados jurídicos.' }
    ]
  },
  {
    id: 4,
    titulo: 'Engenharia de software, infraestrutura e portfólio',
    itens: [
      { nome: 'Imersão prática autodidata em software e segurança', inst: 'Desenvolvimento acelerado', h: 860, status: 'pratico', desc: 'Ciclo intensivo de codificação ponta a ponta e arquitetura de software de dados.' },
      { nome: 'Arquitetura de microsserviços e APIs para IA', inst: 'Curso técnico', h: 180, status: 'pratico', desc: 'Modelagem de microsserviços integrados para o tráfego de dados.' },
      { nome: 'Portfólio Cognivus: web apps de dados com Streamlit', inst: 'Desenvolvimento prático', h: 160, status: 'pratico', desc: 'Aplicações dinâmicas em Python com deploy real em nuvem.' },
      { nome: 'Portfólio de interface: aplicações web estruturadas', inst: '88+ projetos HTML', h: 140, status: 'pratico', desc: 'Projetos funcionais com HTML5, CSS3, JavaScript e formatos JSON/CSV.' },
      { nome: 'Modelagem de bancos de dados NoSQL', inst: 'Firebase e Firestore', h: 80, status: 'pratico', desc: 'Persistência de dados em tempo real em arquitetura escalável na nuvem.' },
      { nome: 'DevOps, infraestrutura e segurança de redes', inst: 'GitHub / Vercel', h: 45, status: 'pratico', desc: 'Esteiras CI/CD, segurança em DNS e apontamento de domínios.' },
      { nome: 'Integração de gateways de pagamento e configuração de nuvem', inst: 'Implementação nativa', h: 10, status: 'pratico', desc: 'Checkout, gestão de chaves de API, webhooks e segurança transacional.' },
      { nome: 'Trilha Fundamentos de Nuvem', inst: 'AWS Acelera Brasil', h: 4.7, status: 'concluido', desc: 'Arquitetura em nuvem, segurança e infraestrutura global AWS.' },
      { nome: 'AWS AI Practitioner: Semana 1', inst: 'AWS Acelera Brasil', h: 5 + 14 / 60, status: 'concluido', desc: 'Conceitos de IA generativa e serviços de machine learning na AWS.' }
    ]
  },
  {
    id: 5,
    titulo: 'Ciências jurídicas e fundamentos',
    itens: [
      { nome: 'Bacharelado em Direito', inst: 'Faculdade Anhanguera de Taubaté', h: 3700, status: 'andamento', nota: 'carga total do curso', desc: 'Graduação com foco em Direito Digital e corporativo.' },
      { nome: 'Estágio profissional em Direito Público', inst: 'Setor público', h: null, local: 'Taubaté-SP', status: 'andamento', desc: 'Atuação prática e operacional no ambiente do setor público.' }
    ]
  },
  {
    id: 6,
    titulo: 'Comunicação, storytelling e oratória',
    itens: [
      { nome: 'Comunicação Assertiva: Oratória e Retórica', inst: 'ENAP', h: 50, status: 'concluido', desc: 'Expressão oral clara e estruturação de narrativas persuasivas.' },
      { nome: 'Storytelling com Dados para Comunicação Profissional', inst: 'ENAP', h: 25, status: 'concluido', desc: 'Tradução de métricas complexas em insights de fácil leitura.' },
      { nome: 'Comunicação Escrita Corporativa', inst: 'Fundação Bradesco', h: 40, status: 'concluido', desc: 'Padronização linguística e estrutura formal de textos de negócios.' },
      { nome: 'Contador de Histórias', inst: 'SENAC', h: 16, status: 'concluido', desc: 'Descrição de fatos, engajamento e expressividade.' },
      { nome: 'Produção musical: composição e desenvolvimento', inst: 'Autodidata, com IA assistida', h: 35, status: 'pratico', desc: 'Storytelling e comunicação emocional por meio de arranjos e engenharia de áudio.' }
    ]
  }
];
