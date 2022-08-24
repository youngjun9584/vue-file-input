<script>
import Vue from 'vue';
import VueFileInput from '@/vue-file-input.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueFileInput
  }
});
</script>

<template>
  <div id="app">
    <vue-file-input />
  </div>
</template>
