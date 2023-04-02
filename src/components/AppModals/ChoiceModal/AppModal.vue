<template>
  <transition>
    <div class="modal-overlay" v-if="modalStore.infoModalIsOpen">
      <div class="modal-wrapper">
        <div class="modal">
          <CloseButton @click="closeModal" />
          <div class="info">
            <div class="image-block">
              <img class="image" src="@/assets/img/image2.png" alt="" />
            </div>
            <div class="descripton">
              <h4 class="title">{{ modalStore.modalData?.title }}</h4>
              <div class="id">ID{{ modalStore.modalData?.id }}</div>
              <div class="object-name">{{ modalStore.modalData?.objectName }}</div>
              <div class="deadline">
                Срок сдачи: <span>{{ modalStore.modalData?.deadline }}</span>
              </div>
              <div class="string">
                <div>Корпус</div>
                <b>{{ modalStore.modalData?.literNum }}</b>
              </div>
              <div class="string">
                <div>Этаж</div>
                <b>{{ modalStore.modalData?.floorNum }}</b>
              </div>
              <div class="string">
                <div>Общая площадь</div>
                <b>{{ modalStore.modalData?.area }} м2</b>
              </div>
              <div class="string last">
                <div>Жилая площадь</div>
                <b>{{ squareWithoutKitchen }} м2</b>
              </div>
              <div class="price">
                <div>Стоимость</div>
                <b>от {{ modalStore.modalData?.price }} ₽</b>
              </div>
            </div>
          </div>
          <div class="form-block">
            <div class="head">
              <h4 class="form-title">Забронировать квартиру в 2 клика</h4>
              <div class="form-subtitle">
                Наш менеджер перезвонит вам в течение 15 минут
              </div>
            </div>
            <div class="form">
              <div class="email">
                <AppEmailInput
                  :email="form.data.email"
                  @input-email="addEmail"
                  :error="emailError"
                />
                <div v-if="emailError" class="error">{{ emailError }}</div>
              </div>
              <div class="phone">
                <AppPhoneInput @input-phone="addPhone" :error="phoneError" />
                <div v-if="phoneError" class="error">{{ phoneError }}</div>
              </div>
              <button class="form-button" @click="submit">Отправить</button>
              <div v-if="emptyError" class="error" style="margin-top: -30px">
                {{ emptyError }}
              </div>
              <div class="approval">
                Отправляя форму, вы соглашаетесь на обработку персональных данных
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { CloseButton, AppPhoneInput, AppEmailInput } from "@/components/UI/ui";

import { useModalsStore } from "@/stores/modals";
import { reactive, ref, computed } from "vue";

const modalStore = useModalsStore();
const form = reactive<{
  data: {
    email: string;
    phone: string;
  };
}>({
  data: {
    email: "",
    phone: "",
  },
});
const emailError = ref("");
const phoneError = ref("");
const emptyError = ref("");

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regNum = /^(\+7|8) \(\d{3}\) \d{3}-\d{3}-\d{1}$/;

function addPhone(e: string) {
  form.data.phone = e;
  phoneError.value = "";
  emptyError.value = "";
}
function addEmail(e: string) {
  form.data.email = e;
  emailError.value = "";
  emptyError.value = "";
}

function closeModal() {
  form.data = {
    email: "",
    phone: "",
  };
  modalStore.closeInfoModal();
}

function submit() {
  if (
    form.data.email &&
    emailRegexp.test(form.data.email) &&
    (!form.data.phone || regNum.test(form.data.phone))
  ) {
    closeModal();
    modalStore.openFinalModal();
  } else if (
    (!form.data.email || emailRegexp.test(form.data.email)) &&
    form.data.phone &&
    regNum.test(form.data.phone)
  ) {
    closeModal();
    modalStore.openFinalModal();
  } else if (!form.data.email && !form.data.phone) {
    emptyError.value = "Поля не заполнены";
  }

  if (form.data.email && !emailRegexp.test(form.data.email)) {
    emailError.value = "Некорректный email";
  }

  if (form.data.phone && !regNum.test(form.data.phone)) {
    phoneError.value = "Некорректный номер телефона";
  }
}

const squareWithoutKitchen = computed(() => {
  if (modalStore.modalData?.area && modalStore.modalData?.areaKitchen) {
    return (+modalStore.modalData.area - +modalStore.modalData.areaKitchen).toFixed(2);
  }
});
</script>
<style scoped>
@import "./style.css";

.error {
  font-size: 10px;
  position: absolute;
  color: #ea5455;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
