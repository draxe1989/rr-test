<template>
  <div class="button-wrapper">
    <button
      v-for="b in btns"
      :key="b.value"
      class="button"
      :class="{ active: b.value === rooms }"
      @click="selectRooms(b.value)"
    >
      {{ b.name }}
    </button>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  rooms: string;
}>();
const emit = defineEmits<{
  (e: "select-rooms", params: string): void;
}>();

function selectRooms(rooms: string) {
  emit("select-rooms", rooms);
}

const btns = [
  {
    value: "С",
    name: "Ст",
  },
  {
    value: "1",
    name: "1",
  },
  {
    value: "2",
    name: "2",
  },
  {
    value: "3",
    name: "3+",
  },
];
</script>

<style scoped>
.button-wrapper {
  display: flex;
  gap: 10px;
}
.button {
  height: 46px;
  width: 46px;
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 14px;

  background-color: #fff;
  border: 1px solid #dedede;
  transition: all 0.3s;
  cursor: pointer;
}

.button:focus {
  outline: none;
}
.button:hover {
  color: #ffc700;
  border: 1px solid #ffc700;
}
.button.active {
  font-weight: 700;
  background-color: #ffc700;
  color: #fff;
  border: 1px solid #ffc700;
}
</style>
