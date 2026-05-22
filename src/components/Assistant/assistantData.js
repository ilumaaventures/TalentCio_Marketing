const baseWelcomeMessage = `Hi \u{1F44B}
Welcome to our website.
I can help you explore our services, projects, and solutions.

What would you like to explore?`;

export const ASSISTANT_ACTIONS = {
  about: {
    id: 'about',
    label: 'About Us',
    path: '/about',
    selector: '#about-overview',
    message:
      'This section explains the TalentCIO story, why the platform exists, and how the product reduces disconnected HR workflows.',
    confirmation:
      'Here is the About page. It gives you the product story, rollout perspective, and the problem TalentCIO is solving.'
  },
  services: {
    id: 'services',
    label: 'Services',
    path: '/',
    selector: '#services',
    message:
      'Let me take you to the services area so you can explore the platform modules and operational workflows in one place.',
    confirmation:
      'Here are our automation and digital solutions. You can explore each service card for more details.'
  },
  projects: {
    id: 'projects',
    label: 'Projects',
    path: '/',
    selector: '#projects',
    message:
      'I will show you the interactive showcase next. It is the closest match to project-style walkthroughs on this site.',
    confirmation:
      'This showcase highlights the platform modules in action, so you can quickly understand how each workflow fits together.'
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    selector: '#contact-details',
    message:
      'I can take you to the contact page so you can reach the team or jump into the demo request flow.',
    confirmation:
      'You are in the contact area now. This is the fastest path for email outreach or for moving into a guided demo request.'
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing',
    path: '/pricing',
    selector: '#pricing-overview',
    message:
      'I will open the pricing page and bring the plan comparison into view so you can compare the rollout options faster.',
    confirmation:
      'Here is the pricing experience. You can compare plans, billing cadence, and the best fit for your team size.'
  },
  careers: {
    id: 'careers',
    label: 'Careers',
    path: '/jobs',
    selector: '#careers-overview',
    message:
      'Let me bring you to the careers area so you can browse live openings and narrow them with filters.',
    confirmation:
      'This is the careers section. You can filter open roles and move into job details from here.'
  }
};

const sharedActions = ['about', 'services', 'projects', 'contact', 'pricing', 'careers'];

