<template>
    <q-page>
     <div class="row">
     <div class="col-12 px-3 pt-1">
        <v-button class="w-full" size="xl" v-on:click="$router.push('/add-mom-pig')">Add Mom Pig</v-button>
    </div>
    </div>
        <ul>
    <li v-for="MomPig in MomPigs" :key="MomPig.id">
      <div class="row">
     <div class="col-12 p-3">
      <v-card>
    <v-card-body>
      <h3>{{ MomPig.Name }}</h3>
      <p>Date: {{ MomPig.TheDate }}</p> 
      <p>First Heat: {{ MomPig.FirstHeat }}</p> 
      <p>Second Heat: {{ MomPig.SecondHeat }}</p> 
      <p>Vitamins: {{ MomPig.Vitamins }}</p> 
      <p>Farrowing: {{ MomPig.Farrowing }}</p> 
      <p>Notes: {{ MomPig.Note }}</p> 
    </v-card-body>
    <v-card-footer class="p-3">
      <v-button class="w-full" size="xl" variant="filled-error" v-on:click="removeItem(MomPig.id)">Delete</v-button>
    </v-card-footer>
  </v-card>
</div>
    </div>
    </li>
  </ul>
    </q-page>
    </template>
    
    <style scoped>
    </style>
    
    <script lang="ts">
    import { defineComponent } from 'vue';
    import { useQuasar } from 'quasar';
    import { VButton, VCard, VCardBody, VCardFooter } from '@code-coaching/vuetiful';
    import { db } from '../db';
    import { liveQuery } from "dexie";
    import { useObservable } from "@vueuse/rxjs";
    
    export default defineComponent({
      name: 'PregnancyTracker',
      components: { VButton, VCard, VCardBody, VCardFooter },
      setup(){
        const $q = useQuasar();
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
        reset(){
            db.MomPigs.clear()
        },
        removeItem(id){
        
          this.$q.dialog({
        dark: false,
        title: 'Confirm',
        message: 'Would you like to delete this item?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        db.MomPigs.where('id').equals(id).delete();
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })


        }
       }
    });
    </script>