<template>
  <div class="container" :data-view="viewStore.dataViewName">
    <div class="content">
        <AppCard
                v-for="m in dataStore.getCurrentPageData"
                :key="m.id"
                :data="m"
                @click="modalsStore.openInfoModal(m)"
        />
    </div>
      <div class="nothing" v-if="dataStore.getCurrentPageData.length === 0">По вашему запросу ничего не найдено</div>
  </div>
</template>
<script lang="ts" setup>
import {AppCard} from "@/components/components";

import { useViewStore } from "@/stores/view";
import { useDataStore } from "@/stores/data";
import { useModalsStore } from "@/stores/modals";


const dataStore = useDataStore();
const modalsStore = useModalsStore();
const viewStore = useViewStore();
</script>

<style scoped>
.content {
  display: grid;
  gap: 30px;
  justify-content: center;
}
[data-view="row"] .content {
  display: grid;
  gap: 16px;
  justify-content: normal;
}

@media (min-width: 768px) {
  [data-view="grid"] .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (min-width: 1024px) {
  [data-view="grid"] .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

@media (min-width: 1280px) {
  [data-view="grid"] .content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
}

.nothing {
    padding: 80px 0;
    text-align: center;
    font-weight: 300;
}

@media (min-width: 768px) {
    .nothing {
        font-size: 20px;
        padding-top: 180px;
    }

}
@media (min-width:  1024px) {
    .nothing {
        padding-top: 200px;
    }

}

</style>
