<script setup lang="ts"></script>

<template>
  <div class="flex bg-dark text-primary px-20">
    <div class="left w-[220px] bg-primary min-h-screen">
      <LeftAside />
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <div class="right w-[240px] bg-primary min-h-screen">
      this is right
    </div>
  </div>
</template>

<style scoped></style>
