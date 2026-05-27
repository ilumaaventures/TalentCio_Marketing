const baseWelcomeMessage = `Hi \u{1F44B}
Welcome to our website.
I can help you explore solutions, platform, programs, industries, and pricing.

What would you like to explore?`;

export const ASSISTANT_ACTIONS = {
  solutions: {
    id: 'solutions',
    label: 'Solutions',
    helperText: 'Solution areas',
    path: '/solutions',
    selector: '#solutions-services',
    message:
      'Let me take you to the solutions page so you can review the current solution areas and how each offering fits different workforce needs.',
    confirmation:
      'You are in the solutions area now. This section breaks down the current talent and workforce solutions on the site.'
  },
  platform: {
    id: 'platform',
    label: 'Platform',
    helperText: 'Modules and workflows',
    path: '/features',
    selector: '#platform-modules',
    message:
      'I will open the platform page and bring the core modules into view so you can scan the current product coverage faster.',
    confirmation:
      'This is the platform section. You can review the live modules and how the product supports the workforce lifecycle.'
  },
  programs: {
    id: 'programs',
    label: 'Programs',
    helperText: 'TalentCard and CTP',
    path: '/programs',
    selector: '#programs-list',
    message:
      'Let me bring you to the flagship programs section so you can compare the offerings for professionals and organizations.',
    confirmation:
      'You are in the programs section now. This is where TalentCard and CTP are explained in detail.'
  },
  industries: {
    id: 'industries',
    label: 'Industries',
    helperText: 'Sector coverage',
    path: '/industries',
    selector: '#industries-grid',
    message:
      'I can take you to the industries page so you can see the sectors currently highlighted on the site.',
    confirmation:
      'This is the industries section. It shows the workforce contexts and sectors the TalentCIO model is designed for.'
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    helperText: 'Talk to the team',
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
    helperText: 'Plans and rollout',
    path: '/pricing',
    selector: '#pricing-overview',
    message:
      'I will open the pricing page and bring the plan comparison into view so you can compare the rollout options faster.',
    confirmation:
      'Here is the pricing experience. You can compare plans, billing cadence, and the best fit for your team size.'
  }
};

const sharedActions = ['solutions', 'platform', 'programs', 'industries', 'pricing', 'contact'];

