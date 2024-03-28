<template>
  <div class="flex justify-center space-x-6 text-gray-300">
    <span v-for="n in 5" class="animate-spin">/</span>
  </div>
</template>

<style scoped>
.animate-spin {
  animation-duration: 5s;
}

.animate-spin:nth-child(2) {
  animation-delay: 200ms;
}

.animate-spin:nth-child(3) {
  animation-delay: 400ms;
}

.animate-spin:nth-child(4) {
  animation-delay: 600ms;
}

.animate-spin:nth-child(5) {
  animation-delay: 800ms;
}
</style>
