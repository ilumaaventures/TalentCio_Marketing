import {
  ABOUT_CONTENT,
  BRAND_DESCRIPTION,
  BRAND_TAGLINE,
  ECOSYSTEM_VERTICALS,
  FLAGSHIP_PROGRAMS,
  HOMEPAGE_FAQ_GROUPS,
  INDUSTRIES_SERVED,
  MARKET_SIGNALS,
  MISSION,
  PAGE_COPY,
  VISION
} from '../../content/marketingContent';

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'me',
  'of',
  'on',
  'or',
  'our',
  'tell',
  'the',
  'this',
  'to',
  'us',
  'we',
  'what',
  'when',
  'where',
  'which',
  'who',
  'why',
  'you',
  'your'
]);

const solutionsVertical = ECOSYSTEM_VERTICALS.find((item) => item.id === 'solutions');
const platformVertical = ECOSYSTEM_VERTICALS.find((item) => item.id === 'platform');
const taleExVertical = ECOSYSTEM_VERTICALS.find((item) => item.id === 'taleex');
const talentSphereVertical = ECOSYSTEM_VERTICALS.find((item) => item.id === 'talentsphere');
const talentCardProgram = FLAGSHIP_PROGRAMS.find((item) => item.id === 'talentcard');
const ctpProgram = FLAGSHIP_PROGRAMS.find((item) => item.id === 'ctp');

const pricingSnapshot = [
  {
    name: 'Starter',
    fit: 'small teams replacing spreadsheets with a clean HR operations base'
  },
  {
    name: 'Growth',
    fit: 'growing businesses running people operations and active hiring together'
  },
  {
    name: 'Enterprise',
    fit: 'larger organizations that need the full suite, deeper controls, and rollout support'
  }
];

const routePromptSuggestions = {
  default: [
    'What does talentCIO do?',
    'What is included in the platform?',
    'How does pricing work?',
    'Which industries do you serve?'
  ],
  about: [
    'What is TalentCIO?',
    'What is your mission and vision?',
    'How are you different from a standard HRMS?'
  ],
  features: [
    'What modules are included?',
    'Does the platform handle onboarding and attendance?',
    'Is the platform suitable for startups?'
  ],
  pricing: [
    'How do the plans work?',
    'Which plan fits a growing team?',
    'Should I request a demo before choosing a plan?'
  ],
  jobs: [
    'How do I find relevant roles?',
    'What can I filter by on jobs?',
    'How do I apply faster?'
  ],
  demo: [
    'What details should I share in the form?',
    'What happens after I request a demo?',
    'Which modules can I ask about?'
  ],
  contact: [
    'Should I email or request a demo?',
    'What information should I share first?',
    'How do I contact the team?'
  ]
};

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token && !STOP_WORDS.has(token) && token.length > 1);
}

