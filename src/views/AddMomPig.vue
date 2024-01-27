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
<!-- Dialog -->
<q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Success</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Mom Pig Successfully Added
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
<!-- /Dialog -->
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
    import { LocalNotifications } from '@capacitor/local-notifications'
 
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
            farrowing: '',
            alert: false,
          };
      },
      mounted() {
        const timeStamp = Date.now()
        const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD'); 
        this.$data.the_date = formattedString;
      },
      methods: {
        async computeDate(){
         var mydate = new Date(this.the_date);
         this.$data.first_heat = date.addToDate(mydate, { days: 21 });
         this.$data.first_heat = date.formatDate(this.first_heat, 'YYYY/MM/DD')
         this.$data.second_heat = date.addToDate(mydate, { days: 42 });
         this.$data.second_heat = date.formatDate(this.second_heat, 'YYYY/MM/DD')
         this.$data.farrowing = date.addToDate(mydate, { days: 114 });
         this.$data.farrowing = date.formatDate(this.farrowing, 'YYYY/MM/DD')
 
         const id = await db.MomPigs.add({
          Name: this.$data.name,
          TheDate: this.$data.the_date,
          Note: this.$data.note,
          FirstHeat: this.$data.first_heat,
          SecondHeat: this.$data.second_heat,
          Farrowing: this.$data.farrowing
        });

        this.$data.name = '';
        this.$data.the_date = new Date(this.the_date);
        this.$data.note = '';

     LocalNotifications.schedule({
  notifications: [{
   title: 'Piggy'+ this.$data.name,
   body: 'Check '+ this.$data.name + 'First Heat',
   schedule: { on: { day: 21 }, allowWhileIdle: true, every: 'day' }
  }]});

  LocalNotifications.schedule({
  notifications: [{
   title: 'Piggy'+ this.$data.name,
   body: 'Check '+ this.$data.name + 'Second Heat',
   schedule: { on: { day: 42 }, allowWhileIdle: true, every: 'day' }
  }]});

  LocalNotifications.schedule({
  notifications: [{
   title: 'Piggy'+ this.$data.name,
   body: 'Check '+ this.$data.name + 'Farrowing',
   schedule: { on: { day: 114 }, allowWhileIdle: true, every: 'day' }
  }]});

        this.$data.alert=true;
        }
      }
    });
    </script>