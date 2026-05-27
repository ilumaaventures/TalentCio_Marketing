export const SITE_URL = 'https://talentcio.in';

export const BRAND_TAGLINE = 'Human Intelligence + Technology = Talent Intelligence';

export const BRAND_DESCRIPTION =
  'TalentCIO is a modern talent intelligence ecosystem helping organizations attract, hire, manage and grow exceptional workforces through integrated talent solutions, intelligent workforce technology, opportunity networks and leadership communities.';

export const FOOTER_TAGLINES = [
  'Human Intelligence + Technology = Talent Intelligence',
  'Building Intelligent Talent Ecosystems',
  'Transforming Workforces Through Intelligence & Technology',
  'Connecting Talent, Technology & Opportunity'
];

export const HERO_CONTENT = {
  kicker: 'Talent Intelligence Ecosystem',
  headline: 'Transforming Workforces Through Human Intelligence & Technology',
  subheadline:
    'TalentCIO is a modern talent intelligence ecosystem helping organizations attract, hire, manage and grow exceptional workforces through integrated talent solutions, intelligent workforce technology, opportunity networks and leadership communities.',
  cta1: { label: 'Explore Solutions', href: '/solutions', event: 'explore_solutions_click' },
  cta2: { label: 'Book a Consultation', href: '/contact', event: 'book_consultation_click' },
  statCards: [
    { label: 'Talent Solutions', value: 'Human-led intelligence' },
    { label: 'Platform', value: 'Full workforce lifecycle' },
    { label: 'Community', value: 'Leadership networks' }
  ],
  preview: {
    badge: 'Talent Intelligence Suite',
    title: 'Talent Intelligence Hub',
    panels: [
      { label: 'Talent Solutions', desc: 'Human and tech-driven hiring', color: 'emerald', pct: 82 },
      {
        label: 'Platform Modules',
        desc: 'End-to-end workforce ops',
        color: 'orange',
        stages: ['Attract', 'Hire', 'Grow']
      }
    ],
    metrics: [
      { title: 'Programs', value: 'Professional growth' },
      { title: 'TalentSphere', value: 'Leadership community' },
      { title: 'CTP', value: 'Outcome-driven' }
    ]
  }
};

