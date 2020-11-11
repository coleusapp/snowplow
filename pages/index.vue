<template>
  <div class="container">
    <h1>Users:</h1>
    <ul>
      <li v-for="user of users" :key="user.username">
        <pre>{{ user.name }}</pre>
        <pre>{{ user.book_count }}</pre>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const users = await $content('users').sortBy('order').fetch()

      return {
        users
      }
    }
  }
</script>
