<template>
<q-page-container>
<q-page>
 <div class="row">
 <div class="col-lg-12">
    <div class="q-pa-md">
    <q-date id="datepicker"
      v-model="date"
      landscape
    />
  </div>
</div>
</div>

<div class="row">
 <div class="col-12">
    <v-button class="w-full" aria-label="menu" v-on:click="computeDate">Compute</v-button>
</div>
</div>

<div class="row">
 <div class="col-12 p-3">
    <v-card class="w-full">
    <v-card-header>
        <h3>Dates</h3>
    </v-card-header>
    <v-card-body>
      <p>1st Heat: {{ first_heat  }}</p>
      <p>2nd Heat: {{ second_heat  }}</p>
      <p> Pregnant: {{ pregnant }}</p>
    </v-card-body>
  </v-card>
</div>
</div>


</q-page>
</q-page-container>
</template>

<style scoped>
#datepicker{
width:100%;
}
</style>

<script lang="ts">
import { defineComponent, ref, mounted, methods } from 'vue';
import { date } from 'quasar';
import { VButton, VCard, VCardBody, VCardHeader } from '@code-coaching/vuetiful';

export default defineComponent({
  name: 'Index',
  setup(){
    console.log("Index");
  },
  components: { VButton, VCard, VCardBody, VCardHeader },
  props: {},
  data: function () {
      return {
        date: '',
        first_heat: '',
        second_heat: '',
        pregnant: ''
      };
  },
  mounted() {
    const timeStamp = Date.now()
    const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD'); 
    this.date = formattedString;
  },
  methods: {
    computeDate(){
     var mydate = new Date(this.date);
     this.first_heat = date.addToDate(mydate, { days: 21 });
     this.first_heat = date.formatDate(this.first_heat, 'YYYY/MM/DD')
     this.second_heat = date.addToDate(mydate, { days: 42 });
     this.second_heat = date.formatDate(this.second_heat, 'YYYY/MM/DD')
     this.pregnant = date.addToDate(mydate, { days: 114 });
     this.pregnant = date.formatDate(this.pregnant, 'YYYY/MM/DD')
    }
  }
});
</script>