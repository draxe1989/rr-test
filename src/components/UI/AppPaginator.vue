<template>
  <div class="container">
    <div class="paginator">
      <div v-for="btn in dataStore.getPaginationButtons">
        <button
          class="pagin-btn"
          :class="{ active: btn.value === dataStore.currentPage }"
          @click="dataStore.setPaginationNumber(btn.value)"
        >
          {{ btn.name }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDataStore } from "@/stores/data";
const dataStore = useDataStore();
</script>
<style scoped>
.paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  margin-top: 45px;
  margin-bottom: 60px;
}
.pagin-btn {
  padding: 0;
  border: none;
  background: none;
  font-weight: 600;
  font-size: 18px;
  color: #0a2f85;
  cursor: pointer;
}
.active {
  color: #ffc700;
}
</style>
