export const SITE_URL = 'https://talentcio.in';

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
    date: 'March 23, 2026',
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
    title: 'foundit Hiring Index',
    value: '404',
    detail:
      'foundit reports its Hiring Index score reached 404 in February 2026, up 7% month over month and 6% year over year.',
    source: MARKET_SOURCES.hiringIndex
  }
];

export const HOMEPAGE_MARKET_PARAGRAPH =
  'India\'s HR technology market is growing alongside hiring demand. KenResearch values the India human resource market at USD 1.02 billion in 2023, the broader APAC human resource management market at USD 6.4 billion in 2024, and foundit says India\'s Hiring Index climbed to 404 in February 2026 with 7% month-over-month growth. For teams trying to connect hiring, onboarding, attendance, and employee operations, that momentum makes a fragmented HR stack harder to justify.';

export const HOMEPAGE_FAQ_GROUPS = [
  {
    title: 'Product',
    intro: 'Core questions about what TalentCIO does and which workflows it covers.',
    items: [
      {
        question: 'What is TalentCIO used for?',
        answer:
          'TalentCIO is used to manage connected HR and hiring workflows in one platform, including attendance, leave management, recruitment, onboarding, employee records, projects, help desk operations, and internal meetings.'
      },
      {
        question: 'Is TalentCIO suitable for Indian businesses?',
        answer:
          'Yes. TalentCIO is positioned for Indian businesses that want one connected system for people operations instead of separate tools for attendance, hiring, onboarding, and employee administration.'
      },
      {
        question: 'Can TalentCIO be used by multiple departments?',
        answer:
          'Yes. TalentCIO is built to serve HR, recruiters, managers, and operations teams through role-based access and shared workflow visibility.'
      },
      {
        question: 'Does TalentCIO support role-based permissions?',
        answer:
          'Yes. TalentCIO includes role-based access controls so different users can see and manage the parts of the platform relevant to their responsibilities.'
      }
    ]
  },
  {
    title: 'Operations',
    intro: 'Questions focused on attendance, payroll inputs, employee administration, and internal workflows.',
    items: [
      {
        question: 'Can TalentCIO handle attendance management?',
        answer:
          'Yes. TalentCIO supports attendance workflows such as check-in and check-out tracking, geo-fenced attendance controls, and reporting for day-to-day people operations.'
      },
      {
        question: 'Does TalentCIO include leave management?',
        answer:
          'Yes. TalentCIO includes leave workflows with policy configuration, approval flows, balance visibility, and employee self-service requests.'
      },
      {
        question: 'Can TalentCIO support payroll-related HR data?',
        answer:
          'TalentCIO supports attendance, leave, and timesheet workflows that many teams use as payroll inputs. If you need a specific payroll process or integration, that should be confirmed during the demo based on your operating setup.'
      },
      {
        question: 'Can TalentCIO manage projects and internal support workflows?',
        answer:
          'Yes. Beyond core HR functions, TalentCIO also supports project-linked workflows, internal help desk operations, and meeting coordination.'
      }
    ]
  },
  {
    title: 'Hiring',
    intro: 'Questions about recruitment, applicant tracking, onboarding, and team readiness.',
    items: [
      {
        question: 'Does TalentCIO support recruitment and applicant tracking?',
        answer:
          'Yes. TalentCIO includes talent acquisition workflows for job postings, candidate pipelines, interview coordination, and hiring-stage visibility.'
      },
      {
        question: 'Can TalentCIO help with onboarding?',
        answer:
          'Yes. TalentCIO supports onboarding with pre-joining workflows, document collection, policy acknowledgement, and readiness steps before a new hire starts.'
      },
      {
        question: 'Is TalentCIO good for small and growing teams?',
        answer:
          'Yes. The platform is designed to work for smaller teams moving off spreadsheets as well as growing organizations that need more connected workflows across HR and hiring.'
      }
    ]
  },
  {
    title: 'Pricing',
    intro: 'Questions buyers ask when comparing plan structure, billing cadence, and evaluation steps.',
    items: [
      {
        question: 'How does TalentCIO pricing work?',
        answer:
          'TalentCIO pricing is typically shaped by team size, module requirements, and rollout scope. The pricing page shows plan structure, while a demo helps confirm the right fit for your business.'
      },
      {
        question: 'Does TalentCIO offer yearly pricing?',
        answer:
          'Yes. The pricing section includes both monthly and yearly billing views so buyers can compare costs and savings based on commitment period.'
      },
      {
        question: 'Can I request a demo before choosing a plan?',
        answer:
          'Yes. TalentCIO offers a demo request flow so teams can review the platform, discuss operational needs, and understand which plan or module setup fits best.'
      }
    ]
  },
  {
    title: 'Implementation',
    intro: 'Questions about next steps, rollout conversations, and reaching the TalentCIO team.',
    items: [
      {
        question: 'How do I contact TalentCIO for implementation or sales questions?',
        answer:
          'You can contact TalentCIO through the contact page or submit a demo request to discuss implementation, pricing, modules, and rollout priorities with the team.'
      }
    ]
  }
];

export const HOMEPAGE_FAQS = HOMEPAGE_FAQ_GROUPS.flatMap((group) => group.items);

export const PAGE_COPY = {
  features: {
    title: 'HR Software Services - HRMS, Payroll, Recruitment & Compliance | TalentCIO',
    description:
      'Explore TalentCIO features across attendance, hiring, onboarding, leave management, help desk workflows, and employee operations.'
  },
  pricing: {
    title: 'Affordable HR Software Pricing Plans - TalentCIO | Start Free Trial',
    description:
      'Learn how TalentCIO pricing works across modules, users, and rollout scope. Add only real INR pricing plans to this page.'
  },
  about: {
    title: 'About TalentCIO - Leading HR Software Provider in India | Our Story',
    description:
      'TalentCIO brings attendance, hiring, onboarding, and employee workflows together for Indian companies that want one connected HR system.'
  },
  contact: {
    title: 'Contact TalentCIO | Book a Demo or Reach the Team',
    description:
      'Contact the TalentCIO team to discuss demos, implementation scope, modules, pricing, and hiring workflows.'
  },
  home: {
    title: 'TalentCIO - Modern HR & Payroll Software for Indian Businesses | HRMS',
    description:
      'TalentCIO combines attendance, hiring, onboarding, leaves, help desk workflows, and employee operations in one HR platform for Indian teams.'
  },
  demo: {
    title: 'Request a TalentCIO Demo | HRMS Walkthrough for Indian Businesses',
    description:
      'Request a TalentCIO demo to review attendance, hiring, onboarding, and employee operations workflows with your team.'
  },
  jobs: {
    title: 'TalentCIO Jobs | Verified Open Roles on TalentCIO',
    description:
      'Browse verified jobs published through TalentCIO and explore current openings by function, location, and department.'
  },
  blog: {
    titleTemplate: '[Article Title] - HR Insights & Best Practices | TalentCIO Blog'
  }
};
