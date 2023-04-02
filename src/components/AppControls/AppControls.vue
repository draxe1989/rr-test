<template>
  <div class="container">
    <div class="controls">
      <div class="sort">
        <div class="title">Сортировать:</div>
        <button
          class="button"
          @click="dataStore.setPriceSort(!dataStore.filters.priceAsc)"
        >
          <div>по цене</div>
          <div class="icon-wrapper" :class="{ asc: dataStore.filters.priceAsc }">
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L0.535898 6.52533e-07L7.4641 4.68497e-08L4 6Z"
                fill="#263E66"
              />
            </svg>
          </div>
        </button>
        <button
          class="button"
          @click="dataStore.setAreaSort(!dataStore.filters.squareAsc)"
        >
          <div>по площади</div>
          <div class="icon-wrapper" :class="{ asc: dataStore.filters.squareAsc }">
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L0.535898 6.52533e-07L7.4641 4.68497e-08L4 6Z"
                fill="#263E66"
              />
            </svg>
          </div>
        </button>
      </div>
      <div class="view">
        <button
          class="view-btn"
          :class="{ active: viewStore.isCards }"
          @click="viewStore.setIsCards(true)"
        >
          <CardIcon />
        </button>
        <button
          class="view-btn"
          :class="{ active: !viewStore.isCards }"
          @click="viewStore.setIsCards(false)"
        >
          <RowIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RowIcon, CardIcon } from "@/assets/icons/icons";

import { useViewStore } from "@/stores/view";
import { useDataStore } from "@/stores/data";

const viewStore = useViewStore();
const dataStore = useDataStore();
</script>

<style scoped>
@import "./style.css";
</style>