export const ECOSYSTEM_VERTICALS = [
  {
    id: 'solutions',
    number: '01',
    title: 'Talent Intelligence Solutions',
    subtitle:
      'Strategic talent and workforce solutions powered by industry expertise, hiring intelligence and human-centered consulting.',
    description:
      'Our Talent Intelligence Solutions vertical combines deep human expertise with data-driven hiring intelligence to deliver scalable workforce outcomes for businesses of all sizes - from startups to enterprises.',
    services: [
      { name: 'Permanent Hiring', desc: 'Strategic acquisition of full-time talent across functions and levels.' },
      { name: 'Leadership Hiring', desc: 'Senior and C-suite executive search with precision talent mapping.' },
      { name: 'Contract Staffing', desc: 'Flexible workforce solutions for project-based and interim needs.' },
      { name: 'RPO', desc: 'End-to-end Recruitment Process Outsourcing at scale.' },
      { name: 'Executive Search', desc: 'Confidential search for critical leadership mandates.' },
      { name: 'Talent Mapping', desc: 'Intelligence-driven landscape analysis of talent pools and competitor talent.' },
      { name: 'Employer Branding', desc: 'Build a compelling employer brand that attracts the right talent.' },
      { name: 'Hiring Strategy', desc: 'Data-backed hiring roadmaps aligned to business growth.' },
      { name: 'Workforce Planning', desc: 'Strategic workforce design, capacity planning and org design.' },
      { name: 'HR Consulting', desc: 'Expert advisory on HR processes, systems and transformation.' },
      { name: 'HR Process Setup', desc: 'Design and implement HR operations from scratch or overhaul.' },
      { name: 'Compensation Benchmarking', desc: 'Market-aligned compensation data for informed pay decisions.' },
      { name: 'Talent Analytics', desc: 'Data-driven intelligence on hiring performance and workforce trends.' },
      { name: 'Workforce Transformation', desc: 'End-to-end programs to modernize how organizations work with talent.' }
    ]
  },
  {
    id: 'platform',
    number: '02',
    title: 'TalentCIO Platform',
    subtitle: 'An integrated talent management platform designed to manage the entire workforce lifecycle from hiring to exit.',
    description:
      'The talentCIO Platform centralizes every workforce workflow into one connected system - eliminating the fragmentation of separate tools for attendance, hiring, onboarding, and employee operations.',
    modules: [
      { name: 'Applicant Tracking System (ATS)', desc: 'Structured hiring pipelines with candidate tracking and interview coordination.' },
      { name: 'Recruitment Management', desc: 'Hiring requests, approvals, job boards and bulk candidate import.' },
      { name: 'Employee Onboarding', desc: 'Pre-onboarding portal, offer letters, policy acknowledgements and readiness tracking.' },
      { name: 'Attendance & Leave Management', desc: 'Geo-fenced attendance, IP verification, leave policies and real-time balances.' },
      { name: 'HR Operations', desc: 'Employee records, dossiers, role management and org structure.' },
      { name: 'Performance Management', desc: 'Goal setting, reviews, 360-degree feedback and performance dashboards.' },
      { name: 'Employee Engagement', desc: 'Pulse surveys, recognition programs and engagement analytics.' },
      { name: 'Workflow Automation', desc: 'Approval flows, escalation rules and automated HR notifications.' },
      { name: 'Analytics & Reporting', desc: 'Real-time dashboards across HR, hiring, attendance and workforce operations.' },
      { name: 'Exit Management', desc: 'Structured offboarding, exit interviews and clearance workflows.' },
      { name: 'Alumni Connect', desc: 'Stay connected with former employees through an alumni network.' }
    ],
    benefits: [
      'Centralized Workforce Management',
      'Improved Hiring Efficiency',
      'Better Employee Experience',
      'Scalable HR Operations',
      'Data-Driven Workforce Decisions'
    ]
  },
  {
    id: 'talentsphere',
    number: '03',
    title: 'TalentSphere',
    subtitle: 'Leadership & Talent Community Network',
    description:
      "TalentSphere is talentCIO's collaborative leadership and talent community connecting talent acquisition leaders, HR professionals, founders, consultants, business leaders, industry experts and job seekers. The community is designed to encourage networking, knowledge sharing, workforce discussions, leadership collaboration and opportunity exchange for the future of work.",
    positioning: 'Connecting Leaders, Talent & Opportunity.',
    members: [
      'Talent Acquisition Leaders',
      'HR Heads & HR Professionals',
      'Founders & Business Leaders',
      'Functional Leaders',
      'Recruiters & Consultants',
      'Industry Experts',
      'Professionals & Job Seekers'
    ],
    focusAreas: [
      { name: 'Workforce & Hiring Discussions', desc: 'Deep-dive conversations on workforce trends, hiring challenges and talent strategies.' },
      { name: 'Industry Networking', desc: 'Connect with leaders and practitioners across industries and functions.' },
      { name: 'Hiring Trends & Insights', desc: 'Stay current with what is shaping hiring markets and talent availability.' },
      { name: 'Leadership Collaboration', desc: 'Cross-functional collaboration between HR, business and talent leaders.' },
      { name: 'Career Opportunities', desc: 'Access exclusive opportunities shared within the TalentSphere community.' },
      { name: 'Knowledge Sharing', desc: 'Exchange frameworks, templates and practical workforce knowledge.' },
      { name: 'Workforce Innovation', desc: 'Explore emerging workforce models, technology and practices.' }
    ]
  }
];

