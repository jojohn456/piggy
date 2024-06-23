<template>
  <q-page>
    <div class="row">
      <div class="col-12 p-3">
        <div class="card bg-white w-full shadow-xl">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <q-form class="q-gutter">
                  <q-input v-model="name" filled label="Name" />
                </q-form>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-1">
                <q-date
                  class="w-full"
                  v-model="the_date"
                  first-day-of-week="1"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <q-input v-model="note" label="Notes" filled type="textarea" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-12">
                <button
                  class="btn btn-primary w-full"
                  aria-label="menu"
                  v-on:click="computeDate"
                >
                  Add
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button
                  class="btn btn-warning w-full mt-1"
                  variant="filled-warning"
                  v-on:click="$router.push('/pregnancy-tracker')"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useQuasar, date } from 'quasar';
import { MomPig } from '../models/MomPig';
import { db } from '../db';
import { LocalNotifications } from '@capacitor/local-notifications';
import Validator from '../../public/libs/lara-validationjs/1.0/validator.js';

export default defineComponent({
  name: 'AddMomPig',
  setup() {
    const $q = useQuasar();
  },
  components: {},
  props: {
    mompig: { type: Object as PropType<MomPig>, required: true },
  },
  data: function () {
    return {
      id: this.$props.mompig?.id,
      name: this.$props.mompig?.Name,
      the_date: this.$props.mompig?.TheDate,
      note: this.$props.mompig?.Note,
      first_heat: this.$props.mompig?.FirstHeat,
      second_heat: this.$props.mompig?.SecondHeat,
      vitamins: this.$props.mompig?.Vitamins,
      farrowing: this.$props.mompig?.Farrowing,
    };
  },
  mounted() {
    const timeStamp = Date.now();
    const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD');
    this.$data.the_date = formattedString;
  },
  methods: {
    async computeDate() {
      const _validator = new Validator();
      let data = this.$data;
      _validator.make(data, {
        name: 'required',
      });
      if (_validator.fails()) {
        console.log(_validator.first().error);
        this.$q.notify({
          message: _validator.first().error,
          position: 'top',
          color: 'red',
        });
        return;
      }

      let mydate = new Date(this.the_date);
      this.$data.first_heat = date.addToDate(mydate, { days: 21 });
      this.$data.first_heat = date.formatDate(
        this.$data.first_heat,
        'YYYY/MM/DD',
      );
      this.$data.second_heat = date.addToDate(mydate, { days: 42 });
      this.$data.second_heat = date.formatDate(
        this.$data.second_heat,
        'YYYY/MM/DD',
      );
      this.$data.vitamins = date.addToDate(mydate, { days: 100 });
      this.$data.vitamins = date.formatDate(this.$data.vitamins, 'YYYY/MM/DD');
      this.$data.farrowing = date.addToDate(mydate, { days: 114 });
      this.$data.farrowing = date.formatDate(
        this.$data.farrowing,
        'YYYY/MM/DD',
      );

      await db.MomPigs.add({
        id: this.$props.mompig?.id,
        Name: this.$data.name,
        TheDate: this.$data.the_date,
        Note: this.$data.note,
        FirstHeat: this.$data.first_heat,
        SecondHeat: this.$data.second_heat,
        Vitamins: this.$data.vitamins,
        Farrowing: this.$data.farrowing,
      });

      LocalNotifications.schedule({
        notifications: [
          {
            id: this.$props.mompig?.id,
            title: 'Piggy' + this.$data.name,
            body: 'Check ' + this.$data.name + 'First Heat',
            schedule: { on: { day: 21 }, allowWhileIdle: true, every: 'day' },
          },
        ],
      });

      LocalNotifications.schedule({
        notifications: [
          {
            id: this.$props.mompig?.id,
            title: 'Piggy' + this.$data.name,
            body: 'Check ' + this.$data.name + 'Second Heat',
            schedule: { on: { day: 42 }, allowWhileIdle: true, every: 'day' },
          },
        ],
      });

      LocalNotifications.schedule({
        notifications: [
          {
            id: this.$props.mompig?.id,
            title: 'Piggy' + this.$data.name,
            body: 'Check ' + this.$data.name + 'Farrowing',
            schedule: { on: { day: 114 }, allowWhileIdle: true, every: 'day' },
          },
        ],
      });

      this.$data.name = '';
      this.$data.note = '';
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD');
      this.$data.the_date = formattedString;

      this.$q.dialog({
        dark: false,
        title: 'Success',
        message: 'Mom Pig Added Successfully',
      });
    },
  },
});
</script>
