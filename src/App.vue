<script setup>
import {watch} from 'vue';
import useLanguage from './composables/useLanguage.js';
import useTheme from './composables/useTheme.js';

// Components
import Header from './components/Header.vue';
import BusinessCard from './components/BusinessCard.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Experience from './components/Experience.vue';
import Achievements from './components/Achievements.vue';
import Footer from './components/Footer.vue';

const {locale, initLang} = useLanguage();
const {initTheme} = useTheme();

initLang();
initTheme();
watch(locale, (newLocale) => {
  document.documentElement.setAttribute('lang', newLocale);
}, {immediate: true});
</script>

<template>
  <Header/>

  <main class="container">
    <BusinessCard/>
    
    <About/>
    
    <Skills/>
    
    <Experience/>
    
    <Achievements/>
  </main>

  <Footer/>
</template>
