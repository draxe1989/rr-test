<template>
  <button class="close-btn">
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="#666"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
        stroke="inherit"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
<script lang="ts" setup></script>
<style scoped>
.close-btn {
  height: 41px;
  width: 41px;

  border: 1px solid #dedede;
  border-radius: 999px;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  position: absolute;
  z-index: 1;
  right: 18px;
  top: 18px;
}

.close-btn:focus {
  outline: none;
}
.close-btn:hover > svg {
  stroke: #000;
}
.close-btn:hover {
  border: 1px solid #000;
}
</style>
