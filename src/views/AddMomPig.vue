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
<div class="row">
     <div class="col-12">
        <v-button class="w-full mt-1" variant="filled-warning" v-on:click="$router.push('/pregnancy-tracker')">Back</v-button>
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
    import { useQuasar, date } from 'quasar';
    import { VButton, VCard, VCardBody } from '@code-coaching/vuetiful';
    import {MomPig} from '../models/MomPig';
    import { db } from '../db';
    import { LocalNotifications } from '@capacitor/local-notifications'
    import Validator from '../../public/libs/lara-validationjs/1.0/validator.js';
 
    export default defineComponent({
      name: 'AddMomPig',
      setup(){
      const $q = useQuasar();
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
            vitamins: '',
            farrowing: ''
          };
      },
      mounted() {
        const timeStamp = Date.now()
        const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD'); 
        this.$data.the_date = formattedString;
      },
      methods: {
        async computeDate(){

        const _validator = new Validator();
        var data = this.$data;
        _validator.make(data, {
          name: "required"
        });
        if (_validator.fails()) {
          console.log(_validator.first().error);
          this.$q.notify({
          message: _validator.first().error,
          position: 'top',
          color: 'red'
        });
          return;
        }
 
         var mydate = new Date(this.the_date);
         this.$data.first_heat = date.addToDate(mydate, { days: 21 });
         this.$data.first_heat = date.formatDate(this.$data.first_heat, 'YYYY/MM/DD')
         this.$data.second_heat = date.addToDate(mydate, { days: 42 });
         this.$data.second_heat = date.formatDate(this.$data.second_heat, 'YYYY/MM/DD')
         this.$data.vitamins = date.addToDate(mydate, { days: 100 });
         this.$data.vitamins = date.formatDate(this.$data.vitamins, 'YYYY/MM/DD')
         this.$data.farrowing = date.addToDate(mydate, { days: 114 });
         this.$data.farrowing = date.formatDate(this.$data.farrowing, 'YYYY/MM/DD')
 
        await db.MomPigs.add({
          Name: this.$data.name,
          TheDate: this.$data.the_date,
          Note: this.$data.note,
          FirstHeat: this.$data.first_heat,
          SecondHeat: this.$data.second_heat,
          Vitamins: this.$data.vitamins,
          Farrowing: this.$data.farrowing
        });

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

        this.$data.name = '';
        this.$data.note = '';
        const timeStamp = Date.now()
        const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD'); 
        this.$data.the_date = formattedString;

      this.$q.dialog({
        dark: false,
        title: 'Success',
        message: 'Mom Pig Added Successfully'
      });


        }
      }
    });
    </script>