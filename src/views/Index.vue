<template>
<q-page>
 <div class="row">
 <div class="col-12 p-3">
        <v-card class="w-full">
        <v-card-body v-on:click="$router.push('/pregnancy-calculator')" style="cursor:pointer">
          <div align="center">
              <img src="/images/Pregnancy Tracker.png" width="90px" height="auto" alt="logo" loading="lazy" /> 
           <h4>Pregnancy Calculator</h4>
          </div>
        </v-card-body>
        </v-card>
 </div>
</div>
</q-page>
</template>

<style scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { VButton, VCard, VCardBody } from '@code-coaching/vuetiful';

export default defineComponent({
  name: 'Index',
  setup(){
    console.log("Index");
  },
  components: { VCard, VCardBody },
  props: {},
  data: function () {
      return {};
  },
  mounted() {
    console.log("Index");
  },
  methods: {}
});
</script>