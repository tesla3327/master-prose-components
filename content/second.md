---
description: Another page that you can read stuff on!
---

# The Second Page

## Custom Link Rendering

I created this page to show off some custom link rendering.

You can [go back to the first page](/).

Pretty cool, huh?

## What is happening?

This is a new section.

Check out this code:

```html
<template>
  <div class="prose">{{ prop }}</div>
</template>

<script setup>
  defineProps({
    prop: String,
  });
</script>
```

Some more code, this time it's TypeScript:

```ts [types.ts]
type Wallet = {
  money: Number;
  idCard: UserIdCard;
  giftCards: GiftCard[];
};
```

You can see there's a `GiftCard` type but we haven't added that yet.

### Nothing much

Here we have yet another section.
