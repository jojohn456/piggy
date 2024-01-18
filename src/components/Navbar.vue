<template>
    <q-footer class="bg-purple text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="row">
            <div class="col-4" align="left">Piggy</div>
            <div class="col-4" align="center">
              <q-avatar v-on:click="$router.push('/')" style="cursor:pointer">
                <img src="/images/Piggy.png" alt="logo" loading="lazy" /> 
              </q-avatar>
            </div>
            <div class="col-4" align="right">Jojohn Tabal</div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
</template>
    
<style scoped>
</style>
    
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Navbar'
});
</script>
    