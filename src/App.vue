<template>
  <Clock :time="state.time" />
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted } from "vue";
  import Clock from "./components/Clock.vue";

  export default defineComponent({
    name: "App",
    components: {
      Clock,
    },
    setup() {
      const state = reactive({ time: new Date() });

      onMounted(() => {
        setInterval(() => {
          state.time = new Date();
        }, 1000);
      });

      return { state };
    },
  });
</script>

<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #091921;
  }
</style>
