<template>
  <div class="wrapper">
    <input class="input" type="number" :value="from" @input="changeMin" />
    <input class="input" type="number" :value="to" @input="changeMax" />
    <div class="range-line-wrapper">
      <div class="range-line" :style="`left:${leftOffset}%; width: ${width}% `" />
    </div>
    <div class="range-container">
      <input
        class="range min"
        type="range"
        :min="min"
        :max="max"
        :value="from"
        :step="step"
        @input="changeMin($event)"
        @change="setStore"
      />
      <input
        class="range max"
        type="range"
        :min="min"
        :max="max"
        :value="to"
        :step="step"
        @input="changeMax($event)"
        @change="setStore"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
const props = defineProps<{
  min: number;
  max: number;
  step: number;
}>();

const from = ref(0)
const to = ref(0)

const emit = defineEmits<{
  (e: "set-range", params: { from: number; to: number }): void;
}>();
function setStore(){
    emit('set-range', {from: from.value, to: to.value})
}
function changeMin(e: {target: HTMLInputElement}) {
  if (+e.target.value > props.min) {
    if (+e.target.value < to.value) {
        from.value = +e.target.value
    } else {
      e.target.value = `${to.value - 1}`;
    }
  } else {
    e.target.value = `${props.min}`;
    from.value = props.min
  }
}

function changeMax(e: {target: HTMLInputElement}) {
  if (+e.target.value < props.max) {
    if (+e.target.value > from.value) {
        to.value = +e.target.value
    } else {
      e.target.value = `${from.value + 1}`;
    }
  } else {
    e.target.value = `${props.max}`;
      to.value = props.max
  }
}

const leftOffset = computed(() => {
  const percent = (props.max - props.min) / 100;
  return (from.value - props.min) / percent;
});
const width = computed(() => {
  return ((to.value - from.value) / (props.max - props.min)) * 100;
});

onMounted(() => {
    from.value =props.min
    to.value =props.max
  emit("set-range", { from: props.min, to: props.max });
});
</script>
<style scoped>
.wrapper {
  height: 46px;
  width: 100%;
  display: flex;
  border: 1px solid #dedede;
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  color: #000;
  position: relative;
  padding: 7px;
}

.input {
  display: block;
  height: 100%;
  width: 100%;
  border: none;
  text-align: center;
  background: none;
}

.input:first-child {
  border-right: 1px solid #dedede;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input[type="number"] {
  -moz-appearance: textfield;
}

.input:focus {
  outline: none;
}

.range-container {
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 24px);
  height: 1px;
  background: #dedede;
}

.range {
  position: absolute;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;
  width: 100%;
  transform: translateY(-50%);
}

.range:focus {
  outline: none;
}

.range.min {
  left: -6px;
}

.range.max {
  right: -6px;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border: 1px solid #ffc700;
  background: #fff;
  border-radius: 999px;
  pointer-events: auto;
  z-index: 2;
}

.range-line-wrapper {
  height: 1px;
  position: absolute;
  width: calc(100% - 36px);
  left: 18px;
  bottom: -1px;
}

.range-line {
  height: 1px;
  background: #ffc700;
  position: absolute;
  top: 0;
  z-index: 1;
}
</style>