function joinReadable(items) {
  if (items.length <= 1) {
    return items[0] || '';
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function buildPageSummary(pathname) {
  if (pathname.startsWith('/about')) {
    return {
      contextLabel: 'About Summary',
      actionId: 'about',
      text: `${ABOUT_CONTENT.headline}. ${ABOUT_CONTENT.intro} ${ABOUT_CONTENT.philosophy.tagline}.`
    };
  }

  if (pathname.startsWith('/features')) {
    return {
      contextLabel: 'Platform Summary',
      actionId: 'projects',
      text: `${PAGE_COPY.features.h1}. The platform currently highlights modules like ${joinReadable(
        platformVertical.modules.slice(0, 5).map((item) => item.name)
      )}, with a focus on connected workforce workflows from hiring through exit.`
    };
  }

  if (pathname.startsWith('/pricing')) {
    return {
      contextLabel: 'Pricing Summary',
      actionId: 'pricing',
      text: `The pricing page presents ${joinReadable(
        pricingSnapshot.map((item) => item.name)
      )} plans. The structure is designed to scale from smaller teams to enterprise rollouts, with monthly and yearly billing options.`
    };
  }

  if (pathname.startsWith('/jobs')) {
    return {
      contextLabel: 'Careers Summary',
      actionId: 'careers',
      text: `${PAGE_COPY.jobs.h1}. Visitors can filter public roles by role type, location, and department, then move into detailed job pages and applications.`
    };
  }

  if (pathname.startsWith('/demo')) {
    return {
      contextLabel: 'Demo Summary',
      actionId: 'contact',
      text: `${PAGE_COPY.demo.h1}. The form is meant to capture team size, workflow priorities, and module interest so the walkthrough can be tailored to the company instead of being generic.`
    };
  }

  if (pathname.startsWith('/contact')) {
    return {
      contextLabel: 'Contact Summary',
      actionId: 'contact',
      text: `${PAGE_COPY.contact.h1}. The page helps visitors decide between direct outreach and a structured demo request, while also prompting them to share rollout context early.`
    };
  }

  if (pathname.startsWith('/solutions')) {
    return {
      contextLabel: 'Solutions Summary',
      actionId: 'services',
      text: `${PAGE_COPY.solutions.h1}. The page focuses on strategic workforce solutions such as ${joinReadable(
        solutionsVertical.services.slice(0, 5).map((item) => item.name)
      )}.`
    };
  }

  if (pathname.startsWith('/taleex')) {
    return {
      contextLabel: 'TaleEx Summary',
      actionId: 'careers',
      text: `${PAGE_COPY.taleex.h1}. TaleEx is positioned as an opportunity and referral exchange with features like ${joinReadable(
        taleExVertical.features.slice(0, 4).map((item) => item.name)
      )}.`
    };
  }

  if (pathname.startsWith('/talentsphere')) {
    return {
      contextLabel: 'TalentSphere Summary',
      actionId: 'about',
      text: `${PAGE_COPY.talentsphere.h1}. The page presents TalentSphere as a leadership and talent community built for ${joinReadable(
        talentSphereVertical.members.slice(0, 4)
      )}.`
    };
  }

  if (pathname.startsWith('/programs')) {
    return {
      contextLabel: 'Programs Summary',
      actionId: 'about',
      text: `${PAGE_COPY.programs.h1}. The current flagship programs are ${talentCardProgram.title} and ${ctpProgram.title}, each aimed at a different part of the talent ecosystem.`
    };
  }

  if (pathname.startsWith('/industries')) {
    return {
      contextLabel: 'Industries Summary',
      actionId: 'services',
      text: `${PAGE_COPY.industries.h1}. The page shows how talentCIO adapts across sectors such as ${joinReadable(
        INDUSTRIES_SERVED.slice(0, 5).map((item) => item.name)
      )}.`
    };
  }

  if (pathname.startsWith('/insights')) {
    return {
      contextLabel: 'Insights Summary',
      actionId: 'about',
      text: `${PAGE_COPY.insights.h1}. The page gathers market signals and source-backed context around hiring demand, HR technology, and fragmented workforce systems.`
    };
  }

  return {
    contextLabel: 'Homepage Summary',
    actionId: 'services',
    text: `${PAGE_COPY.home.h1}. The homepage introduces talentCIO as an ecosystem spanning ${joinReadable(
      ECOSYSTEM_VERTICALS.map((item) => item.title)
    )}.`
  };
}

function getRouteKey(pathname) {
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/features')) return 'features';
  if (pathname.startsWith('/pricing')) return 'pricing';
  if (pathname.startsWith('/jobs')) return 'jobs';
  if (pathname.startsWith('/demo')) return 'demo';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/solutions')) return 'default';
  if (pathname.startsWith('/taleex')) return 'default';
  if (pathname.startsWith('/talentsphere')) return 'default';
  if (pathname.startsWith('/programs')) return 'default';
  if (pathname.startsWith('/industries')) return 'default';
  if (pathname.startsWith('/insights')) return 'default';
  return 'default';
}

function buildBaseEntries() {
  const faqEntries = HOMEPAGE_FAQ_GROUPS.flatMap((group) =>
    group.items.map((item, index) => ({
      id: `faq-${group.title}-${index}`,
      title: item.question,
      actionId:
        group.title === 'Getting Started'
          ? 'contact'
          : group.title === 'Platform'
            ? 'projects'
            : group.title === 'Solutions'
              ? 'services'
              : group.title === 'TaleEx & TalentSphere'
                ? 'about'
                : 'contact',
      keywords: [group.title, item.question],
      response: item.answer
    }))
  );

  return [
    {
      id: 'overview',
      title: 'talentCIO Overview',
      actionId: 'about',
      keywords: ['what is talentcio', 'about talentcio', 'company overview', 'overview', 'talent intelligence'],
      response: `${BRAND_DESCRIPTION} The ecosystem currently spans ${joinReadable(
        ECOSYSTEM_VERTICALS.map((item) => item.title)
      )}, all tied together by the idea that ${BRAND_TAGLINE}.`
    },
    {
      id: 'solutions',
      title: 'Talent Intelligence Solutions',
      actionId: 'services',
      keywords: ['solutions', 'services', 'hiring', 'rpo', 'executive search', 'workforce planning'],
      response: `${solutionsVertical.title} covers ${solutionsVertical.services.length} services, including ${joinReadable(
        solutionsVertical.services.slice(0, 6).map((item) => item.name)
      )}. The focus is strategic hiring, workforce advisory, and human-led talent intelligence outcomes.`
    },
    {
      id: 'platform',
      title: 'Platform Modules',
      actionId: 'projects',
      keywords: ['platform', 'features', 'modules', 'ats', 'onboarding', 'attendance', 'leave'],
      response: `${platformVertical.title} includes ${platformVertical.modules.length} modules across the workforce lifecycle. Some of the main modules are ${joinReadable(
        platformVertical.modules.slice(0, 6).map((item) => item.name)
      )}.`
    },
    {
      id: 'taleex',
      title: 'TaleEx',
      actionId: 'careers',
      keywords: ['taleex', 'referral', 'opportunity exchange', 'job marketplace'],
      response: `${taleExVertical.description} Key capabilities include ${joinReadable(
        taleExVertical.features.slice(0, 4).map((item) => item.name)
      )}.`
    },
    {
      id: 'talentsphere',
      title: 'TalentSphere',
      actionId: 'about',
      keywords: ['talentsphere', 'community', 'leadership network', 'networking'],
      response: `${talentSphereVertical.description} It is designed for ${joinReadable(
        talentSphereVertical.members.slice(0, 5)
      )}, with focus areas such as ${joinReadable(
        talentSphereVertical.focusAreas.slice(0, 4).map((item) => item.name)
      )}.`
    },
    {
      id: 'programs',
      title: 'Flagship Programs',
      actionId: 'about',
      keywords: ['programs', 'flagship programs', 'talentcard', 'ctp', 'chief talent partner'],
      response: `The flagship programs are ${talentCardProgram.title} and ${ctpProgram.title}. ${talentCardProgram.title} helps professionals improve career identity and visibility, while ${ctpProgram.title} is a long-term workforce partnership model measured through scorecards and outcomes.`
    },
    {
      id: 'industries',
      title: 'Industries Served',
      actionId: 'services',
      keywords: ['industries', 'sectors', 'who do you serve', 'technology', 'healthcare', 'finance'],
      response: `talentCIO serves ${INDUSTRIES_SERVED.length} industry groups, including ${joinReadable(
        INDUSTRIES_SERVED.slice(0, 6).map((item) => item.name)
      )}. The model is intended to work for startups, growing businesses, and enterprise teams.`
    },
    {
      id: 'pricing',
      title: 'Pricing',
      actionId: 'pricing',
      keywords: ['pricing', 'plans', 'starter', 'growth', 'enterprise', 'billing'],
      response: `The platform currently presents ${joinReadable(
        pricingSnapshot.map((item) => item.name)
      )} plans. Starter is aimed at ${pricingSnapshot[0].fit}, Growth is for ${pricingSnapshot[1].fit}, and Enterprise supports ${pricingSnapshot[2].fit}.`
    },
    {
      id: 'careers',
      title: 'Careers',
      actionId: 'careers',
      keywords: ['jobs', 'careers', 'open roles', 'apply', 'role search'],
      response: `The jobs experience lets visitors browse verified openings and filter them by role type, location, and department. It is designed to move users from discovery into role details and application quickly.`
    },
    {
      id: 'contact',
      title: 'Contact and Demo',
      actionId: 'contact',
      keywords: ['contact', 'demo', 'consultation', 'email', 'reach out'],
      response: `Visitors can either book a consultation or request a platform demo. The most useful first details to share are team size, modules of interest, and expected rollout timeline so the conversation is tailored from the start.`
    },
    {
      id: 'vision',
      title: 'Mission and Vision',
      actionId: 'about',
      keywords: ['mission', 'vision', 'purpose', 'goal'],
      response: `${VISION.title}: ${VISION.body} ${MISSION.title}: ${MISSION.body}`
    },
    {
      id: 'market',
      title: 'Market Context',
      actionId: 'about',
      keywords: ['market', 'hiring index', 'hr market', 'why now', 'market signals'],
      response: `The site highlights a few market signals to explain urgency: ${joinReadable(
        MARKET_SIGNALS.map((item) => `${item.title} at ${item.value}`)
      )}. The core message is that hiring demand and HR complexity are rising faster than fragmented systems can handle.`
    },
    ...faqEntries
  ];
}

const knowledgeEntries = buildBaseEntries().map((entry) => ({
  ...entry,
  normalizedKeywords: entry.keywords.map(normalizeText),
  keywordTokens: Array.from(new Set(entry.keywords.flatMap(tokenize)))
}));

function scoreEntry(entry, normalizedQuery, queryTokens) {
  let score = 0;

  entry.normalizedKeywords.forEach((keyword) => {
    if (!keyword) {
      return;
    }

    if (normalizedQuery.includes(keyword)) {
      score += keyword.includes(' ') ? 12 : 7;
    }
  });

  entry.keywordTokens.forEach((token) => {
    if (queryTokens.includes(token)) {
      score += 3;
    }
  });

  return score;
}

export function getAssistantPromptSuggestions(pathname) {
  return routePromptSuggestions[getRouteKey(pathname)] || routePromptSuggestions.default;
}

export function findAssistantAnswer(query, pathname) {
  const trimmedQuery = String(query || '').trim();

  if (!trimmedQuery) {
    return {
      ...buildPageSummary(pathname),
      text: 'Ask me about the platform, pricing, hiring, careers, or the ecosystem and I will answer from the website content.'
    };
  }

  const normalizedQuery = normalizeText(trimmedQuery);
  const queryTokens = tokenize(trimmedQuery);

  if (
    normalizedQuery.includes('this page') ||
    normalizedQuery.includes('current page') ||
    normalizedQuery.includes('summarize this') ||
    normalizedQuery === 'summary'
  ) {
    return buildPageSummary(pathname);
  }

  const bestMatch = knowledgeEntries
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, normalizedQuery, queryTokens)
    }))
    .sort((left, right) => right.score - left.score)[0];

  if (!bestMatch || bestMatch.score < 3) {
    return {
      contextLabel: 'Website Assistant',
      actionId: 'about',
      text: `I can answer from the current site content about the ecosystem, platform modules, pricing, flagship programs, industries served, jobs, and demo flow. Try a question like "${getAssistantPromptSuggestions(pathname)[0]}".`
    };
  }

  return {
    contextLabel: bestMatch.entry.title,
    actionId: bestMatch.entry.actionId,
    text: bestMatch.entry.response
  };
}
