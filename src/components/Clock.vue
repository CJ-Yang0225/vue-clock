<template>
  <div class="clock">
    <div
      class="clock__hour-hand"
      :style="{ transform: `rotateZ(${clock.hourHandAngle}deg)` }"
    />
    <div
      class="clock__min-hand"
      :style="{ transform: `rotateZ(${clock.minHandAngle}deg)` }"
    />
    <div
      class="clock__sec-hand"
      :style="{ transform: `rotateZ(${clock.secHandAngle}deg)` }"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch, onUpdated, onMounted } from "vue";
  import {
    getSecHandAngle,
    getMinHandAngle,
    getHourHandAngle,
  } from "../utils/getHandAngle";

  type Props = {
    time: Date;
  };

  export default defineComponent({
    name: "Clock",
    props: {
      time: {
        type: Date,
        required: true,
      },
    },
    // Note: cannot use ES6 destructuring because it will remove props reactivity.
    setup(props: Props) {
      // or by utilizing the `toRefs` inside of the setup function
      // const timeRef = toRefs(props).time;

      const initialState = {
        secHandAngle: 0,
        minHandAngle: 0,
        hourHandAngle: 0,
      };
      const clock = reactive(initialState);
      const updateClockHandAngle = () => {
        clock.secHandAngle = getSecHandAngle(props.time);
        clock.minHandAngle = getMinHandAngle(props.time);
        clock.hourHandAngle = getHourHandAngle(props.time);
      };

      // watch(timeRef, () => {
      //   updateClockHandAngle();
      // });

      onMounted(() => {
        console.log("Mounted");
        updateClockHandAngle();
      });

      onUpdated(() => {
        console.log("Updated");
        updateClockHandAngle();
      });

      return {
        clock,
      };
    },
    // data() {
    //   const hourHandAngle = getHourHandAngle(this.time);

    //   watch(this.time, () => {
    //     console.log("Watch");
    //   });

    //   return {
    //     secHandAngle: getSecHandAngle(this.time),
    //     minHandAngle: getMinHandAngle(this.$props.time),
    //     hourHandAngle: hourHandAngle,
    //   };
    // },
  });
</script>

<style lang="scss" scoped>
  .clock {
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../assets/clock.png");
    background-size: cover;
    border: 4px solid #091921;
    border-radius: 50%;
    box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
      inset 0 -15px 15px rgba(255, 255, 255, 0.05),
      0 15px 15px rgba(0, 0, 0, 0.3), inset 0 15px 15px rgba(0, 0, 0, 0.3);

    &::before {
      content: "";
      width: 15px;
      height: 15px;
      background: #fff;
      border-radius: 50%;
      z-index: 10000;
    }

    &__hour-hand,
    &__min-hand,
    &__sec-hand {
      position: absolute;
      display: flex;
      justify-content: center;
    }

    &__hour-hand {
      width: 160px;
      height: 160px;

      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 80px;
        background: #ff105e;
        z-index: 10;
        border-radius: 6px 6px 0 0;
      }
    }

    &__min-hand {
      width: 190px;
      height: 190px;

      &::before {
        content: "";
        position: absolute;
        width: 4px;
        height: 90px;
        background: #fff;
        z-index: 11;
        border-radius: 6px 6px 0 0;
      }
    }

    &__sec-hand {
      width: 230px;
      height: 230px;

      &::before {
        content: "";
        position: absolute;
        width: 2px;
        height: 150px;
        background: #fff;
        z-index: 12;
        border-radius: 6px 6px 0 0;
      }
    }
  }
</style>
