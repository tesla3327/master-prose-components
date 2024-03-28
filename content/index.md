---
description: The first page of the blog.
---

# Custom Prose Components

Through five different examples, I'm going to show you exactly how to use prose components, and a bunch of different things you can do with them.

Prose components let us easily drop in components to render different parts of our Markdown content — `p`, `a` and `img` tags, as well as custom rendering for `code` blocks and everything else in Markdown.

These are the examples that we'll be exploring, starting simple and then working our way up in complexity:

1. **Horizontal rule** — we'll be adding a custom animation to keep things interesting
2. **Add filename to code blocks** — let's add some useful metadata to our code blocks
3. **Super easy lightbox** — a simple lightbox that uses `NuxtImg` to keep things optimized
4. **Meta-info on links** — show the title, description and more on internal links, and show where external links go to
5. **Highlighting paragraphs** — highlight specific paragraphs when you share the URL

If you want to see how these components are built, check out the article that goes with this on the [Mastering Nuxt website](https://www.masteringnuxt.com).

## 1. Horizonal Rule

The first one is this horizontal rule component.

---

Normally, a horizontal rule is a pretty boring line. But with some CSS we can spruce things up.

## 2. Filename on code blocks

The default code block we get does syntax highlighting, but not much else:

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

Here, we add on the filename of the code block:

```ts [types.ts]
type Wallet = {
  money: Number;
  idCard: UserIdCard;
  giftCards: GiftCard[];
};
```

## 3. Easy Minimal Lightbox

By creating a `ProseImg` component we can control how our images are rendered, creating a great lightbox.

Try clicking on each image to see it.

If you check the dev tools you'll notice that we're loading a small image inline, then loading the biggest image we can (based on screen size and density) to display in the lightbox. This is all done using `NuxtImg` and `IPX`.

Here's a picture of the Scottish Highlands:
![](https://source.unsplash.com/green-field-under-white-cloudy-sky-UiE-kcDnIGs/6000x4000)

The next picture is of a car:
![](https://source.unsplash.com/blue-volkswagen-beetle-on-grass-field-7HNftpNvqho/6000x4000)

This last picture is of a city:

![](https://source.unsplash.com/aerial-photograph-of-cityscape-ErccHKWjG18/6000x4000)

## 4. Meta-data on links

I've never actually seen this on a website before, but I think it's a cool feature.

When you hover [over a link to an internal page](/second) you can see some extra meta-data about that link. A link to the [second page](/second?highlight=Cotc) with a highlighted paragraph (the highlighting comes from the last prose component we'll cover).

With external links, we can instead display the favicon so you know where you're headed.

Here's a link to [my website](https://michaelnthiessen.com).

This one [links to the Vue website](https://vuejs.org), and this one [links to the Nuxt website](https://nuxt.com). The [Mastering Nuxt website](https://www.masteringnuxt.com) also has a favicon.

## 5. Share highlighted paragraphs

I made a custom `p` tag that lets you highlight a tag.

Try clicking on any of the paragraphs here, you'll see that they're highlighted.

You may also notice that a query param changes — we're [able to deep-link](/second?highlight=Cotc) to a specifically highlighted section of the article. We're also able to combine the `ProseA` and `ProseP` components and show the highlighted paragraph directly in our meta-data popover with a little help from `queryContent`.
