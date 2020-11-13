<template>
  <container class="flex flex-wrap flex-row">
    <template v-if="users && users.length">
      <h1 class="w-full px-4 mt-4 mb-2 text-2xl">شاعران</h1>
      <nuxt-link
        v-for="user in users"
        :key="user.slug"
        class="w-full min-w-sm sm:w-1/2 md:w-1/3"
        :to="{ name: 'user', params: { user: user.slug } }"
        no-prefetch
      >
        <div
          class="px-4 py-2 sm:p-2"
          itemscope
          itemprop="Person"
          itemtype="http://schema.org/Person"
          vocab="http://schema.org/"
          typeof="Person"
        >
          <div
            class="bg-white border border-gray-300 flex flex-wrap items-center shadow rounded"
          >
            <div class="w-1/4 -mb-2 p-2">
              <img
                class="hidden"
                itemprop="image"
                property="image"
                src="/users/default.jpg"
                :alt="`عکس پروفایل ${user.name}`"
              />
              <client-only>
                <progressive-img
                  class="home-profile"
                  src="/users/default.jpg"
                  placeholder="/users/default.jpg"
                  :blur="30"
                  :aspect-ratio="1"
                  :alt="`عکس پروفایل ${user.name}`"
                />
              </client-only>
            </div>
            <div class="w-3/4 flex flex-col text-right pr-4">
              <h2 class="font-semibold" itemprop="name" property="name">
                {{ user.name }}
              </h2>
              <div class="flex justify-between font-light" dir="rtl">
                <div class="text-gray-400">{{ user.book_count }} کتاب</div>
              </div>
            </div>
          </div>
        </div>
      </nuxt-link>
    </template>
    <template v-else>
      <div class="container">
        <spinner class="w-8 mx-auto my-4" />
      </div>
    </template>
  </container>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const users = await $content('users')
      .sortBy('order')
      .fetch()

    return {
      users
    }
  }
}
</script>