export const FLAGSHIP_PROGRAMS = [
  {
    id: 'talentcard',
    title: 'TalentCard',
    subtitle: 'Intelligent Resume & Career Identity Program',
    description:
      "In today's technology-driven hiring environment, even highly skilled professionals miss the right opportunities because of weak professional positioning, resume gaps and ATS incompatibility. TalentCard is a professionally engineered career identity program developed by hiring experts and talent specialists to improve profile visibility, recruiter engagement and opportunity alignment.",
    philosophy:
      'We combine human intelligence, recruitment expertise and technology-driven optimization to help professionals build stronger professional identities for modern hiring ecosystems.',
    positioning: 'Built by hiring experts for technology-driven hiring.',
    services: [
      { name: 'ATS-Friendly Resume Development', desc: 'Professionally crafted resumes engineered to pass ATS filters and impress human reviewers.' },
      { name: 'Resume Optimization', desc: 'Audit and rewrite existing resumes for maximum impact and keyword alignment.' },
      { name: 'LinkedIn Profile Enhancement', desc: 'End-to-end LinkedIn profile optimization for recruiter discovery and engagement.' },
      { name: 'Professional Branding', desc: 'Build a consistent, compelling professional identity across all touchpoints.' },
      { name: 'Career Positioning', desc: 'Define and articulate your unique career narrative and value proposition.' },
      { name: 'Executive & Leadership Profiles', desc: 'Specialized profile development for senior and C-suite professionals.' },
      { name: 'Skill & Keyword Optimization', desc: 'Strategic placement of industry and role-specific keywords for searchability.' },
      { name: 'Career Consultation', desc: 'One-on-one guidance on career trajectory, positioning and opportunity alignment.' }
    ]
  },
  {
    id: 'ctp',
    title: 'CTP - Chief Talent Partner',
    subtitle: 'Strategic Workforce Partnership Program',
    description:
      "CTP is talentCIO's strategic workforce partnership model designed for organizations seeking scalable, measurable and long-term talent management support. Under the CTP model, talentCIO works as an extended workforce and talent partner across hiring, workforce planning, talent operations and workforce transformation initiatives.",
    philosophy:
      'Every engagement operates through our performance-driven Scorecard Framework where measurable goals, delivery benchmarks and workforce KPIs are defined at the beginning of the engagement to ensure accountability, transparency and measurable business outcomes.',
    positioning: 'Strategic talent partnerships measured through outcomes, not activities.',
    focusAreas: [
      { name: 'Recruitment & Hiring Partnerships', desc: 'Act as an extended hiring arm with full pipeline accountability.' },
      { name: 'RPO', desc: 'Scalable recruitment process outsourcing across functions and geographies.' },
      { name: 'Workforce Planning', desc: 'Collaborative planning of workforce needs aligned to business growth.' },
      { name: 'HR Process Optimization', desc: 'Audit and redesign HR processes for efficiency and compliance.' },
      { name: 'Talent Operations Support', desc: 'Day-to-day talent operations support alongside your internal team.' },
      { name: 'Employer Branding', desc: 'Build and amplify your employer brand to attract the right talent.' },
      { name: 'Talent Intelligence', desc: 'Market intelligence on talent availability, compensation and competition.' },
      { name: 'Workforce Analytics', desc: 'Data-driven insights on hiring performance, workforce trends and gaps.' },
      { name: 'HR Transformation', desc: 'Strategic programs to modernize HR functions and talent practices.' }
    ],
    framework: [
      { name: 'Defined Workforce Scorecards', desc: 'Clear scorecards set at engagement start with KPIs agreed by all stakeholders.' },
      { name: 'Hiring Metrics & KPIs', desc: 'Specific hiring metrics tracked across time-to-fill, quality of hire and source efficiency.' },
      { name: 'Delivery Benchmarks', desc: 'Milestone-based delivery benchmarks with transparent progress reporting.' },
      { name: 'Strategic Workforce Goals', desc: 'Alignment of talent activity to broader business and workforce strategy.' },
      { name: 'Performance Reviews', desc: 'Regular joint reviews of scorecard performance with actionable outcomes.' },
      { name: 'Outcome-Based Execution', desc: 'Focus on measurable business outcomes rather than activity metrics alone.' }
    ]
  }
];

export const WHY_TALENTCIO = [
  {
    id: 'intelligence',
    title: 'Human Intelligence + Technology',
    body: 'We combine strategic human expertise with intelligent technology to create smarter workforce solutions. Neither alone is sufficient - together they create true Talent Intelligence.',
    icon: 'Brain'
  },
  {
    id: 'ecosystem',
    title: 'Integrated Talent Ecosystem',
    body: 'From hiring and workforce consulting to workforce technology and opportunity exchange, we provide a connected talent ecosystem under one platform - eliminating fragmentation across your talent lifecycle.',
    icon: 'Network'
  },
  {
    id: 'community',
    title: 'Community-Driven Network',
    body: 'Our growing leadership and professional community enables stronger collaboration, networking and talent discovery - connecting the people who shape workforces.',
    icon: 'Users'
  },
  {
    id: 'endtoend',
    title: 'End-to-End Workforce Support',
    body: 'We support organizations across the complete workforce lifecycle - from talent attraction and hiring to workforce management, development and employee exit.',
    icon: 'ArrowRightLeft'
  },
  {
    id: 'scalable',
    title: 'Scalable Workforce Solutions',
    body: 'Our solutions are designed for startups, growing businesses and enterprise organizations - adapting in scope and depth to match where you are and where you are heading.',
    icon: 'TrendingUp'
  }
];

