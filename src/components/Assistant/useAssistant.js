import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ASSISTANT_ACTIONS, getAssistantConfig } from './assistantData';

const IDLE_TIMEOUT = 15000;
const NAVBAR_OFFSET = 112;
const ANNOUNCEMENT_COOLDOWN = 2600;
const PREFERRED_VOICE_PATTERNS = [
  /aria/i,
  /jenny/i,
  /samantha/i,
  /zira/i,
  /natasha/i,
  /neerja/i,
  /google uk english female/i,
  /google us english/i,
  /heera/i,
  /priya/i
];

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

function scoreVoice(voice) {
  const name = `${voice.name || ''} ${voice.voiceURI || ''}`;
  let score = 0;

  if (/en-in/i.test(voice.lang || '')) {
    score += 5;
  }

  if (/en-gb|en-us/i.test(voice.lang || '')) {
    score += 4;
  }

  if (voice.localService) {
    score += 3;
  }

  if (voice.default) {
    score += 2;
  }

  if (PREFERRED_VOICE_PATTERNS.some((pattern) => pattern.test(name))) {
    score += 8;
  }

  if (/male/i.test(name)) {
    score -= 1;
  }

  if (/robot|espeak|synthetic/i.test(name)) {
    score -= 6;
  }

  return score;
}

function selectPreferredVoice(voices) {
  return [...voices]
    .filter((voice) => /^en/i.test(voice.lang || ''))
    .sort((left, right) => scoreVoice(right) - scoreVoice(left))[0] || null;
}

export default function useAssistant() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = useMemo(() => getAssistantConfig(location.pathname), [location.pathname]);
  const isVisible = Boolean(config);

  const [panelState, setPanelState] = useState('expanded');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
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
  const voiceRef = useRef(null);
  const selectedVoiceRef = useRef(null);

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

  const speakMessage = useCallback((text) => {
    if (
      typeof window === 'undefined' ||
      !window.speechSynthesis ||
      !text
    ) {
      return;
    }

    const availableVoices = window.speechSynthesis.getVoices();
    selectedVoiceRef.current = selectPreferredVoice(availableVoices) || selectedVoiceRef.current;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\s+/g, ' ').trim());
    utterance.voice = selectedVoiceRef.current;
    utterance.lang = selectedVoiceRef.current?.lang || 'en-IN';
    utterance.rate = 0.96;
    utterance.pitch = 1;
    utterance.volume = 1;
    voiceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

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
        contextLabel: options.contextLabel || config?.pageLabel || 'Guide',
        timestamp: Date.now()
      });

      if (panelState !== 'expanded') {
        setHasNotification(true);
      }

      if (voiceEnabled && !options.silent) {
        speakMessage(text);
      }
    },
    [config?.pageLabel, panelState, speakMessage, voiceEnabled]
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

  const toggleVoice = useCallback(() => {
    setVoiceEnabled((current) => {
      const nextValue = !current;

      if (!nextValue && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      return nextValue;
    });
  }, []);

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

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return undefined;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      if (voices.length) {
        selectedVoiceRef.current = selectPreferredVoice(voices) || selectedVoiceRef.current;
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    actions,
    activeSection,
    canUseVoice: typeof window !== 'undefined' && 'speechSynthesis' in window,
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
    setHasNotification,
    setIsTyping,
    suggestedAction,
    toggleVoice,
    voiceEnabled
  };
}
