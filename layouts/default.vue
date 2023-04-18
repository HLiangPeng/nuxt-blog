<script setup lang="ts"></script>

<template>
  <div class="flex bg-bg text-primary px-32">
    <div class="left w-[220px] bg-primary min-h-screen">
      <LeftAside />
    </div>
    <div class="flex-1 mx-[20px]">
      <slot />
    </div>
    <div class="right w-[240px] bg-primary min-h-screen">
      this is right
    </div>
  </div>
</template>

<style scoped></style>
