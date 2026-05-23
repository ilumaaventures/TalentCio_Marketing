import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ASSISTANT_ACTIONS, getAssistantConfig } from './assistantData';
import { findAssistantAnswer, getAssistantPromptSuggestions } from './assistantKnowledge';

const IDLE_TIMEOUT = 15000;
const NAVBAR_OFFSET = 112;
const ANNOUNCEMENT_COOLDOWN = 2600;

function getTargetElement(selector) {
  if (!selector || typeof document === 'undefined') {
    return null;
  }

  return document.querySelector(selector);
}

function scrollToTarget(element) {
  const top = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth'
  });
}

function spotlightTarget(element) {
  element.classList.remove('assistant-spotlight');
  void element.offsetWidth;
  element.classList.add('assistant-spotlight');

  window.setTimeout(() => {
    element.classList.remove('assistant-spotlight');
  }, 2200);
}

export default function useAssistant() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = useMemo(() => getAssistantConfig(location.pathname), [location.pathname]);
  const isVisible = Boolean(config);

  const [panelState, setPanelState] = useState('expanded');
  const [message, setMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeSectionKey, setActiveSectionKey] = useState('');
  const [visitedActionIds, setVisitedActionIds] = useState([]);
  const [visitedSectionKeys, setVisitedSectionKeys] = useState([]);
  const [hasNotification, setHasNotification] = useState(false);
  const [pendingActionId, setPendingActionId] = useState('');

  const pendingNavigationRef = useRef(null);
  const messageCounterRef = useRef(0);
  const lastAnnouncementRef = useRef(0);
  const announcedSectionsRef = useRef(new Set());
  const sectionVisibilityRef = useRef({});

  const actions = useMemo(() => {
    if (!config) {
      return [];
    }

    return config.quickActionIds.map((id) => ASSISTANT_ACTIONS[id]).filter(Boolean);
  }, [config]);

  const activeSection = useMemo(
    () => config?.sections.find((section) => section.key === activeSectionKey) || config?.sections[0] || null,
    [activeSectionKey, config]
  );
  const promptSuggestions = useMemo(() => getAssistantPromptSuggestions(location.pathname), [location.pathname]);

  const suggestedAction = useMemo(() => {
    if (!actions.length) {
      return null;
    }

    const contextualAction = activeSection?.suggestionActionId
      ? ASSISTANT_ACTIONS[activeSection.suggestionActionId]
      : null;

    if (contextualAction) {
      return contextualAction;
    }

    return actions.find((action) => !visitedActionIds.includes(action.id)) || actions[0];
  }, [actions, activeSection, visitedActionIds]);

  const pushMessage = useCallback(
    (text, options = {}) => {
      if (!text) {
        return;
      }

      messageCounterRef.current += 1;
      lastAnnouncementRef.current = Date.now();
      setIsTyping(true);
      setMessage({
        id: messageCounterRef.current,
        text,
        question: options.question || '',
        contextLabel: options.contextLabel || config?.pageLabel || 'Guide',
        timestamp: Date.now()
      });

      if (panelState !== 'expanded') {
        setHasNotification(true);
      }
    },
    [config?.pageLabel, panelState]
  );

  const focusTarget = useCallback((selector, options = {}) => {
    const element = getTargetElement(selector);

    if (!element) {
      return false;
    }

    if (options.scroll !== false) {
      scrollToTarget(element);
    }

    window.setTimeout(() => spotlightTarget(element), options.spotlightDelay || 180);
    return true;
  }, []);

  const openAssistant = useCallback(() => {
    setPanelState('expanded');
    setHasNotification(false);
  }, []);

  const minimizeAssistant = useCallback(() => {
    setPanelState('minimized');
  }, []);

  const dismissAssistant = useCallback(() => {
    setPanelState('hidden');
  }, []);

  const askAssistant = useCallback(
    (question) => {
      const trimmedQuestion = String(question || '').trim();

      if (!trimmedQuestion) {
        return false;
      }

      const answer = findAssistantAnswer(trimmedQuestion, location.pathname);

      setPanelState('expanded');
      setHasNotification(false);
      pushMessage(answer.text, {
        contextLabel: answer.contextLabel,
        question: trimmedQuestion
      });

      return true;
    },
    [location.pathname, pushMessage]
  );

  const handleAction = useCallback(
    (action) => {
      if (!action) {
        return;
      }

      setPendingActionId(action.id);
      setVisitedActionIds((current) => (current.includes(action.id) ? current : [...current, action.id]));
      pushMessage(action.message, { contextLabel: action.label });

      if (location.pathname === action.path) {
        const found = focusTarget(action.selector);

        if (found) {
          window.setTimeout(() => {
            pushMessage(action.confirmation, { contextLabel: action.label });
          }, 620);
        }
      } else {
        pendingNavigationRef.current = action;
        navigate(`${action.path}${action.selector || ''}`);
      }

      window.setTimeout(() => setPendingActionId(''), 1400);
    },
    [focusTarget, location.pathname, navigate, pushMessage]
  );

  useEffect(() => {
    if (!config) {
      return undefined;
    }

    announcedSectionsRef.current = new Set();
    sectionVisibilityRef.current = {};
    setActiveSectionKey(config.sections[0]?.key || '');

    const welcomeTimer = window.setTimeout(() => {
      pushMessage(config.welcomeMessage, { contextLabel: config.pageLabel });
    }, 480);

    return () => window.clearTimeout(welcomeTimer);
  }, [config, pushMessage]);

  useEffect(() => {
    if (!config?.sections?.length) {
      return undefined;
    }

    const sectionElements = config.sections
      .map((section) => ({
        section,
        element: getTargetElement(section.selector)
      }))
      .filter((item) => item.element);

    if (!sectionElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const matched = sectionElements.find((item) => item.element === entry.target);

          if (matched) {
            sectionVisibilityRef.current[matched.section.key] = entry.isIntersecting ? entry.intersectionRatio : 0;
          }
        });

        const topSection = [...sectionElements]
          .sort(
            (left, right) =>
              (sectionVisibilityRef.current[right.section.key] || 0) -
              (sectionVisibilityRef.current[left.section.key] || 0)
          )
          .find((item) => (sectionVisibilityRef.current[item.section.key] || 0) > 0.16);

        if (!topSection) {
          return;
        }

        setActiveSectionKey(topSection.section.key);
        setVisitedSectionKeys((current) =>
          current.includes(topSection.section.key) ? current : [...current, topSection.section.key]
        );

        const canAnnounce =
          !announcedSectionsRef.current.has(topSection.section.key) &&
          Date.now() - lastAnnouncementRef.current > ANNOUNCEMENT_COOLDOWN;

        if (canAnnounce && topSection.section.enterMessage) {
          announcedSectionsRef.current.add(topSection.section.key);
          pushMessage(topSection.section.enterMessage, { contextLabel: topSection.section.label });
        }
      },
      {
        threshold: [0.18, 0.35, 0.55, 0.75],
        rootMargin: '-18% 0px -42% 0px'
      }
    );

    sectionElements.forEach((item) => observer.observe(item.element));

    return () => observer.disconnect();
  }, [config, pushMessage]);

  useEffect(() => {
    const pendingAction = pendingNavigationRef.current;

    if (!pendingAction || location.pathname !== pendingAction.path) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const found = focusTarget(pendingAction.selector, { scroll: !location.hash });

      if (found) {
        pushMessage(pendingAction.confirmation, { contextLabel: pendingAction.label });
      }

      pendingNavigationRef.current = null;
    }, 420);

    return () => window.clearTimeout(timer);
  }, [focusTarget, location.hash, location.pathname, pushMessage]);

  useEffect(() => {
    if (!config) {
      return undefined;
    }

    let idleTimer = null;

    const scheduleIdlePrompt = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        const idleCopy = activeSection?.idleMessage || config.idleMessage;
        pushMessage(idleCopy, {
          contextLabel: activeSection?.label || config.pageLabel
        });
      }, IDLE_TIMEOUT);
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, scheduleIdlePrompt, { passive: true }));
    scheduleIdlePrompt();

    return () => {
      window.clearTimeout(idleTimer);
      activityEvents.forEach((eventName) =>
        window.removeEventListener(eventName, scheduleIdlePrompt, { passive: true })
      );
    };
  }, [activeSection, config, pushMessage]);

  return {
    actions,
    activeSection,
    askAssistant,
    dismissAssistant,
    handleAction,
    hasNotification,
    isTyping,
    isVisible,
    memory: {
      visitedActionIds,
      visitedSectionKeys
    },
    message,
    minimizeAssistant,
    openAssistant,
    panelState,
    pendingActionId,
    promptSuggestions,
    setHasNotification,
    setIsTyping,
    suggestedAction
  };
}
