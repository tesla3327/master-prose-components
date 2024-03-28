// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  image: {
    domains: ['source.unsplash.com', 'www.google.com'],
    provider: 'ipx',
  },

  content: {
    highlight: {
      theme: 'github-dark',
    },
    markdown: {
      anchorLinks: false,
    },
  },
});
