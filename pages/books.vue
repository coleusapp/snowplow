<template>
  <div class="container">
    <h1>books:</h1>
    <ul>
      <li v-for="book of books" :key="book.slug">
        <pre>{{ book.title }}</pre>
        <pre>{{ book.slug }}</pre>
        <pre>{{ book.open_book }}</pre>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const users = await $content('users').sortBy('order').fetch()
      let books = []
      for (let i in users) {
        let book = await $content('books/' + users[i]['slug'] + '/books').sortBy('order').fetch()
        if (book.length) {
          for (let j in book) {
            let firstPage = await $content(`books/${users[i]['slug']}/${book[j]['slug']}/pages`).where({ order: 0 }).fetch()
            book[j]['open_book'] = `books/${users[i]['slug']}/${book[j]['slug']}/${(firstPage.length ? firstPage[0].slug : firstPage.slug)}/1`
            books.push(book[j])
          }
        } else {
          let firstPage = await $content(`books/${users[i]['slug']}/${book['slug']}/pages`).where({ order: 0 }).fetch()
          book['open_book'] = `books/${users[i]['slug']}/${book['slug']}/${(firstPage.length ? firstPage[0].slug : firstPage.slug)}/1`
          books.push(book)
        }
      }

      return {
        users,
        books
      }
    }
  }
</script>
