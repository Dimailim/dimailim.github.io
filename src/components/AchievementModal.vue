<script setup>
import {useI18n} from 'vue-i18n';
import {onMounted, onUnmounted} from 'vue';

const props = defineProps({
  selectedItem: Object,
  showScreenshots: Boolean
});
const emit = defineEmits(['closeModal', 'toggleScreenshots'])

const { t } = useI18n();
const onKeydown = (event) => {
  if (event.key === 'Escape' && props.selectedItem) {
    emit('closeModal');
  }
};
onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <Transition name="modal">
    <div v-if="selectedItem" class="modal__overlay" @click.self="$emit('closeModal')">
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="0">
        <header class="modal__header">
          <h3 id="modal-title">{{ selectedItem.title }}</h3>
          <button class="modal__close" @click="$emit('closeModal')" :aria-label="t('Achievements_data.modal_close')">
            <span class="material-symbols-outlined">close_small</span>
          </button>
        </header>

        <div class="tags modal__tags">
              <span v-for="tag in selectedItem.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
        </div>

        <article class="modal__content" aria-labelledby="modal-title">
          <p v-for="(line, index) in selectedItem.fullDesc" class="modal__full-desc" :key="index">{{ line }}</p>

          <template v-if="selectedItem.screenshots">
            <button class="modal__spoiler-btn" @click="$emit('toggleScreenshots')">
                <span class="material-symbols-outlined">
                  {{ showScreenshots ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
                </span>
              {{ showScreenshots ? t('Achievements_data.hide_screenshots') : t('Achievements_data.show_screenshots') }}
            </button>

            <Transition name="spoiler" >
              <div v-if="showScreenshots" class="modal__gallery">
                <div v-for="(img, idx) in selectedItem.screenshots" :key="idx" class="modal__gallery-item">
                  <img :src="img.src" :alt="img.alt" class="modal__gallery-img">
                  <p v-if="img.alt" class="modal__gallery-caption">{{ img.alt }}</p>
                </div>
              </div>
            </Transition>
          </template>

          <p v-if="selectedItem.commit_title" class="modal__links-title">{{selectedItem.commit_title}}</p>
          <div v-if="selectedItem.commit_links" class="modal__links">
            <a v-for="linkData in selectedItem.commit_links" :key="linkData.alt" :href="linkData.url" target="_blank" class="modal__link-btn">
              {{ linkData.alt }} ↗
            </a>
          </div>
        </article>

        <footer class="modal__footer">
          <button class="modal__footer-close" @click="$emit('closeModal')">{{ t('Achievements_data.modal_close') }}</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Modal Styles */
.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);
  padding: 1rem;
}

.modal__container {
  background: var(--card-bg);
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: var(--block-radius);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.modal__header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
}

.modal__tags {
  padding: 1rem 1.5rem 0;
}

.modal__content {
  padding: 1.5rem;
  overflow: auto;
  flex-grow: 1;
  color: var(--text-primary);
  -ms-overflow-style: none;
}

.modal__full-desc {
  margin-bottom: 1rem;
}

.modal__spoiler-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border-radius: var(--block-radius);
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: background-color var(--transition-fast);
}

.modal__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

.modal__footer-close {
  padding: 0.5rem 1.5rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: var(--button-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color var(--transition-fast);
}

.modal__spoiler-btn:hover, .modal__footer-close:hover  {
  background: var(--border-color);
}

.modal__gallery {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.modal__gallery-item {
  width: 100%;
  max-width: 600px;
}

.modal__gallery-img {
  max-width: 100%;
  height: auto;
  border-radius: var(--block-radius);
  box-shadow: var(--shadow);
  display: block;
  border: 2px solid var(--border-color);
  object-fit: cover;
}

.modal__gallery-caption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
}
.modal__links-title {
  padding-top: 0.5rem;
}
.modal__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal__link-btn {
  padding: 0.6rem 1.2rem;
  background: var(--btn-bg);
  color: var(--btn-text);
  border-radius: var(--button-radius);
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity var(--transition-fast);
}
.modal__link-btn:hover {
  opacity: 0.5;
  text-decoration: none;
}

/* Animations */
.modal-enter-active, .modal-leave-active {
  transition: opacity var(--transition-default);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Spoiler Transition */
.spoiler-enter-active, .spoiler-leave-active {
  transition: max-height var(--transition-default);
  max-height: 1000px;
  overflow: hidden;
}

.spoiler-enter-from, .spoiler-leave-to {
  max-height: 0;
  opacity: 0;
}

.modal-enter-active .modal__container,
.modal-leave-active .modal__container {
  transition: transform var(--transition-default);
}

.modal-enter-from .modal__container,
.modal-leave-to .modal__container {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .modal__container {
    max-height: 95vh;
  }
}
</style>
