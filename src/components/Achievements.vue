<script setup>
import {computed, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import useMediaQuery from '../composables/useMediaQuery.js';

import Carousel from './Carousel.vue';
import AchievementModal from './AchievementModal.vue';

const { t, tm } = useI18n();
const isMobile = useMediaQuery('(max-width: 768px)');

const selectedItem = ref(null);
const showScreenshots = ref(false);
const elementsPerPage = computed(() => isMobile.value ? 1 : 2);

const openModal = (item) => {
  selectedItem.value = item;
  showScreenshots.value = false;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedItem.value = null;
  document.body.style.overflow = 'auto';
};

const toggleScreenshots = () => {
  showScreenshots.value = !showScreenshots.value;
};
</script>

<template>
  <section id="achievements">
    <h2>{{ t('Common_data.Common_title_achievements') }}</h2>

    <div class="achievements__content">
      <Carousel 
        :items="tm('Achievements_data.Achievements_list')"
        :perPage="elementsPerPage"
        :prevLabel="t('Achievements_data.carousel_prev')"
        :nextLabel="t('Achievements_data.carousel_next')"
      >
        <template #default="{ item }">
          <div 
            class="achievement-card"
            @click="openModal(item)"
            role="button"
            tabindex="0"
            @keydown.enter="openModal(item)"
            @keydown.space.prevent="openModal(item)"
          >
            <div class="tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
            <h4>{{ item.title }}</h4>
            <p class="achievement-card__desc">{{ item.desc }}</p>
          </div>
        </template>
      </Carousel>
    </div>

    <!-- Modal -->
    <AchievementModal
      :selectedItem="selectedItem"
      :showScreenshots="showScreenshots"
      @closeModal="closeModal"
      @toggleScreenshots="toggleScreenshots"
      />
  </section>
</template>

<style scoped>
.achievements__content {
  margin: 0 -10px;
}

.achievement-card {
  height: 100%;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--block-radius);
  padding: 1.75rem;
  cursor: pointer;
  transition:  transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  user-select: none;
}

.achievement-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
  box-shadow: var(--shadow);
}
</style>
