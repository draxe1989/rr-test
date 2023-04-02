<template>
  <label>
    <div class="label">Ваш email</div>
    <input
      :value="email"
      @input="inputhandler"
      class="input"
      :class="{ errorborder: error }"
      type="text"
      placeholder="myname@gmail.com"
    />
  </label>
</template>
<script setup lang="ts">
defineProps<{
  email: string;
  error: string;
}>();
const emit = defineEmits<{
  (e: "input-email", params: string): void;
}>();

function inputhandler(e: Event) {
  emit("input-email", (e.target as HTMLInputElement).value);
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

.input.errorborder {
  border: 1px solid #ea5455;
}

.label {
  font-weight: 400;
  font-size: 11px;
  color: #929292;
  margin-bottom: 10px;
}
</style>
