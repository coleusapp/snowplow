<template>
  <container>
    <div v-if="user">
      <div class="px-4 py-2 sm:p-2">
        <div
          class="flex mx-auto sm:w-32 -mb-4 shadow border-4 border-white rounded-full overflow-hidden"
          style="max-width: 6rem;"
        >
          <client-only>
            <progressive-img
              class="profile-page-image"
              src="/users/default.jpg"
              placeholder="/users/default.jpg"
              :blur="30"
              :aspect-ratio="1"
            />
          </client-only>
        </div>
        <h1
          class="font-semibold text-center mt-4 text-2xl sm:text-3xl lg:text-4xl"
        >
          {{ user.name }}
        </h1>
        <div class="text-gray-500 text-center font-light">
          {{ user.slug }}
        </div>
      </div>
      <div
        v-if="books && books.length"
        class="flex content-start flex-wrap px-2 sm:p-2"
      >
        <div
          v-for="book in books"
          :key="book.slug"
          class="p-2 w-1/2 md:w-1/3 lg:w-1/6"
        >
          <nuxt-link
            :to="{
              name: 'user-book-parent-page',
              params: {
                username: user.slug,
                book: book.slug,
                parent: book.parent,
                page: 1
              },
              query: { page: 1 }
            }"
          >
            <coleus-book-card :user="user" :book="book" class="mx-auto" />
          </nuxt-link>
        </div>
      </div>
    </div>
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
    let user = await $content('users')
      .where({ slug: params.user })
      .sortBy('order')
      .fetch()

    user = user.length ? user[0] : null

    const books = []
    const parent = 'parent'
    const book = await $content(`books/${user.slug}/books`)
      .sortBy('order')
      .fetch()
    if (book.length) {
      for (const j in book) {
        const firstPage = await $content(
          `books/${user.slug}/${book[j].slug}/pages`
        )
          .where({ order: 0 })
          .fetch()
        book[j].open_book = `books/${user.slug}/${book[j].slug}/${
          firstPage.length ? firstPage[0].slug : firstPage.slug
        }/1`
        book[parent] = firstPage.length ? firstPage[0].slug : firstPage.slug
        books.push(book[j])
      }
    } else {
      const firstPage = await $content(`books/${user.slug}/${book.slug}/pages`)
        .where({ order: 0 })
        .fetch()
      book.open_book = `books/${user.slug}/${book.slug}/${
        firstPage.length ? firstPage[0].slug : firstPage.slug
      }/1`
      book[parent] = firstPage.length ? firstPage[0].slug : firstPage.slug
      books.push(book)
    }

    return {
      user,
      books
    }
  },
  head() {
    const title = this.users ? this.users[0].name : 'پروفایل کاربر'
    const description = 'لیست کتاب‌های قابل مطالعه‌ی ' + title
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
