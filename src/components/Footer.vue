<script setup>
import {useI18n} from 'vue-i18n';

const { t } = useI18n();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer__container">
      <h4>{{ t('Common_data.Footer_title_contact') }}</h4>
      <div class="footer__links">
        <a :href="t('Common_data.Common_links.github')" target="_blank" class="footer__link">{{ t('Common_data.Common_links.github_title') }}</a>
        <a :href="t('Common_data.Common_links.linkedin')" target="_blank" class="footer__link">{{t('Common_data.Common_links.linkedin_title')}}</a>
        <a :href="'mailto:' + t('Common_data.Common_links.email')" class="footer__link">{{t('Common_data.Common_links.email_title')}}</a>
      </div>
      <p class="footer__copy">
        <span class="material-symbols-outlined footer__copy-icon" aria-hidden="true">copyright </span> {{ currentYear }} {{ t('Common_data.Common_name') }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-color);
  background-color: var(--header-bg);
  margin-top: 2rem;
}

.footer__links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.footer__link {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--accent);
  text-decoration: none;
}

.footer__copy {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.footer__copy-icon {
  font-size: 0.85rem;
}
</style>
