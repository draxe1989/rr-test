<template>
  <div class="icon-container">
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
    >
      <rect
        x="3"
        y="3"
        width="12"
        height="4.5"
        rx="2"
        stroke="inherit"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="3"
        y="10.5"
        width="12"
        height="4.5"
        rx="2"
        stroke="inherit"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.icon-container {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;
  border-radius: 999%;
  background: #fff;
}

.icon-container > svg {
  stroke: #000;
}
</style>
