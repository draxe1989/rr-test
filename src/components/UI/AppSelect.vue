<template>
  <div class="select-wrapper" data-select ref="selectRef">
    <button class="select" @click="selectHandler">
      <div>{{ selectItem }}</div>
      <div class="icon-wrapper" :class="{ active: dropIsOpen }">
        <svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6L0.535898 6.52533e-07L7.4641 4.68497e-08L4 6Z" fill="#666666" />
        </svg>
      </div>
    </button>

    <Transition name="bounce">
      <div class="options" v-if="dropIsOpen">
        <button
          class="option"
          v-for="(item, i) in itemsWithAll"
          :key="item"
          @click="check(item)"
          @blur="blurHandler($event, i)"
        >
          {{ item ? item : 'Любой' }}
        </button>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps<{
  items: string[];
}>();

const emit = defineEmits<{
  (e: "check-item", params: string): void;
}>();

const selectRef = ref();
const value = ref<string>('');
const dropIsOpen = ref(false);

function selectHandler() {
  dropIsOpen.value = !dropIsOpen.value;
}
function check(item: string) {
  value.value = item;
  dropIsOpen.value = false;
  emit("check-item", value.value);
}

function clickHandler(e: MouseEvent) {
  if (!e.composedPath().includes(selectRef.value)) {
    dropIsOpen.value = false;
  }
}
function escapeHandler(e: KeyboardEvent) {
  if (e.key === "Escape") {
    dropIsOpen.value = false;
  }
}
function blurHandler(e: FocusEvent, i: number) {
  if (i === props.items.length - 1) {
    dropIsOpen.value = false;
  }
}
const selectItem = computed(() => {
  if (value.value === '') {
      return 'Любой'
  } else return value.value
});

const itemsWithAll = computed(() => {
 return [...props.items, '']
});

onMounted(() => {
  window.addEventListener("click", clickHandler);
  document.addEventListener("keyup", escapeHandler);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", clickHandler);
  document.removeEventListener("keyup", escapeHandler);
});
</script>

<style scoped>
.select {
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;

  height: 46px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 14px;
  cursor: pointer;
}

.select:focus {
  outline: none;
  border: 1px solid #ffc700;
  box-shadow: 0 0 1px 1px #ffc700;
}

.select-wrapper {
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;

  position: relative;
}

.options {
  position: absolute;
  width: 100%;
  z-index: 999;
  top: calc(100% + 2px);
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  overflow: hidden;
}

.option {
  height: 46px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: inherit;
  border: none;
}

.option:hover {
  background: rgba(255, 199, 0, 0.1);
}

.option:focus {
  outline: none;
  background: rgba(255, 199, 0, 0.2);
}

.bounce-enter-active {
  animation: bounce-in 0.2s;
}

.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    opacity: 1;
  }
}
.icon-wrapper {
  transition: all 0.3s;
  transform: rotateX(0);
}
.icon-wrapper.active {
  transform: rotateX(-180deg);
}
</style>