export const INDUSTRIES_SERVED = [
  { name: 'Technology', desc: 'Software, SaaS, product and deep-tech organizations.' },
  { name: 'IT & Digital Services', desc: 'IT services, digital transformation and managed services firms.' },
  { name: 'Healthcare', desc: 'Hospitals, diagnostics, pharma and health-tech companies.' },
  { name: 'Financial Services', desc: 'Banking, insurance, fintech and investment organizations.' },
  { name: 'Professional Services', desc: 'Consulting, legal, accounting and advisory firms.' },
  { name: 'Retail & E-Commerce', desc: 'Retail chains, D2C brands and e-commerce platforms.' },
  { name: 'Manufacturing', desc: 'Industrial, FMCG, automotive and process manufacturing.' },
  { name: 'Logistics & Supply Chain', desc: 'Logistics operators, 3PL, warehousing and supply chain firms.' },
  { name: 'Education', desc: 'EdTech, schools, universities and learning organizations.' },
  { name: 'Real Estate & Property', desc: 'Developers, property management and proptech companies.' },
  { name: 'Emerging Businesses & Startups', desc: 'Seed to growth-stage startups building their first workforce.' }
];

export const VISION = {
  kicker: 'Our Vision',
  title: 'Building the Future of Talent Intelligence',
  body: 'To create one of the most intelligent and connected workforce ecosystems that transforms how organizations and professionals engage with hiring, workforce management and career growth.'
};

export const MISSION = {
  kicker: 'Our Mission',
  title: 'Empowering Workforce Transformation',
  body: 'To empower businesses and professionals through human intelligence, workforce technology and collaborative talent networks that drive sustainable growth and modern workforce transformation.'
};

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Understand Your Workforce Need',
    desc: 'We begin with a deep understanding of your talent challenges - whether hiring, workforce planning, platform adoption or community engagement.'
  },
  {
    number: '02',
    title: 'Connect to the Right Vertical',
    desc: 'We route your need to the most relevant part of the talentCIO ecosystem - Solutions, Platform, TalentSphere, or a combination of them.'
  },
  {
    number: '03',
    title: 'Deliver Through Intelligence',
    desc: 'Human expertise and intelligent technology work together to deliver outcomes - from hires and workforce transformations to platform adoption and community growth.'
  }
];

export const ABOUT_CONTENT = {
  kicker: 'About talentCIO',
  headline: 'Building Intelligent Talent Ecosystems for Modern Organizations',
  intro:
    'talentCIO is a workforce transformation and talent intelligence company designed for the future of work. We bring together strategic talent solutions, workforce technology, opportunity marketplaces and professional communities into one integrated ecosystem that helps organizations and professionals grow smarter and faster.',
  philosophy: {
    title: 'Our Philosophy',
    tagline: 'Human Intelligence + Technology = Talent Intelligence',
    body: 'We believe the strongest workforce decisions happen when human expertise, strategic insights and intelligent technology work together. From talent acquisition and workforce advisory to talent management platforms and opportunity exchange networks, talentCIO delivers connected workforce solutions built for modern businesses.'
  },
  pillars: [
    {
      title: 'Human Intelligence First',
      body: 'Every solution we deliver is grounded in deep human expertise - hiring practitioners, workforce strategists and HR leaders who understand what actually works.'
    },
    {
      title: 'Technology as Amplifier',
      body: 'Intelligent technology amplifies human judgment. We deploy platforms, data and automation where they add precision, scale and speed to human decisions.'
    },
    {
      title: 'Connected by Design',
      body: 'The talentCIO ecosystem is built to be interconnected. Talent solutions feed the platform. Platform data informs strategy. Community insights accelerate growth.'
    },
    {
      title: 'Outcome Accountability',
      body: 'We measure success by outcomes - hires made, transformations delivered, careers advanced and communities built. Not by activities or hours.'
    }
  ]
};

