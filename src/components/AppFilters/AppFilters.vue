<template>
  <div class="container filters">
    <h4 class="title">Вам подходит {{ dataStore.filteredData.length }} {{variants}}</h4>
    <div class="content">
      <label class="jk">
        <div class="label">Выбрать ЖК</div>
        <AppSelect
          :items="dataStore.objects"
          @check-item="dataStore.setObjectFilter($event)"
        />
      </label>
      <div class="rooms">
        <div class="label">Комнатность</div>
        <SquareButtons
          :rooms="dataStore.filters.rooms"
          @select-rooms="dataStore.setRoomsFilter($event)"
        />
      </div>
      <label class="square">
        <div class="label">Площадь, м<sup>2</sup></div>
        <AppRange
          :min="dataStore.square.from"
          :max="dataStore.square.to"
          :step="0.1"
          @set-range="dataStore.setAreaFilter($event)"
        />
      </label>
      <label class="price">
        <div class="label">Стоимость, млн ₽</div>
        <AppRange
          :min="dataStore.price.from"
          :max="dataStore.price.to"
          :step="50000"
          @set-range="dataStore.setPriceFilter($event)"
        />
      </label>
      <label class="corp">
        <div class="label">Выбрать корпус</div>
        <AppSelect
          :items="dataStore.corpuses"
          @check-item="dataStore.setCorpusFilter($event)"
        />
      </label>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AppSelect, AppRange, SquareButtons } from "@/components/UI/ui";
import { useDataStore } from "@/stores/data";
import {computed} from "vue";

const dataStore = useDataStore();

const variants = computed(()=>{
    const lastNumber = +dataStore.filteredData.length.toString()[dataStore.filteredData.length.toString().length - 1]
    if ( dataStore.filteredData.length > 5 && 20 > dataStore.filteredData.length) {
        return ' вариантов'
    } else if (lastNumber > 1 &&  lastNumber < 5) {
        return ' вариантa'
    } else if (lastNumber === 1){
        return ' вариант'
    } else return ' вариантов'

})
</script>

<style scoped>
@import "./style.css";
</style>
