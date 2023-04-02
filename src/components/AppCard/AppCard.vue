<template>
  <div class="card">
    <div class="image-block">
      <img class="image" src="@/assets/img/image.png" alt="" />
    </div>
    <div class="flame" v-if="data.saleTrigger">
      <SaleTrigger :sale-trigger="data.saleTrigger"/>
    </div>
    <div class="right-icons">
      <HeartIcon />
      <ScalesIcon />
    </div>

    <div class="description-block">
      <h4 class="object-name">{{ data.objectName }}</h4>
      <div class="title">{{ data.title }}</div>
    </div>

    <div class="info">
      Литер {{ data.literNum }} . Этаж {{ data.floorNum }} . Сдача {{ data.deadline }}
    </div>

    <div class="price-block">
      <div class="prices">
        <div class="price">{{ data.price }}₽</div>
        <div class="old-price">{{ data.oldPrice ? data.oldPrice + "₽" : "" }}</div>
      </div>
      <div class="sale-percent">{{ data.salePercent }}%</div>
    </div>

    <TagList class="tags" :tags="data.features"/>
  </div>
</template>
<script lang="ts" setup>
import { HeartIcon, ScalesIcon } from "@/assets/icons/icons";
import type { Flat } from "@/mock";
import {TagList, SaleTrigger} from "@/components/UI/ui";

defineProps<{ data: Flat }>();
</script>

<style scoped>
@import "./app-card.css";
@import "./app-card-horizont.css";
</style>
