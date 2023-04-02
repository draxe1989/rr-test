<template>
  <header class="header">
    <div class="container">
      <div class="header-content"><slot></slot></div>
    </div>
  </header>
</template>
<style scoped>
.header {
  height: 60px;
}
.header-content {
  height: 100%;
  border-bottom: 1px solid var(--border-color);
}
@media (min-width: 768px) {
  .header {
    height: 80px;
  }
}
@media (min-width: 1024px) {
  .header {
    height: 100px;
  }
}
@media (min-width: 1280px) {
  .header {
    height: 120px;
  }
  .header-content {
    border-bottom: 2px solid var(--border-color);
  }
}
</style>
