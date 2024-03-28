<template>
  <div
    class="cursor-pointer transition-all duration-150 ease-in-out"
    :class="{
      'bg-yellow-100 rounded-md px-3 -mx-3': isHighlighted,
    }"
    @click="toggleHighlight"
  >
    <p ref="el">
      <slot />
    </p>
  </div>
</template>

<script setup>
// Get a "hash" of the content
const slots = useSlots();
const hash = computed(() => {
  return slots
    .default()
    .map(getTextFromVNode)
    .join('')
    .split(' ')
    .map((word) => word[0])
    .join('');
});

function getTextFromVNode(vnode) {
  if (typeof vnode.children === 'string') {
    return vnode.children;
  } else if (vnode.children.default) {
    const nodes = vnode.children.default();
    return nodes.map(getTextFromVNode).join('');
  }
}

const route = useRoute();
const isHighlighted = ref(false);
const el = ref(null);

// We need to rely entirely on side-effects here because
// the hash doesn't exist on the server
watch(
  () => route.query,
  () => {
    checkHash();
  }
);
onMounted(() => {
  checkHash();

  // Scroll to the highlighted element
  if (isHighlighted.value && el.value) {
    el.value.scrollIntoView({ behavior: 'smooth' });
  }
});

const checkHash = () => {
  isHighlighted.value =
    route.query.highlight === hash.value;
};

async function toggleHighlight(event) {
  // Make sure we clicked on a paragraph element
  if (event.target.tagName !== 'P') {
    return;
  }

  if (hash.value === '') {
    return;
  }

  if (isHighlighted.value) {
    isHighlighted.value = false;
    await navigateTo({ replace: true });
  } else {
    isHighlighted.value = true;
    await navigateTo(
      { query: { highlight: hash.value } },
      { replace: true }
    );
  }
}
</script>
