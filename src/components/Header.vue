<script setup>
import {onMounted, onUnmounted} from 'vue';
import {useI18n} from 'vue-i18n';
import useLanguage from '../composables/useLanguage';
import useTheme from '../composables/useTheme';
import useIntersectionObserver from '../composables/useIntersectionObserver.js';
import useMediaQuery from '../composables/useMediaQuery.js';

const { t } = useI18n();
const { theme, toggleTheme } = useTheme();
const { locale, toggleLang } = useLanguage();
const isTablet = useMediaQuery('(max-width: 900px)');
const threshold = isTablet.value ? 0.33 : 0.65
const { visibleElementId, initObservers, disconnectObserver } = useIntersectionObserver({rootMargin: '80px 0px 0px 0px', threshold});

const scrollTo = (id) => {
  const TOP_POSITION = 0;
  const element = document.getElementById(id);
  const shiftTop = {
    'about': 0,
    'skills': 100,
    'experience': 0,
    'achievements': 0,
  };

  if (element) {
    window.scrollTo({
      top: element.offsetTop - shiftTop[id],
      behavior: 'smooth'
    });
  } else if (id === 'top') {
    window.scrollTo({
      top: TOP_POSITION,
      behavior: 'smooth'
    });
  }
};

onMounted(() => {
  initObservers(['top', 'about', 'skills', 'experience', 'achievements']);
});
onUnmounted(() => {
  disconnectObserver();
});
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo" @click="scrollTo('top')"
           role="button" tabindex="0" :aria-label="t('Common_data.Common_button_scrollToTop')">
        <span class="header__name">{{ t('Common_data.Common_name') }}</span>
      </div>

      <nav class="header__nav">
        <ul class="header__nav-list">
          <li>
            <a 
              href="#about" 
              class="header__nav-link" 
              :class="{ 'header__nav-link--active': visibleElementId === 'about' }"
              @click.prevent="scrollTo('about')"
            >{{ t('Common_data.Common_title_about') }}</a>
          </li>
          <li>
            <a 
              href="#skills" 
              class="header__nav-link" 
              :class="{ 'header__nav-link--active': visibleElementId === 'skills' }"
              @click.prevent="scrollTo('skills')"
            >{{ t('Common_data.Common_title_skills') }}</a>
          </li>
          <li>
            <a 
              href="#experience" 
              class="header__nav-link" 
              :class="{ 'header__nav-link--active': visibleElementId === 'experience' }"
              @click.prevent="scrollTo('experience')"
            >{{ t('Common_data.Common_title_experience') }}</a>
          </li>
          <li>
            <a 
              href="#achievements" 
              class="header__nav-link" 
              :class="{ 'header__nav-link--active': visibleElementId === 'achievements' }"
              @click.prevent="scrollTo('achievements')"
            >{{ t('Common_data.Common_title_achievements') }}</a>
          </li>
        </ul>
      </nav>
      
      <div class="header__actions">
        <div class="header__socials">
          <a :href="t('Common_data.Common_links.github')" target="_blank" class="header__icon-link header__icon-link--github" :title="t('Common_data.Common_links.github_title')">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a :href="t('Common_data.Common_links.linkedin')" target="_blank" class="header__icon-link header__icon-link--linkedin" :title="t('Common_data.Common_links.linkedin_title')">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>

        <div class="header__lang-switcher">
          <button
              class="header__lang-btn"
              :class="{ 'header__lang-btn--active': locale === 'en' }"
              @click="toggleLang('en')"
              :aria-label="t('Common_data.Common_button_switchToEn')"
            >EN</button>
          <button
              class="header__lang-btn"
              :class="{ 'header__lang-btn--active': locale === 'ru' }"
              @click="toggleLang('ru')"
              :aria-label="t('Common_data.Common_button_switchToRu')"
            >RU</button>
        </div>
        <button class="header__theme-btn" @click="toggleTheme()" :aria-label="t('Common_data.Common_button_toggleTheme')">
          <span class="material-symbols-outlined">{{ theme === 'light' ? 'moon_stars' : 'light_mode' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 0;
  z-index: var(--z-index-header);
  backdrop-filter: blur(8px);
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.header__logo {
  cursor: pointer;
}

.header__name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.header__nav-list {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.header__nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.8rem;
  padding: 0.5rem 0;
  transition: color var(--transition-fast);
  position: relative;
}

.header__nav-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.header__nav-link--active {
  color: var(--accent);
}

.header__nav-link--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header__socials {
  display: flex;
  gap: 0.75rem;
}

.header__icon-link {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
}

.header__icon-link--github:hover {
  color: #333;
}

[data-theme='dark'] .header__icon-link--github:hover {
  color: #fff;
}

.header__icon-link--linkedin:hover {
  color: #0077b5;
}

.header__lang-switcher {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: var(--button-radius);
  overflow: hidden;
}

.header__lang-btn {
  background: none;
  border: none;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.header__lang-btn--active {
  background-color: var(--accent);
  color: var(--btn-accent-text);
}

.header__theme-btn  {
  background: none;
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.5rem;
  border-radius: var(--button-radius);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.material-symbols-outlined {
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
}

[data-theme='dark'] .material-symbols-outlined {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .header__nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .header__socials {
    display: none;
  }
}
</style>