export function getAssistantConfig(pathname) {
  if (
    pathname.startsWith('/company/login') ||
    pathname.startsWith('/applicant/login') ||
    pathname.startsWith('/applicant/register') ||
    pathname.startsWith('/profile') ||
    pathname.startsWith('/my-applications') ||
    pathname.startsWith('/terms') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/cookies')
  ) {
    return null;
  }

  if (pathname.startsWith('/features')) {
    return {
      key: 'features',
      pageLabel: 'Features',
      welcomeMessage:
        'You are on the features experience. I can walk you through the overview, platform modules, showcase, and rollout guidance on this page.',
      idleMessage:
        'Need a quick product tour? I can jump you to the platform modules, workflow showcase, or pricing next.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'features-overview',
          selector: '#features-overview',
          label: 'Features Overview',
          enterMessage:
            'This intro explains how TalentCIO connects hiring, onboarding, attendance, and employee operations.',
          suggestionActionId: 'platform',
          idleMessage: 'Want me to jump into the platform modules or the module showcase next?'
        },
        {
          key: 'platform-modules',
          selector: '#platform-modules',
          label: 'Platform Modules',
          enterMessage:
            'These module cards break down the core platform capabilities, from ATS and onboarding to attendance and HR operations.',
          suggestionActionId: 'platform'
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
          suggestionActionId: 'solutions'
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

  if (pathname.startsWith('/solutions')) {
    return {
      key: 'solutions',
      pageLabel: 'Solutions',
      welcomeMessage:
        'You are on the solutions page. I can help you understand the main solution areas, where each solution fits, and the fastest next step for a consultation.',
      idleMessage:
        'Need a quick summary? I can point you to the solutions overview or the solutions grid next.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'solutions-overview',
          selector: '#solutions-overview',
          label: 'Solutions Overview',
          enterMessage:
            'This overview introduces the strategic hiring and workforce advisory side of the ecosystem.',
          suggestionActionId: 'solutions'
        },
        {
          key: 'solutions-services',
          selector: '#solutions-services',
          label: 'Solutions Grid',
          enterMessage:
            'These cards break down the individual solution areas, from permanent hiring and RPO to HR consulting and workforce planning.',
          suggestionActionId: 'contact'
        },
        {
          key: 'contact-cta',
          selector: '#contact-cta',
          label: 'Consultation CTA',
          enterMessage:
            'This CTA is the easiest handoff into a consultation or product conversation.',
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
        'Need help finding the right role? I can point you to the filter panel or take you back to the ecosystem overview.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'careers-overview',
          selector: '#careers-overview',
          label: 'Careers Overview',
          enterMessage:
            'This section introduces the public job board and explains how to search by role, location, and department.',
          suggestionActionId: 'contact'
        },
        {
          key: 'careers-filters',
          selector: '#careers-filters',
          label: 'Job Filters',
          enterMessage:
            'These filters help visitors narrow the list quickly before opening a specific role.',
          suggestionActionId: 'contact'
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

  if (pathname.startsWith('/talentsphere')) {
    return {
      key: 'talentsphere',
      pageLabel: 'TalentSphere',
      welcomeMessage:
        'You are on the TalentSphere page. I can help explain who the community is for, what topics it covers, and how it connects to the broader ecosystem.',
      idleMessage:
        'Need a quick orientation? I can take you through the overview, network audience, or knowledge areas next.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'talentsphere-overview',
          selector: '#talentsphere-overview',
          label: 'TalentSphere Overview',
          enterMessage:
            'This section introduces TalentSphere as the ecosystem\'s leadership and talent community layer.',
          suggestionActionId: 'programs'
        },
        {
          key: 'network',
          selector: '#network',
          label: 'Community Audience',
          enterMessage:
            'This block shows the types of leaders, practitioners, and professionals the community is built for.',
          suggestionActionId: 'programs'
        },
        {
          key: 'knowledge',
          selector: '#knowledge',
          label: 'Focus Areas',
          enterMessage:
            'These focus areas show how TalentSphere supports workforce discussions, hiring insights, networking, and knowledge sharing.',
          suggestionActionId: 'contact'
        }
      ]
    };
  }

  if (pathname.startsWith('/programs')) {
    return {
      key: 'programs',
      pageLabel: 'Programs',
      welcomeMessage:
        'You are on the flagship programs page. I can help you compare TalentCard and CTP and explain which audience each program is built for.',
      idleMessage:
        'Need a fast comparison? I can point you to the program overview or the detailed program cards.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'programs-overview',
          selector: '#programs-overview',
          label: 'Programs Overview',
          enterMessage:
            'This section frames the flagship programs as offerings for both professionals and organizations.',
          suggestionActionId: 'programs'
        },
        {
          key: 'programs-list',
          selector: '#programs-list',
          label: 'Program Details',
          enterMessage:
            'This section breaks down TalentCard and CTP in detail, including positioning, services, focus areas, and scorecard thinking.',
          suggestionActionId: 'contact'
        },
        {
          key: 'contact-cta',
          selector: '#contact-cta',
          label: 'Programs CTA',
          enterMessage:
            'From here, visitors can move into a consultation or a broader platform conversation.',
          suggestionActionId: 'contact'
        }
      ]
    };
  }

  if (pathname.startsWith('/industries')) {
    return {
      key: 'industries',
      pageLabel: 'Industries',
      welcomeMessage:
        'You are on the industries page. I can help explain which sectors talentCIO supports and how the model adapts across different workforce realities.',
      idleMessage:
        'Want a quick scan? I can point you to the industries overview or the industry grid next.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'industries-overview',
          selector: '#industries-overview',
          label: 'Industries Overview',
          enterMessage:
            'This section sets up the idea that talentCIO is designed to adapt across different team structures, hiring models, and operational conditions.',
          suggestionActionId: 'industries'
        },
        {
          key: 'industries-grid',
          selector: '#industries-grid',
          label: 'Industry Grid',
          enterMessage:
            'These cards show the sectors currently highlighted on the site and the type of workforce context each one brings.',
          suggestionActionId: 'contact'
        },
        {
          key: 'contact-cta',
          selector: '#contact-cta',
          label: 'Industry CTA',
          enterMessage:
            'This CTA is the handoff point for teams that want to discuss fit in their sector.',
          suggestionActionId: 'contact'
        }
      ]
    };
  }

  if (pathname.startsWith('/insights')) {
    return {
      key: 'insights',
      pageLabel: 'Insights',
      welcomeMessage:
        'You are on the insights page. I can summarize the market signals, explain why they matter, and point you to the supporting sources.',
      idleMessage:
        'Need a quick market summary? I can take you through the overview, signal cards, or sources next.',
      quickActionIds: sharedActions,
      sections: [
        {
          key: 'insights-overview',
          selector: '#insights-overview',
          label: 'Insights Overview',
          enterMessage:
            'This top section frames the page around hiring demand, HR technology context, and the cost of fragmented workforce systems.',
          suggestionActionId: 'industries'
        },
        {
          key: 'insights-signals',
          selector: '#insights-signals',
          label: 'Market Signals',
          enterMessage:
            'These cards contain the main market data points used to explain why connected workforce systems matter right now.',
          suggestionActionId: 'industries'
        },
        {
          key: 'insights-sources',
          selector: '#insights-sources',
          label: 'Sources',
          enterMessage:
            'This section gives visitors the underlying sources for the market positioning and supporting context.',
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
          suggestionActionId: 'platform'
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
        suggestionActionId: 'solutions',
        idleMessage: 'I can show you the ecosystem overview next if you want a faster product summary.'
      },
      {
        key: 'market-overview',
        selector: '#market-overview',
        label: 'Market Overview',
        enterMessage:
          'This block explains the market pressure behind connected HR systems and why fragmented tools slow teams down.',
        suggestionActionId: 'solutions'
      },
      {
        key: 'ecosystem',
        selector: '#ecosystem',
        label: 'Ecosystem',
        enterMessage:
          'This ecosystem section introduces the four connected parts of talentCIO and what each one is responsible for.',
        suggestionActionId: 'platform'
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
        suggestionActionId: 'programs'
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
        suggestionActionId: 'industries'
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
