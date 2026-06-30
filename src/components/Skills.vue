<script setup>
import {useI18n} from 'vue-i18n';

const { t, tm } = useI18n();
</script>

<template>
  <section id="skills">
    <h2>{{ t('Common_data.Common_title_skills') }}</h2>
    <div class="skills__grid">
      <div 
        v-for="skill in tm('Skills_data.skills_list')"
        :key="skill.name" 
        class="skill-card"
        :style="{ '--skill-color': skill.color }"
      >
        <div class="skill-card__content">
          <span class="skill-card__name">{{ skill.name }}</span>
          <div class="skill-card__tooltip">
            <p class="skill-card__expertise">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <p class="skills__note">{{ t('Skills_data.extra_text') }}</p>
  </section>
</template>

<style scoped>

.skills__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-card {
  --skill-color: var(--border-color);

  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--block-radius);
  padding: 0.6rem 1.2rem;
  transition: border-color var(--transition-default), background-color var(--transition-default);
}

.skill-card__name {
  font-weight: 600;
  color: var(--text-primary);
  transition: color var(--transition-default);
  user-select: none;
}

.skill-card:hover  {
  border-color: var(--skill-color);
  box-shadow: 0 0 10px var(--skill-color);
  transform: translateY(-4px);
}

.skill-card:hover .skill-card__name {
  color: var(--skill-color);
}

.skill-card__tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-30%) translateY(-10px);
  width: 250px;
  background: var(--header-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--block-radius);
  padding: 1rem;
  box-shadow: var(--shadow);
  opacity: 0;
  visibility: hidden;
  z-index: var(--z-index-tooltip);
  transition: opacity var(--transition-default),
  visibility var(--transition-default),
  transform var(--transition-default);
}

.skill-card:hover .skill-card__tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-30%) translateY(-5px);
}

.skill-card__expertise {
  font-size: 0.85rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.skills__note {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: var(--text-primary);
  font-style: italic;
}

@media (max-width: 768px) {
  .skill-card__tooltip {
    width: 150px;
    left: 0;
    transform: translateX(0) translateY(-10px);
  }
  .skill-card:hover .skill-card__tooltip {
    transform: translateX(0) translateY(-5px);
  }
}
</style>
