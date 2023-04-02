<template>
   <transition>

  <div class="modal-overlay" v-if="modalStore.finalModalIsOpen" >
    <div class="modal">
      <CloseButton @click="modalStore.closeFinalModal()" />
      <h4 class="form-title">Заявка успешно отправлена</h4>
      <div class="form-subtitle">Наш менеджер свяжется с вами для уточнения деталей</div>
      <button class="form-button" @click="modalStore.closeFinalModal()">
        Вернутьс в каталог
      </button>
    </div>
  </div>
   </transition>
</template>
<script lang="ts" setup>
import { CloseButton } from "@/components/UI/ui";
import { useModalsStore } from "@/stores/modals";


const modalStore = useModalsStore();
</script>
<style scoped>
@import "./style.css";

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