export function getAssistantConfig(pathname) {
  if (
    pathname.startsWith('/company/login') ||
    pathname.startsWith('/applicant/login') ||
    pathname.startsWith('/applicant/register') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/my-applications')
  ) {
    return null;
  }

  if (pathname.startsWith('/features')) {
    return {
      key: 'features',
      pageLabel: 'Features',
      welcomeMessage:
        'You are on the features experience. I can walk you through the service cards, module showcase, and rollout guidance on this page.',
      idleMessage:
        'Need a quick product tour? I can jump you to service cards, workflow modules, or pricing next.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'features-overview',
          selector: '#features-overview',
          label: 'Features Overview',
          enterMessage:
            'This intro explains how TalentCIO connects hiring, onboarding, attendance, and employee operations.',
          suggestionActionId: 'services',
          idleMessage: 'Want me to jump into the service cards or the module showcase next?'
        },
        {
          key: 'services',
          selector: '#services',
          label: 'Service Cards',
          enterMessage:
            'These cards break down the core service areas, from smart attendance to talent acquisition and internal workflows.',
          suggestionActionId: 'projects'
        },
        {
          key: 'projects',
          selector: '#projects',
          label: 'Module Showcase',
          enterMessage:
            'This interactive showcase gives a guided look at the product modules and how they work together.',
          suggestionActionId: 'pricing'
        },
        {
          key: 'contact-cta',
          selector: '#contact-cta',
          label: 'Call to Action',
          enterMessage:
            'When you are ready, this section routes visitors into the demo flow or open roles.',
          suggestionActionId: 'contact'
        }
      ]
    };
  }

  if (pathname.startsWith('/pricing')) {
    return {
      key: 'pricing',
      pageLabel: 'Pricing',
      welcomeMessage:
        'You are on the pricing page. I can help you compare plans, billing cadence, and the best next step for speaking with the team.',
      idleMessage:
        'Need help choosing a plan? I can point you to the pricing cards or move you to the contact path next.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'pricing-overview',
          selector: '#pricing-overview',
          label: 'Pricing Overview',
          enterMessage:
            'This top section explains what influences pricing and how to evaluate the plan structure.',
          suggestionActionId: 'pricing'
        },
        {
          key: 'pricing',
          selector: '#pricing',
          label: 'Pricing Plans',
          enterMessage:
            'These plan cards show the tiered setup, monthly and yearly options, and which rollout stage each plan fits best.',
          suggestionActionId: 'contact'
        },
        {
          key: 'contact-cta',
          selector: '#contact-cta',
          label: 'Commercial CTA',
          enterMessage:
            'This CTA is the quickest route into a guided conversation with the commercial team.',
          suggestionActionId: 'contact'
        }
      ]
    };
  }

  if (pathname.startsWith('/about')) {
    return {
      key: 'about',
      pageLabel: 'About',
      welcomeMessage:
        'You are on the About page. I can highlight the product story, the market context, and the best next step if you want a walkthrough.',
      idleMessage:
        'Would you like a quick summary of the product story or should I take you to pricing or contact next?',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'about-overview',
          selector: '#about-overview',
          label: 'About Overview',
          enterMessage:
            'This section explains why TalentCIO focuses on connected HR operations instead of fragmented tools.',
          suggestionActionId: 'services'
        },
        {
          key: 'about-sources',
          selector: '#about-sources',
          label: 'Sources and Proof',
          enterMessage:
            'Here you can review the external sources that support the market positioning on the site.',
          suggestionActionId: 'contact'
        },
        {
          key: 'contact-cta',
          selector: '#contact-cta',
          label: 'Request a Demo',
          enterMessage:
            'This CTA moves visitors from research into a live product conversation.',
          suggestionActionId: 'contact'
        }
      ]
    };
  }

  if (pathname.startsWith('/contact')) {
    return {
      key: 'contact',
      pageLabel: 'Contact',
      welcomeMessage:
        'You are on the contact page. I can help you decide whether to email directly or move into the demo request workflow.',
      idleMessage:
        'Need the fastest route? The demo request flow is usually the best next step for product, pricing, and rollout questions.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'contact-details',
          selector: '#contact-details',
          label: 'Contact Details',
          enterMessage:
            'This area gives you the direct contact path and explains when to use the demo flow instead.',
          suggestionActionId: 'contact'
        },
        {
          key: 'contact-aside',
          selector: '#contact-aside',
          label: 'Conversation Prep',
          enterMessage:
            'These notes help visitors share the right rollout details before speaking with the team.',
          suggestionActionId: 'pricing'
        },
        {
          key: 'contact-cta',
          selector: '#contact-cta',
          label: 'Next Step CTA',
          enterMessage:
            'From here, users can move directly into a structured product conversation.',
          suggestionActionId: 'pricing'
        }
      ]
    };
  }

  if (pathname.startsWith('/jobs')) {
    return {
      key: 'jobs',
      pageLabel: 'Careers',
      welcomeMessage:
        'You are in the careers experience. I can guide you to live roles, filters, and the fastest path to a detailed opening.',
      idleMessage:
        'Need help finding the right role? I can point you to the filter panel or take you back to the services overview.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'careers-overview',
          selector: '#careers-overview',
          label: 'Careers Overview',
          enterMessage:
            'This section introduces the public job board and explains how to search by role, location, and department.',
          suggestionActionId: 'careers'
        },
        {
          key: 'careers-filters',
          selector: '#careers-filters',
          label: 'Job Filters',
          enterMessage:
            'These filters help visitors narrow the list quickly before opening a specific role.',
          suggestionActionId: 'careers'
        },
        {
          key: 'careers-results',
          selector: '#careers-results',
          label: 'Live Roles',
          enterMessage:
            'This is where the live openings appear. Each card can take you deeper into the role details.',
          suggestionActionId: 'contact'
        }
      ]
    };
  }

  if (pathname.startsWith('/demo')) {
    return {
      key: 'demo',
      pageLabel: 'Demo Request',
      welcomeMessage:
        'You are on the demo request page. I can help explain what information the team needs and where the form details go next.',
      idleMessage:
        'If you are unsure what to enter, start with company, team size, and the modules you care about most.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'demo-overview',
          selector: '#demo-overview',
          label: 'Demo Overview',
          enterMessage:
            'This section sets expectations for the product walkthrough and why the form asks about workflows and team size.',
          suggestionActionId: 'services'
        },
        {
          key: 'demo-form',
          selector: '#demo-form',
          label: 'Demo Form',
          enterMessage:
            'This is the main demo form. Visitors can share their team context, selected modules, and rollout priorities here.',
          suggestionActionId: 'pricing'
        }
      ]
    };
  }

  return {
    key: 'home',
    pageLabel: 'Homepage',
    welcomeMessage: baseWelcomeMessage,
    idleMessage: 'Need help understanding our services? I can guide you to the main solution areas.',
    quickActionIds: sharedActions,
    sections: [
      {
        key: 'hero',
        selector: '#hero',
        label: 'Welcome',
        enterMessage:
          'This hero section gives the quickest overview of TalentCIO and the two primary next steps: request a demo or explore open roles.',
        suggestionActionId: 'services',
        idleMessage: 'I can show you the services area next if you want a faster product overview.'
      },
      {
        key: 'market-overview',
        selector: '#market-overview',
        label: 'Market Overview',
        enterMessage:
          'This block explains the market pressure behind connected HR systems and why fragmented tools slow teams down.',
        suggestionActionId: 'services'
      },
      {
        key: 'services',
        selector: '#services',
        label: 'Services',
        enterMessage:
          'Here are the main service areas. Each card introduces a core capability of the platform.',
        suggestionActionId: 'projects'
      },
      {
        key: 'projects',
        selector: '#projects',
        label: 'Solutions Showcase',
        enterMessage:
          'This interactive module showcase is great for understanding how the system works in practice.',
        suggestionActionId: 'pricing'
      },
      {
        key: 'how-it-works',
        selector: '#how-it-works',
        label: 'How It Works',
        enterMessage:
          'This section shows the path from setup to everyday usage in three simple stages.',
        suggestionActionId: 'pricing'
      },
      {
        key: 'pricing',
        selector: '#pricing',
        label: 'Pricing',
        enterMessage:
          'This is the pricing section. It compares the main plan levels and lets visitors switch between monthly and yearly views.',
        suggestionActionId: 'contact'
      },
      {
        key: 'insights',
        selector: '#insights',
        label: 'Market Signals',
        enterMessage:
          'These market signals reinforce why HR operations platforms matter right now.',
        suggestionActionId: 'about'
      },
      {
        key: 'faq',
        selector: '#faq',
        label: 'FAQ',
        enterMessage:
          'This FAQ answers common buyer questions about modules, workflows, and rollout considerations.',
        suggestionActionId: 'contact'
      },
      {
        key: 'contact-cta',
        selector: '#contact-cta',
        label: 'Final CTA',
        enterMessage:
          'This final CTA is the handoff point into the demo or careers journey.',
        suggestionActionId: 'contact'
      }
    ]
  };
}
