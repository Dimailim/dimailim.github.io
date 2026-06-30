<script setup>
import {useI18n} from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="business-card" id="top">
    <div class="business-card__content">
      <span class="business-card__badge">{{t('Common_data.BusinessCard_direction')}}</span>
      <h1 class="business-card__name">{{ t('Common_data.Common_name') }}</h1>
      <p class="business-card__position">{{ t('Common_data.BusinessCard_position') }}</p>
      <p class="business-card__email"><span class="material-symbols-outlined business-card__email-logo" aria-label="Email">mail</span>
        {{t('Common_data.Common_links.email')}}
      </p>
    </div>
  </section>
</template>

<style scoped>
.business-card {
  padding: 6rem 0 4rem;
}

.business-card__content {
  position: relative;
  max-width: 600px;
}

.business-card__content::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  width: 60px;
  height: 60px;
  border-top: 4px solid var(--accent);
  border-left: 4px solid var(--accent);
  opacity: 0.3;
}

.business-card__badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--accent);
  color: var(--btn-accent-text);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 4px;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.business-card__name {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  color: var(--text-primary);
  font-weight: 800;
}

.business-card__position {
  font-size: 1.5rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-left: 2px;
}

.business-card__email {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  padding-top: 0.5rem;
}

.business-card__email-logo {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .business-card__name {
    font-size: 2.5rem;
  }
  .business-card__position {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .business-card__name {
    font-size: 2rem;
  }
}
</style>
