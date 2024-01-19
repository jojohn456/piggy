<template>
    <q-page>
        <v-card>
            <v-card-body class="p-3">
        <div class="row">
     <div class="col-12">
            <q-form class="q-gutter">
      <q-input
        v-model="name"
        filled
        label="Name"
      />    
    </q-form>
    </div>
</div>

<div class="row mt-2">
     <div class="col-12">
      <q-date class="w-full" v-model="the_date" first-day-of-week="1" />
    </div>
</div>

<div class="row mt-2">
     <div class="col-12">
        <q-input
      v-model="note"
      label="Notes"
      filled
      type="textarea"
    />
    </div>
</div>

<div class="row mt-2">
     <div class="col-12">
     <v-button class="w-full" aria-label="menu" v-on:click="computeDate">Add</v-button>
    </div>
</div>
        </v-card-body>
</v-card>
    </q-page>
    </template>
    
    <style scoped>
    </style>

<script lang="ts">
    import { defineComponent, PropType  } from 'vue';
    import { date } from 'quasar';
    import { VButton, VCard, VCardBody } from '@code-coaching/vuetiful';
    import {MomPig} from '../models/MomPig';
    import { db } from '../db';
 
    export default defineComponent({
      name: 'AddMomPig',
      setup(){
        console.log("AddMomPig");
      },
      components: { VButton, VCard, VCardBody},
      props: {
        mompig: { type: Object as PropType<MomPig>,}
      },
      data: function () {
          return {
            name: '',
            the_date: '',
            note: '',
            first_heat: '',
            second_heat: '',
            pregnant: ''
          };
      },
      mounted() {
        const timeStamp = Date.now()
        const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD'); 
        this.the_date = formattedString;
      },
      methods: {
        async computeDate(){
         var mydate = new Date(this.the_date);
         this.first_heat = date.addToDate(mydate, { days: 21 });
         this.first_heat = date.formatDate(this.first_heat, 'YYYY/MM/DD')
         this.second_heat = date.addToDate(mydate, { days: 42 });
         this.second_heat = date.formatDate(this.second_heat, 'YYYY/MM/DD')
         this.pregnant = date.addToDate(mydate, { days: 114 });
         this.pregnant = date.formatDate(this.pregnant, 'YYYY/MM/DD')
 
         const id = await db.MomPigs.add({
          Name: this.name,
          TheDate: this.the_date,
          Note: this.note,
          FirstHeat: this.first_heat,
          SecondHeat: this.second_heat,
          Pregnant: this.pregnant
        });

        this.name = '';
        this.the_date = new Date(this.the_date);
        this.note = '';
        }
      }
    });
    </script>