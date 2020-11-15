<template>
  <container>
    <div
      class="min-h-screen lg:static lg:max-h-full lg:overflow-visible lg:w-3/4"
    >
      <div class="lg:mx-0 flex flex-col-reverse lg:flex-row">
        <div
          class="lg:min-h-screen w-full px-4 lg:static lg:overflow-visible lg:max-h-full"
        >
          <div v-if="true">
            <coleus-article class="mt-2">
              <p class="py-2 text-gray-500 font-light">
                <coleus-breadcrumb-element
                  :user-username="params.user"
                  :user-name="params.user"
                  :book-title="params.book"
                  :page-parent="params.parent"
                />
              </p>
              <h1 class="text-4xl mb-10 border-indigo-600">
                ...
              </h1>
              <div class="flex flex-wrap content-wrapper sm:mb-20">
                <!-- eslint-disable -->
                <div v-for="c in contents" :key="c.order" class="w-full py-2">
                  <div
                    :class="{
                      'md:w-1/2': 'm1' in c || 't1' in c,
                      'leading-loose': 'p' in c
                    }"
                    v-html="c.m1 || c.t1 || c.p"
                  ></div>
                  <div
                    :class="{
                      'md:w-1/2': 'm1' in c || 't1' in c,
                      'leading-loose': 'p' in c
                    }"
                    v-html="c.m2 || c.t2"
                  ></div>
                </div>
                <!-- eslint-enable -->
              </div>
              <nuxt-link v-if="next" :to="next">بعدی </nuxt-link>
              <br />
              <nuxt-link v-if="prev" :to="prev">قبلی</nuxt-link>
            </coleus-article>
          </div>
          <coleus-spinner v-else class="w-8 mx-auto my-4" />
        </div>
      </div>
    </div>
  </container>
</template>

<script>
import Container from '~/components/global/Container.vue'
export default {
  components: { Container },
  async asyncData({ $content, params }) {
    const contents = await $content(
      `books/${params.user}/${params.book}/${params.parent}/sh${params.page}`
    ).fetch()

    let next = null
    let prev = null
    try {
      const nextLink = `books/${params.user}/${params.book}/${
        params.parent
      }/sh${parseInt(params.page) + 1}`
      await $content(nextLink).fetch()
      next = `/${params.user}/${params.book}/${params.parent}/${parseInt(
        params.page
      ) + 1}`
    } catch (err) {}

    try {
      const prevLink = `books/${params.user}/${params.book}/${
        params.parent
      }/sh${parseInt(params.page) - 1}`
      await $content(prevLink).fetch()
      prev = `/${params.user}/${params.book}/${params.parent}/${parseInt(
        params.page
      ) - 1}`
    } catch (err) {}

    return {
      params,
      contents,
      next,
      prev
    }
  },
  data: () => ({
    page: null,
    parent: null,
    loading: false
  }),
  head() {
    const title = this.pages && this.pages.length ? this.pages[0].title : ''
    const description = 'مطالعه صفحه ' + title
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.content-wrapper .w-full:nth-child(2n) {
  @apply pb-6;
}
</style>
