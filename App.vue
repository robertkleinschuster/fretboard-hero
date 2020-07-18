<template lang="html">
<div>
<Fretboard></Fretboard>
</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Fretboard from "./components/Fretboard.vue";

  export default Vue.extend({
    components: {Fretboard},
    data() {
      return {
        bundler: "Parcel"
      };
    }
  });
</script>

<style lang="scss" scoped>
  .container {
    color: green;
  }
</style>

