<script setup>
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const {t, tm} = useI18n();
const expandedId = ref(null);

const toggleExpand = (id) => {
  expandedId.value = expandedId.value === id ? null : id;
};

</script>

<template>
  <section id="experience">
    <h2>{{ t('Common_data.Common_title_experience') }}</h2>
    <div class="experience__list">
      <div 
        v-for="item in tm('Experience_data')"
        :key="item.id" 
        class="experience-item"
        :class="{ 'experience-item--expanded': expandedId === item.id }"
      >
        <div class="experience-item__header" @click="toggleExpand(item.id)">
          <div class="experience-item__main-info">
            <h3 class="experience-item__company">{{ item.company }}</h3>
            <span class="experience-item__role">{{ item.role }}</span>
          </div>
          <div class="experience-item__meta">
            <span class="experience-item__period">{{ item.period }}</span>
            <span class="experience-item__icon">
              <span class="material-symbols-outlined">
                  arrow_drop_down_circle
              </span>
            </span>
          </div>
        </div>
        
        <div class="experience-item__content">
          <ul class="experience-item__details">
            <li v-for="(detail, index) in item.details" :key="index" class="list-marked__item">
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.experience-item {
  border: 1px solid var(--border-color);
  border-radius: var(--block-radius);
  margin-bottom: 1rem;
  background: var(--card-bg);
  overflow: hidden;
}

.experience-item__header {
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
}

.experience-item__header:hover {
  background-color: var(--bg-color);
}

.experience-item__company {
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
}

.experience-item__role {
  color: var(--text-secondary);
  font-weight: 500;
}

.experience-item__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.experience-item__period {
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.experience-item__icon {
  transition: transform var(--transition-slow);
  color: var(--text-secondary);
}

.experience-item--expanded .experience-item__icon {
  transform: rotate(180deg);
}

.experience-item__content {
  max-height: 0;
  transition: max-height 1s cubic-bezier(0, 1, 0, 1);
  background-color: var(--bg-color);
}

.experience-item--expanded .experience-item__content {
  max-height: 1000px;
  transition: max-height 1s ease-in;
}

.experience-item__details {
  padding: 1.25rem 1.25rem 1.25rem 2.5rem;
  list-style: none;
}

@media (max-width: 768px) {
  .experience-item__header {
    flex-direction: column;
    gap: 0.75rem;
  }
  .experience-item__meta {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
