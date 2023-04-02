<template>
  <label>
    <div class="label">Ваш телефон</div>
    <input
      @input="inputhandler"
      class="input"
      :class="{ errorborder: error }"
      type="text"
      placeholder="+7 (XXX) XXX-XX-XX"
      :value="value"
    />
  </label>
</template>
<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  error: string;
}>();
const emit = defineEmits<{
  (e: "input-phone", params: string): void;
}>();
const value = ref<string>("");

//const regNum = /^(\+7|8) \(\d{3}\) \d{3}-\d{3}-\d{1}$/;

function inputhandler(e: { target: HTMLInputElement }) {
  if (e.target.value.length > value.value.length) {
    if (e.target.value.length === 1) {
      if (e.target.value === "+" || e.target.value === "7") {
        e.target.value = "+7 (";
        value.value = "+7 (";
      } else if (e.target.value === "8") {
        value.value = "8 (";
        e.target.value = "8 (";
      } else if (e.target.value === "9") {
        value.value = "+7 (9";
        e.target.value = "+7 (9";
      } else {
        e.target.value = value.value;
      }
    } else if (/^(\+7|8) \(\d{0,2}$/.test(e.target.value)) {
      value.value = e.target.value;
    } else if (/^(\+7|8) \(\d{3}$/.test(e.target.value)) {
      e.target.value = e.target.value + ") ";
      value.value = e.target.value;
    } else if (/^(\+7|8) \(\d{3}\) \d{0,2}$/.test(e.target.value)) {
      value.value = e.target.value;
    } else if (/^(\+7|8) \(\d{3}\) \d{3}$/.test(e.target.value)) {
      e.target.value = e.target.value + "-";
      value.value = e.target.value;
    } else if (/^(\+7|8) \(\d{3}\) \d{3}-\d{0,2}$/.test(e.target.value)) {
      value.value = e.target.value;
    } else if (/^(\+7|8) \(\d{3}\) \d{3}-\d{3}$/.test(e.target.value)) {
      e.target.value = e.target.value + "-";
      value.value = e.target.value;
    } else if (/^(\+7|8) \(\d{3}\) \d{3}-\d{3}-\d{1}$/.test(e.target.value)) {
      value.value = e.target.value;
    } else {
      e.target.value = value.value;
    }
  } else if (e.target.value.length < value.value.length) {
    value.value = e.target.value;
  }
  emit("input-phone", value.value);
}
</script>
<style scoped>
.input {
  display: block;
  width: 100%;
  height: 46px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 11px;
  font-family: averta, Arial, Helvetica, sans-serif;
}

.input:focus {
  outline: none;
}

.label {
  font-weight: 400;
  font-size: 11px;
  color: #929292;
  margin-bottom: 10px;
}

.input.errorborder {
  border: 1px solid #ea5455;
}
</style>
