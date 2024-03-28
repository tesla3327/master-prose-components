<template>
  <div
    v-if="$props.filename"
    class="bg-slate-200 font-mono text-sm border border-slate-300 py-2 px-3 rounded-t-md text-black"
  >
    {{ $props.filename }}
  </div>
  <pre
    :class="{
      [$props.class as string]: true,
      'mt-0 rounded-t-none': $props.filename,
    }"
  ><slot /></pre>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});
</script>

<style>
pre code .line {
  display: block;
}
</style>
