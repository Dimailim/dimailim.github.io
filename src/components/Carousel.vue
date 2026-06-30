<script setup>
import {computed, ref} from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  perPage: {
    type: Number,
    default: 1
  },
  prevLabel: {
    type: String,
  },
  nextLabel: {
    type: String,
  },
});

const currentIndex = ref(0);
const viewportRef = ref(null);

const canNavigate = computed(() => ({
  next: currentIndex.value < props.items.length - props.perPage,
  prev: currentIndex.value > 0
}));

let canSwap = false;

// Common scrolling logic for swap and buttons.
const scrollToIndex = (index) => {
  const itemSize = viewportRef.value.clientWidth / props.perPage;
  const targetPos = index * itemSize;

  viewportRef.value.scrollTo({
    left: targetPos,
    behavior: 'smooth'
  });
};

const handleScroll = (event) => {
  const { scrollLeft, clientWidth } = event.target;
  const itemSize = clientWidth / props.perPage;

  if (itemSize <= 0) {
    return
  }

  const newIndex = Math.round(scrollLeft / itemSize);
  if (newIndex !== currentIndex.value) {
    currentIndex.value = newIndex;
  }
};

const next = () => {
  if (canNavigate.value.next) {
    scrollToIndex(currentIndex.value + 1);
  }
};

const prev = () => {
  if (canNavigate.value.prev) {
    scrollToIndex(currentIndex.value - 1);
  }
};

// Swap logic for small screens.
let clientXPointerDown = 0;
const handlePointerDown = (event) => {
  canSwap = false;
  clientXPointerDown = event.clientX; // Store clientX coordinate for calculate swap direction.
};
const handlePointerUp = (event) => {
  const swapDirection =  clientXPointerDown - event.clientX;
  if (swapDirection === 0) {
    return;
  }
  canSwap =  swapDirection > 0 ? canNavigate.value.next : canNavigate.value.prev;
  if (canSwap) {
    swapDirection > 0 ? next() : prev();
  }
};

const onClickCapture = (event) => {
  if (canSwap) {
    event.stopPropagation();
    canSwap = false;
  }
};
</script>

<template>
  <div 
    class="carousel" 
    :class="`carousel--per-${perPage}`"
  >
    <button 
      v-if="items.length > perPage"
      class="carousel__btn carousel__btn--prev" 
      @click="prev" 
      :disabled="!canNavigate.prev"
      :aria-label="prevLabel"
    >
      <slot name="prev-icon">
        <span class="material-symbols-outlined">chevron_left</span>
      </slot>
    </button>

    <div 
      class="carousel__viewport" 
      ref="viewportRef"
      @scroll="handleScroll"
      @pointerdown="handlePointerDown"
      @pointerup="handlePointerUp"
      @click.capture="onClickCapture"
    >
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="carousel__item"
        :style="{ 
          flex: `0 0 ${100 / perPage}%`
        }"
      >
        <slot :item="item" :index="index"></slot>
      </div>
    </div>

    <button 
      v-if="items.length > perPage"
      class="carousel__btn carousel__btn--next" 
      @click="next" 
      :disabled="!canNavigate.next"
      :aria-label="nextLabel"
    >
      <slot name="next-icon">
        <span class="material-symbols-outlined">chevron_right</span>
      </slot>
    </button>

    <div class="carousel__dots" v-if="items.length > perPage">
      <div 
        v-for="(_, index) in items.length - perPage + 1" 
        :key="index"
        class="carousel__dot"
        :class="{ 'carousel__dot--active': index === currentIndex }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  --carousel-dot-size: 8px;
  --carousel-btn-size: 40px;
  --carousel-gap: 20px;
  --carousel-dot-active-scale: 1.2;
  --carousel-item-padding: -25px;

  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.carousel__viewport {
  padding-top: 0.5rem;
  overflow: auto;
  width: 100%;
  scrollbar-width: none;
  display: flex;
  scroll-snap-type: x mandatory;
}

.carousel__item {
  padding: 0 10px;
  box-sizing: border-box;
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* Buttons */
.carousel__btn {
  background: var(--header-bg);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: var(--carousel-btn-size);
  height: var(--carousel-btn-size);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: var(--z-index-tooltip);
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
  color: var(--text-primary);
  flex-shrink: 0;
}

.carousel__btn:hover:not(:disabled) {
  background: var(--accent);
  color: var(--btn-accent-text);
  border-color: var(--accent);
}

.carousel__btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Button Positioning */
.carousel__btn--prev { margin-right: calc(var(--carousel-gap) * -1); }
.carousel__btn--next { margin-left: calc(var(--carousel-gap) * -1); }

/* Dots */
.carousel__dots {
  position: absolute;
  display: flex;
  gap: var(--carousel-dot-size);
  z-index: var(--z-index-tooltip);
  bottom: var(--carousel-item-padding);
  left: 50%;
  transform: translateX(-50%);
}

.carousel__dot {
  width: var(--carousel-dot-size);
  height: var(--carousel-dot-size);
  border-radius: 50%;
  background: var(--border-color);
  transition: background-color var(--transition-default), transform var(--transition-default);
}

.carousel__dot--active {
  background: var(--accent);
  transform: scale(var(--carousel-dot-active-scale));
}

@media (max-width: 768px) {
  .carousel__item {
    padding: 0 5px;
  }
  .carousel__btn {
    display: none;
  }
}
</style>
