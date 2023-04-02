<template>
   <div class="sale">
       <FlameIcon/>
       <div class="popup">
          {{saleTrigger}}
       </div>
   </div>

</template>

<script lang="ts" setup>

import {FlameIcon} from "@/assets/icons/icons";
defineProps<{
   saleTrigger: string
}>()
</script>

<style scoped>
.popup {
  position: absolute;
  top: calc(100% + 5px);
  margin-top: 6px;
  background: #ffc700;
  font-size: 12px;
  white-space: nowrap;
  color: #fff;
  padding: 6px 10px;
  border-radius: 10px;
  left: 50%;
  transform: translateX(-35%);
  transition: all .2s;
  pointer-events: none;
  opacity: 0;
  z-index: 100;
}

.popup:before {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    background: #ffc700;
    bottom: 80%;
    left: 35%;
    transform: translateX(-50%)rotate(45deg);
}

.popup>div{
  margin-bottom: 6px;
}
.sale:hover .popup {
  opacity: 1;
}

@media (min-width: 1280px) {
    .popup {
        transform: translateX(-50%);
    }
    .popup:before {
        left: 50%;
    }
}
</style>