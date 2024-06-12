<template>
  <q-layout>
    <q-page-container class="container mx-auto">
      <router-view />
    </q-page-container>
    <Navbar />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../components/Navbar.vue';

export default defineComponent({
  name: 'Master',
  components: { Navbar },
});
</script>