export const NAV_STRUCTURE = {
  main: [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      href: '/about'
    },
    {
      label: 'Solutions',
      href: '/solutions',
      submenu: [
        { label: 'Permanent Hiring', href: '/solutions#permanent-hiring' },
        { label: 'Leadership Hiring', href: '/solutions#leadership-hiring' },
        { label: 'Contract Staffing', href: '/solutions#contract-staffing' },
        { label: 'RPO', href: '/solutions#rpo' },
        { label: 'HR Consulting', href: '/solutions#hr-consulting' },
        { label: 'Workforce Planning', href: '/solutions#workforce-planning' },
        { label: 'Talent Analytics', href: '/solutions#talent-analytics' }
      ]
    },
    {
      label: 'Platform',
      href: '/features',
      submenu: [
        { label: 'ATS', href: '/features#ats' },
        { label: 'Onboarding', href: '/features#onboarding' },
        { label: 'HR Operations', href: '/features#hr-operations' },
        { label: 'Performance Management', href: '/features#performance' },
        { label: 'Analytics', href: '/features#analytics' },
        { label: 'Exit Management', href: '/features#exit' }
      ]
    },
    {
      label: 'TalentSphere',
      href: '/talentsphere',
      submenu: [
        { label: 'Leadership Network', href: '/talentsphere#network' },
        { label: 'Knowledge Sharing', href: '/talentsphere#knowledge' },
        { label: 'Career Network', href: '/talentsphere#careers' }
      ]
    },
    {
      label: 'Flagship Programs',
      href: '/programs',
      submenu: [
        { label: 'TalentCard', href: '/programs#talentcard' },
        { label: 'CTP - Chief Talent Partner', href: '/programs#ctp' }
      ]
    },
    { label: 'Industries', href: '/industries' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact Us', href: '/contact' }
  ]
};

export const MARKET_SOURCES = {
  indiaHrMarket: {
    label: 'KenResearch',
    date: 'November 28, 2024',
    url: 'https://www.kenresearch.com/industry-reports/india-human-resource-market'
  },
  apacHrmMarket: {
    label: 'KenResearch',
    date: 'November 18, 2025',
    url: 'https://www.kenresearch.com/apac-human-resource-management-hrm-market'
  },
  hiringIndex: {
    label: 'foundit Insights Tracker',
    date: 'Last updated March 23, 2026',
    url: 'https://www.foundit.in/career-advice/foundit-insights-tracker-feb-2026/'
  },
  hrmsOutlook: {
    label: 'Cognitive Market Research',
    date: 'Accessed April 30, 2026',
    url: 'https://www.cognitivemarketresearch.com/human-resource-management-software-market-report'
  }
};

export const MARKET_SIGNALS = [
  {
    title: 'India HR Market',
    value: 'USD 1.02B',
    detail:
      'KenResearch places the India human resource market at USD 1.02 billion in 2023, underscoring sustained software and services demand.',
    source: MARKET_SOURCES.indiaHrMarket
  },
  {
    title: 'APAC HRM Market',
    value: 'USD 6.4B',
    detail:
      'KenResearch values the APAC human resource management market at USD 6.4 billion in 2024 as cloud HR, analytics, and compliance tooling expand.',
    source: MARKET_SOURCES.apacHrmMarket
  },
  {
    title: 'India Hiring Index',
    value: '404',
    detail:
      'foundit reports its Hiring Index rose from 377 in January to 404 in February 2026, up 7% month over month and 6% year over year, signaling strong hiring demand.',
    source: MARKET_SOURCES.hiringIndex
  }
];

export const HOMEPAGE_MARKET_PARAGRAPH =
  'India\'s HR technology and talent market is growing faster than most organizations can adapt to. KenResearch values the India human resource market at USD 1.02 billion in 2023, the broader APAC human resource management market at USD 6.4 billion in 2024, and foundit reports India\'s Hiring Index rose to 404 in February 2026 with 7% month-over-month growth. For organizations trying to attract, hire, manage and grow talent, fragmented tools and disconnected processes are no longer sustainable.';

