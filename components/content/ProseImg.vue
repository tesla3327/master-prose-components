<template>
  <div class="p-2 md:-mx-8 lg:-mx-16">
    <NuxtImg
      class="rounded-xl shadow-lg w-full"
      :src="src"
      :alt="alt"
      @click.stop="() => (showLightbox = !showLightbox)"
      width="800"
      sizes="sm:600px md:800px"
      densities="x1 x2"
    />
  </div>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showLightbox"
        class="z-10 fixed bottom-0 right-0 top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 md:p-8"
        @click.stop="() => (showLightbox = !showLightbox)"
      >
        <NuxtImg
          :src="src"
          :alt="alt"
          width="6000"
          sizes="sm:600px md:800px lg:1600px xl:6000px"
          densities="x1 x2"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
});

const showLightbox = ref(false);
</script>
