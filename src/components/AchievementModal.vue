<script setup>
import {useI18n} from 'vue-i18n';

defineProps({
  selectedItem: Object,
  showScreenshots: Boolean
});
defineEmits(['closeModal', 'toggleScreenshots'])

const { t } = useI18n();
</script>

<template>
  <Transition name="modal">
    <div v-if="selectedItem" class="modal-overlay" @click.self="$emit('closeModal')">
      <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header class="modal-header">
          <h3 id="modal-title">{{ selectedItem.title }}</h3>
          <button class="modal-close" @click="$emit('closeModal')" :aria-label="t('Achievements_data.modal_close')">
            <span class="material-symbols-outlined">close_small</span>
          </button>
        </header>

        <div class="achievement-card__tags modal-tags">
              <span v-for="tag in selectedItem.tags" :key="tag" class="achievement-card__tag">
                {{ tag }}
              </span>
        </div>

        <div class="modal-content">
          <p v-for="(line, index) in selectedItem.fullDesc" class="modal-full-desc" :key="index">{{ line }}</p>

          <div v-if="selectedItem.screenshots">
            <button class="modal-spoiler-btn" @click="$emit('toggleScreenshots')">
                <span class="material-symbols-outlined">
                  {{ showScreenshots ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
                </span>
              {{ showScreenshots ? t('Achievements_data.hide_screenshots') : t('Achievements_data.show_screenshots') }}
            </button>

            <Transition name="spoiler" >
              <div v-if="showScreenshots" class="modal-gallery">
                <div v-for="(img, idx) in selectedItem.screenshots" :key="idx" class="modal-gallery__item">
                  <img :src="img.src" :alt="img.alt" class="modal-gallery__img">
                  <p v-if="img.alt" class="modal-gallery__caption">{{ img.alt }}</p>
                </div>
              </div>
            </Transition>
          </div>

          <p v-if="selectedItem.commit_title" class="links-title">{{selectedItem.commit_title}}</p>
          <div v-if="selectedItem.commit_links" class="modal-links">
            <a v-for="linkData in selectedItem.commit_links" :key="linkData.alt" :href="linkData.url" target="_blank" class="modal-link-btn">
              {{ linkData.alt }} ↗
            </a>
          </div>
        </div>

        <footer class="modal-footer">
          <button class="modal-footer-close" @click="$emit('closeModal')">{{ t('Achievements_data.modal_close') }}</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Modal Styles */
.modal-overlay {
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
}

.modal-container {
  background: var(--card-bg);
  width: 100%;
  height: 100%;
  max-width: 80vw;
  max-height: 90vh;
  border-radius: var(--block-radius);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
}

.modal-tags {
  padding: 1rem 1.5rem 0;
}
.achievement-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.achievement-card__tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--tag-radius);
  color: var(--text-secondary);
  user-select: none;
}

.modal-content {
  padding: 1.5rem;
  overflow: auto;
  flex-grow: 1;
  color: var(--text-primary);
  -ms-overflow-style: none;
}

.modal-full-desc {
  margin-bottom: 1rem;
}

.modal-spoiler-btn {
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

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}

.modal-footer-close {
  padding: 0.5rem 1.5rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: var(--button-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color var(--transition-fast);
}

.modal-spoiler-btn:hover, .modal-footer-close:hover  {
  background: var(--border-color);
}

.modal-gallery {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.modal-gallery__item {
  width: 100%;
  max-width: 600px;
}

.modal-gallery__img {
  max-width: 100%;
  height: auto;
  border-radius: var(--block-radius);
  box-shadow: var(--shadow);
  display: block;
  border: 2px solid var(--border-color);
  object-fit: cover;
}

.modal-gallery__caption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-align: center;
}
.links-title {
  padding-top: 0.5rem;
}
.modal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-link-btn {
  padding: 0.6rem 1.2rem;
  background: var(--btn-bg);
  color: var(--btn-text);
  border-radius: var(--button-radius);
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity var(--transition-fast);
}
.modal-link-btn:hover {
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

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform var(--transition-default);
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }
}
</style>
