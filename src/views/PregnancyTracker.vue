<template>
  <q-page>
    <div class="row">
      <div class="col-12 px-3 pt-1">
        <button
          class="btn btn-primary w-full"
          size="xl"
          v-on:click="$router.push('/add-mom-pig')"
        >
          Add Mom Pig
        </button>
      </div>
    </div>
    <ul>
      <li v-for="MomPig in MomPigs" :key="MomPig.id">
        <div class="row">
          <div class="col-12 p-3">
            <div class="card bg-white w-full shadow-xl">
              <div
                class="card-body"
                v-on:click="$router.push('/pregnancy-tracker')"
              >
                <h3 class="font-bold">{{ MomPig.Name }}</h3>
                <p>Date: {{ MomPig.TheDate }}</p>
                <p>First Heat: {{ MomPig.FirstHeat }}</p>
                <p>Second Heat: {{ MomPig.SecondHeat }}</p>
                <p>Vitamins: {{ MomPig.Vitamins }}</p>
                <p>Farrowing: {{ MomPig.Farrowing }}</p>
                <p>Notes: {{ MomPig.Note }}</p>
                <button
                  class="btn btn-error w-full"
                  size="xl"
                  variant="filled-error"
                  v-on:click="removeItem(MomPig.id as number)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </q-page>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { db } from '../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

export default defineComponent({
  name: 'PregnancyTracker',
  components: {},
  setup() {
    const $q = useQuasar();
    return {
      db,
      MomPigs: useObservable(liveQuery(() => db.MomPigs.toArray())),
    };
  },
  data: function () {
    return {};
  },
  methods: {
    reset() {
      db.MomPigs.clear();
    },
    removeItem(id: number) {
      this.$q
        .dialog({
          dark: false,
          title: 'Confirm',
          message: 'Would you like to delete this item?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          db.MomPigs.where('id').equals(id).delete();
        });
    },
  },
});
</script>