export const HOMEPAGE_FAQ_GROUPS = [
  {
    title: 'Ecosystem',
    intro: 'Core questions about the talentCIO Talent Intelligence Ecosystem and how it works.',
    items: [
      {
        question: 'What is TalentCIO?',
        answer:
          'TalentCIO is a modern talent intelligence ecosystem that combines strategic human expertise with technology-driven intelligence. It operates through three interconnected verticals: Talent Intelligence Solutions (strategic hiring and workforce consulting), the talentCIO Platform (integrated workforce management software), and TalentSphere (leadership and talent community network).'
      },
      {
        question: 'What does "Human Intelligence + Technology = Talent Intelligence" mean?',
        answer:
          'It is the core philosophy of TalentCIO - that the strongest workforce decisions happen when human expertise, strategic insights and intelligent technology work together. Human intelligence provides judgment, context and relationships. Technology provides scale, precision and speed. Together they create Talent Intelligence - smarter, faster and more accurate workforce outcomes than either can achieve alone.'
      },
      {
        question: 'Who is TalentCIO designed for?',
        answer:
          'TalentCIO serves three distinct audiences. Organizations of all sizes - from startups to enterprises - that need to attract, hire, manage and grow workforces. Individual professionals who want to grow their careers, find better opportunities or build their professional identity. And HR and talent acquisition communities looking to connect, collaborate and stay ahead of workforce trends.'
      },
      {
        question: 'How is TalentCIO different from a standard HRMS or recruitment agency?',
        answer:
          'TalentCIO is neither a standalone HRMS nor a standard recruitment agency. It is a connected talent intelligence ecosystem. The Talent Intelligence Solutions vertical delivers strategic human-led hiring and workforce consulting. The Platform provides integrated workforce management technology. TalentSphere builds leadership and talent communities. Together they create a complete talent ecosystem rather than a single-point tool.'
      },
      {
        question: 'What industries does TalentCIO serve?',
        answer:
          'TalentCIO serves Technology, IT & Digital Services, Healthcare, Financial Services, Professional Services, Retail & E-Commerce, Manufacturing, Logistics & Supply Chain, Education, Real Estate & Property, and Emerging Businesses & Startups. The ecosystem is designed to adapt to the talent and workforce complexities of each sector.'
      }
    ]
  },
  {
    title: 'Solutions',
    intro: 'Questions about Talent Intelligence Solutions - strategic hiring, workforce consulting and advisory services.',
    items: [
      {
        question: 'What talent and workforce solutions does talentCIO offer?',
        answer:
          'talentCIO offers 14 services under Talent Intelligence Solutions: Permanent Hiring, Leadership Hiring, Contract Staffing, RPO (Recruitment Process Outsourcing), Executive Search, Talent Mapping, Employer Branding, Hiring Strategy, Workforce Planning, HR Consulting, HR Process Setup, Compensation Benchmarking, Talent Analytics, and Workforce Transformation Solutions.'
      },
      {
        question: 'What is RPO and how does talentCIO deliver it?',
        answer:
          'RPO (Recruitment Process Outsourcing) means talentCIO takes over all or part of an organization\'s recruitment function as an extended team. We manage hiring requisitions, sourcing, screening, interview coordination, offer management and onboarding handoff - delivering structured, measurable hiring outcomes against defined KPIs.'
      },
      {
        question: 'Can talentCIO help with workforce planning and HR transformation?',
        answer:
          'Yes. Beyond hiring, talentCIO delivers workforce planning (capacity analysis, org design, hiring roadmaps), HR process setup (building HR from scratch or redesigning existing processes), compensation benchmarking (market-aligned pay data), and full workforce transformation programs.'
      },
      {
        question: 'What is the CTP - Chief Talent Partner program?',
        answer:
          'CTP is talentCIO\'s strategic workforce partnership model for organizations seeking long-term, scalable talent management support. Under CTP, talentCIO acts as an extended talent partner - not just a vendor. Every engagement is governed by a Scorecard Framework with defined hiring KPIs, delivery benchmarks and strategic workforce goals - measuring outcomes, not activities.'
      },
      {
        question: 'What is TalentCard?',
        answer:
          'TalentCard is talentCIO\'s career identity program for professionals. Developed by hiring experts, it helps professionals build stronger professional identities for modern, technology-driven hiring ecosystems. Services include ATS-friendly resume development, LinkedIn profile optimization, professional branding, career positioning, executive profile development, and one-on-one career consultation.'
      }
    ]
  },
  {
    title: 'Platform',
    intro: 'Questions about the talentCIO Platform - integrated workforce management software.',
    items: [
      {
        question: 'What does the talentCIO Platform cover?',
        answer:
          'The talentCIO Platform is an integrated talent management platform covering 11 modules across the complete workforce lifecycle: ATS, Recruitment Management, Employee Onboarding, Attendance & Leave Management, HR Operations, Performance Management, Employee Engagement, Workflow Automation, Analytics & Reporting, Exit Management, and Alumni Connect.'
      },
      {
        question: 'Does the Platform handle attendance and leave management?',
        answer:
          'Yes. The Platform includes attendance workflows with geo-fenced tracking, IP verification, auto-checkout controls, and attendance reporting. Leave management covers policy configuration, approval flows, real-time balance visibility, and employee self-service requests.'
      },
      {
        question: 'Can the Platform manage hiring and onboarding together?',
        answer:
          'Yes. The ATS and Recruitment Management modules handle hiring requisitions, candidate pipelines, interview coordination and offer management. The Onboarding module then picks up with pre-joining portal access, offer letter and declaration workflows, policy acknowledgements and document collection - creating a seamless hire-to-day-one experience.'
      },
      {
        question: 'Does the Platform support performance management and employee engagement?',
        answer:
          'Yes. The Performance Management module supports goal setting, review cycles and performance dashboards. The Employee Engagement module supports pulse surveys, recognition and engagement analytics - giving HR teams visibility into workforce sentiment and performance.'
      },
      {
        question: 'Is the Platform suitable for startups and growing teams?',
        answer:
          'Yes. The Platform is modular and scalable. Startups can begin with core modules like attendance, leave and basic hiring. Growing businesses can add onboarding, performance and analytics. Enterprises can deploy the full suite with advanced role-based access controls across all modules.'
      }
    ]
  },
  {
    title: 'TalentSphere',
    intro: 'Questions about the TalentSphere leadership community.',
    items: [
      {
        question: 'What is TalentSphere?',
        answer:
          'TalentSphere is talentCIO\'s collaborative leadership and talent community. It connects talent acquisition leaders, HR professionals, founders, business leaders, consultants, industry experts and job seekers. Focus areas include workforce and hiring discussions, industry networking, hiring trend insights, leadership collaboration, career opportunities, knowledge sharing and workforce innovation.'
      },
      {
        question: 'Who should join TalentSphere?',
        answer:
          'TalentSphere is open to Talent Acquisition Leaders, HR Heads and HR Professionals, Founders and Business Leaders, Functional Leaders, Recruiters and Consultants, Industry Experts, and Professionals and Job Seekers at all stages. If you are involved in hiring, building or growing workforces - or navigating your own career - TalentSphere is designed for you.'
      }
    ]
  },
  {
    title: 'Getting Started',
    intro: 'Questions about engaging with talentCIO.',
    items: [
      {
        question: 'How do I engage with talentCIO for talent and hiring solutions?',
        answer:
          'Book a consultation through the Contact page. Tell us about your hiring volume, workforce challenge or transformation goal. We will map the right solution - from a single hiring mandate to a full CTP engagement - and provide a proposal with clear deliverables and outcomes.'
      },
      {
        question: 'How do I get access to the talentCIO Platform?',
        answer:
          'Request a demo through the Demo page. A member of the team will walk you through the Platform modules relevant to your workflows, discuss rollout scope, and help you identify the right plan for your organization size and requirements.'
      },
      {
        question: 'Does talentCIO work with early-stage startups?',
        answer:
          'Yes. talentCIO is designed for startups, growing businesses and enterprises alike. For startups, we can help with first hires, employer branding, HR process setup and access to the Platform\'s Starter plan - building the talent infrastructure your team needs from day one.'
      },
      {
        question: 'Can talentCIO handle both consulting and platform together?',
        answer:
          'Yes. Under the CTP model, talentCIO can deliver Talent Intelligence Solutions (consulting and hiring) alongside Platform access - creating a fully integrated talent and HR operations partnership. This is the most connected way to engage with the talentCIO ecosystem.'
      }
    ]
  }
];

