<template>
    <q-page>
     <div class="row">
     <div class="col-12 px-3 pt-1">
        <v-button class="w-full" size="xl" v-on:click="$router.push('/add-mom-pig')">Add Mom Pig</v-button>
    </div>
    </div>
    <div class="row">
     <div class="col-12 px-3 pt-1">
        <v-button class="w-full" size="xl" variant="filled-warning" v-on:click="reset">Reset</v-button>
    </div>
    </div>

    <div class="row">
     <div class="col-12 p-3">
        <ul>
    <li v-for="MomPig in MomPigs" :key="MomPig.id">
      <p>Name: {{ MomPig.Name }}</p>  
      <p>Date: {{ MomPig.TheDate }}</p> 
      <p>First Heat: {{ MomPig.FirstHeat }}</p> 
      <p>2nd Heat: {{ MomPig.SecondHeat }}</p> 
      <p>Pregnant: {{ MomPig.Pregnant }}</p> 
      <p>Notes: {{ MomPig.Note }}</p> 
      <hr>
    </li>
  </ul>
    </div>
    </div>
    </q-page>
    </template>
    
    <style scoped>
    </style>
    
    <script lang="ts">
    import { defineComponent } from 'vue';
    import { VButton } from '@code-coaching/vuetiful';
    import { db } from '../db';
    import { liveQuery } from "dexie";
    import { useObservable } from "@vueuse/rxjs";
    
    export default defineComponent({
      name: 'PregnancyTracker',
      components: { VButton },
      setup(){
        return {
        db,
        MomPigs: useObservable(
          liveQuery(() => db.MomPigs.toArray())
        )
        };
      },
      data: function () {
          return {
          };
      },
      methods: {
        async reset(){
            db.MomPigs.clear()
        }
       }
    });
    </script>