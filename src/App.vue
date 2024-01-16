<template>
  <q-layout container style="height: calc(100vh)" class="shadow-2 rounded-borders">
<router-view />
</q-layout>
</template>

<style>
</style>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { useDarkMode, useTheme } from '@code-coaching/vuetiful';
import useQuasar from 'quasar/src/composables/use-quasar.js';
/* Add in the line containing the useQuasar import from 'quasar', it gets parsed out for some reason */

import '@code-coaching/vuetiful/styles/all.css';
import "@code-coaching/vuetiful/css/overrides/quasar.css"; // This provides overrides for Quasar components

/**
 * Uncomment the theme you want to use
 */
import '@code-coaching/vuetiful/themes/theme-vuetiful.css';
// import '@code-coaching/vuetiful/themes/theme-rocket.css';
// import '@code-coaching/vuetiful/themes/theme-sahara.css';
// import '@code-coaching/vuetiful/themes/theme-seafoam.css';
// import '@code-coaching/vuetiful/themes/theme-seasonal.css';
// import '@code-coaching/vuetiful/themes/theme-skeleton.css';
import './css/app.css';

export default defineComponent({
  name: 'App',
  setup() {
    const { autoModeWatcher, chosenMode, MODE } = useDarkMode();
    const { changeDataTheme } = useTheme();
    const $q = useQuasar();

    onMounted(() => {
      changeDataTheme("vuetiful"); // adds data-theme="vuetiful" to the <body> tag
      autoModeWatcher(); // automatically use the dark preference of the OS
      handleQuasarDarkMode(chosenMode.value);
    });

    const handleQuasarDarkMode = (mode: string) => {
      $q.dark.set(mode === MODE.DARK);
      if (mode === MODE.LIGHT) {
        document.body.classList.remove('body--light');
      } else {
        document.body.classList.remove('body--dark');
      }
    };

    watch(() => chosenMode.value, (newMode) => {
      handleQuasarDarkMode(newMode);
    });

    return {};
  },
});
</script>
