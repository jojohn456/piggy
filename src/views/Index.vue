<template>
  <q-page>
    <div class="row">
      <div class="col-12 p-3">
        <div class="card bg-white w-full shadow-xl">
          <div
            class="card-body"
            v-on:click="$router.push('/pregnancy-tracker')"
            style="cursor: pointer"
          >
            <div align="center">
              <img
                src="/images/Pregnancy Tracker.png"
                width="90px"
                height="auto"
                alt="logo"
                loading="lazy"
              />
              <h4>Pregnancy Tracker</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    console.log('Index');
  },
  components: {},
  props: {},
  data: function () {
    return {};
  },
  mounted() {
    console.log('Index');
  },
  methods: {},
});
</script>
