<template>
    <q-page>
     <div class="row">
     <div class="col-12 p-3">
        <q-date class="w-full" v-model="the_date" first-day-of-week="1" />
    </div>
    </div>
    <div class="row">
     <div class="col-12 p-3">
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
    </template>
    
    <style scoped>
    </style>
    
    <script lang="ts">
    import { defineComponent } from 'vue';
    import { date } from 'quasar';
    import { VButton, VCard, VCardBody, VCardHeader } from '@code-coaching/vuetiful';
    
    export default defineComponent({
      name: 'PregnancyTracker',
      setup(){
        console.log("PregnancyTracker");
      },
      components: { VButton, VCard, VCardBody, VCardHeader },
      props: {
        The_Date: String,
        First_Heat: String,
        Second_Heat: String,
        Pregnant: String
      },
      data: function () {
          return {
            the_date: this.The_Date,
            first_heat: this.First_Heat,
            second_heat: this.Second_Heat,
            pregnant: this.Pregnant
          };
      },
      mounted() {
        const timeStamp = Date.now()
        const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD'); 
        this.the_date = formattedString;
      },
      methods: {
        computeDate(){
         var mydate = new Date(this.the_date);
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