export const HOMEPAGE_FAQS = HOMEPAGE_FAQ_GROUPS.flatMap((group) => group.items);

export const PAGE_COPY = {
  home: {
    title: 'talentCIO - Talent Intelligence Ecosystem | Human Intelligence + Technology',
    description:
      'talentCIO is a modern talent intelligence ecosystem helping organizations attract, hire, manage and grow exceptional workforces through integrated talent solutions, workforce technology, opportunity networks and leadership communities.',
    h1: 'Transforming Workforces Through Human Intelligence & Technology'
  },
  about: {
    title: 'About talentCIO - Building Intelligent Talent Ecosystems',
    description:
      'talentCIO combines strategic human expertise with workforce technology to create smarter workforce solutions across hiring, talent management, opportunity exchange and leadership communities. Human Intelligence + Technology = Talent Intelligence.',
    h1: 'Building Intelligent Talent Ecosystems for Modern Organizations'
  },
  solutions: {
    title: 'Talent Intelligence Solutions - Permanent Hiring, RPO, Workforce Planning | talentCIO',
    description:
      'talentCIO Talent Intelligence Solutions covers permanent hiring, leadership hiring, contract staffing, RPO, executive search, talent mapping, employer branding, workforce planning, HR consulting, compensation benchmarking and workforce transformation.',
    h1: 'Talent Intelligence Solutions Powered by Human Expertise'
  },
  features: {
    title: 'talentCIO Platform - ATS, Onboarding, Attendance, HR Operations | Features',
    description:
      'Explore talentCIO Platform features across ATS, recruitment management, employee onboarding, attendance & leave management, HR operations, performance management, employee engagement, analytics and exit management.',
    h1: 'The talentCIO Platform - Managing the Complete Workforce Lifecycle'
  },
  talentsphere: {
    title: 'TalentSphere - Leadership & Talent Community Network | talentCIO',
    description:
      "Join TalentSphere, talentCIO's collaborative leadership and talent community. Connect with talent acquisition leaders, HR professionals, founders and business leaders. Workforce discussions, knowledge sharing and career opportunities.",
    h1: 'TalentSphere - Connecting Leaders, Talent & Opportunity'
  },
  programs: {
    title: 'Flagship Programs - TalentCard & CTP Chief Talent Partner | talentCIO',
    description:
      'Explore talentCIO flagship programs: TalentCard, the intelligent resume and career identity program built by hiring experts, and CTP (Chief Talent Partner), the strategic workforce partnership model measured through outcomes.',
    h1: 'Flagship Programs for Professionals and Organizations'
  },
  industries: {
    title: 'Industries We Serve - Technology, Healthcare, Finance and More | talentCIO',
    description:
      'talentCIO serves Technology, IT & Digital Services, Healthcare, Financial Services, Professional Services, Retail & E-Commerce, Manufacturing, Logistics, Education, Real Estate and Emerging Businesses with integrated talent intelligence solutions.',
    h1: 'Talent Intelligence Solutions Across Industries'
  },
  pricing: {
    title: 'Pricing Plans - talentCIO Platform | Start Your Workforce Transformation',
    description:
      'talentCIO Platform pricing plans for Starter, Growth and Enterprise. Modular pricing based on team size and workflow scope. Monthly and yearly billing available. Request a demo to confirm the right plan for your organization.',
    h1: 'Flexible Plans That Grow With Your Workforce'
  },
  contact: {
    title: 'Contact talentCIO - Book a Consultation or Request a Demo',
    description:
      'Contact the talentCIO team to book a consultation for Talent Intelligence Solutions, request a Platform demo, enquire about TalentSphere, or discuss a CTP partnership engagement.',
    h1: 'Talk to the talentCIO Team'
  },
  demo: {
    title: 'Request a talentCIO Platform Demo | Workforce Management Walkthrough',
    description:
      'Request a talentCIO Platform demo. Walk through ATS, onboarding, attendance, HR operations and analytics workflows with the team to confirm the right modules and rollout plan for your organization.',
    h1: 'See the talentCIO Platform in Action'
  },
  jobs: {
    title: 'Jobs - Verified Open Roles | talentCIO Opportunity Board',
    description:
      'Browse verified jobs and career opportunities on talentCIO. Explore open roles by function, location and seniority level across companies using the talentCIO ecosystem.',
    h1: 'Explore Open Opportunities'
  },
  insights: {
    title: 'Insights - Workforce, Hiring & Talent Intelligence | talentCIO',
    description:
      'Workforce trends, hiring insights and talent intelligence perspectives from the talentCIO team. Stay ahead with practical analysis of what is shaping talent markets and workforce strategies.',
    h1: 'Talent Intelligence Insights'
  },
  blog: {
    titleTemplate: '[Article Title] | talentCIO Talent Intelligence Insights'
  }
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'talentCIO',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.svg`,
  description: BRAND_DESCRIPTION,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${SITE_URL}/contact`
  }
});

export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'talentCIO',
  url: SITE_URL,
  description: BRAND_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/jobs?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});

export const buildFAQSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))
});

export const buildServiceSchema = (name, description, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: { '@type': 'Organization', name: 'talentCIO', url: SITE_URL },
  url
});

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});
