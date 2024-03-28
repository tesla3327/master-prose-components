<template>
  <div class="group inline relative z-0 cursor-pointer">
    <NuxtLink :href="href" :target="target">
      <slot />
    </NuxtLink>
    <div
      v-if="isInternal"
      class="absolute transition-all duration-150 bottom-full left-1/2 transform -translate-x-1/2 w-[400px] opacity-0 group-hover:opacity-100 pointer-events-none"
    >
      <div
        class="relative bottom-3 w-content bg-gradient-to-br from-white to-slate-50 border border-gray-300 py-3 px-4 shadow-lg rounded-lg overflow-auto"
      >
        <div class="font-bold">{{ metadata.title }}</div>
        <div>{{ metadata.description }}</div>
        <div
          v-if="linkedParagraph"
          class="bg-yellow-100 rounded-md px-3 -mx-3 mt-4 italic"
        >
          {{ linkedParagraph }}
        </div>
      </div>
    </div>
    <template
      v-else-if="!isInternal"
      class="text-xs text-gray-500 font-bold"
    >
      <NuxtImg
        v-if="!showFallbackFavicon"
        class="inline-block -top-[1px] ml-1 relative not-prose"
        :src="faviconUrl"
        @error="showFallbackFavicon = true"
        width="16"
        height="16"
      />
      <span class="text-sm ml-1" v-if="showFallbackFavicon">
        ↗
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
});

const isInternal = computed(() => {
  return props?.href?.startsWith('/') || false;
});

const nuxtApp = useNuxtApp();
const pathname = computed(() => {
  // Strip off any query or hash
  return props.href.split('?')[0].split('#')[0];
});
const { data: metadata } = await useAsyncData(
  pathname.value,
  () => queryContent(pathname.value).findOne(),
  {
    dedupe: 'defer',
    getCachedData(key) {
      return (
        nuxtApp.static.data[key] ||
        nuxtApp.payload.data[key]
      );
    },
  }
);

// Recursive function to get all text values
function getTextFromNode(node) {
  return (
    node.children
      .flatMap((child) => {
        if (child.type === 'text') {
          return child.value;
        } else {
          return getTextFromNode(child);
        }
      })
      .join(' ')
      // Fix double spaces
      .replaceAll('  ', ' ')
      .replaceAll(' .', '.')
  );
}

// Figure out what paragraph the hash is highlighting
const linkedParagraph = computed(() => {
  if (props.href.includes('?')) {
    const hash = props.href.split('?').at(-1);
    const paragraphs = metadata.value.body.children
      .filter(({ tag }) => tag === 'p')
      .map(getTextFromNode);

    const p = paragraphs.find((p) => {
      const pHash = p
        .split(' ')
        .map((word) => word[0])
        .join('');

      return hash.includes(pHash);
    });

    return p;
  }
});

const showFallbackFavicon = ref(false);
const faviconUrl = computed(() => {
  const hostname = new URL(props.href).hostname;
  return encodeURI(
    `https://www.google.com/s2/favicons?domain=${hostname}`
  );
});
</script>
