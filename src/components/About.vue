<script setup>
import {useI18n} from 'vue-i18n';

const { t, tm } = useI18n();
</script>

<template>
  <section id="about">
    <h2>{{ t('Common_data.Common_title_about') }}</h2>
    <p v-for="(line, index) in tm('About_data.main_text')" :key="index" class="about__text">
      {{ line }}
    </p>
    <h3 class="about__title">
      {{ t('About_data.experience_title') }}
    </h3>
    <ul class="list-marked about__list">
      <li v-for="(item, index) in tm('About_data.experience_incl_list')" :key="index" class="list-marked__item">
        {{ item }}
      </li>
    </ul>
    <h3 class="about__title">
      {{ t('About_data.activities_title') }}
    </h3>
    <ul class="list-marked about__list">
      <li v-for="(extraActivity, index) in tm('About_data.extra_activities_list')" :key="index" class="list-marked__item">
        {{ extraActivity.text }}
        <a v-if="extraActivity.link" :href="extraActivity.link" target="_blank">{{ extraActivity.nameLink }}</a>
      </li>
    </ul>
    <p class="about__text">
      {{ t('About_data.eng_skill') }}
    </p>

    <p class="about__status">
      <strong>{{ t('About_data.availablity') }}</strong>
    </p>
  </section>
</template>

<style scoped>
.about__text {
  margin-bottom: 1rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.about__title {
  font-size: 1.1rem;
  font-weight: 500;
}

.about__list {
  margin-top: 1rem;
}

.about__status {
  margin-top: 2rem;
  color: var(--text-primary);
  padding: 1rem;
  border-left: 4px solid var(--accent);
  background-color: var(--card-bg);
  box-shadow: var(--shadow);
}
</style>
