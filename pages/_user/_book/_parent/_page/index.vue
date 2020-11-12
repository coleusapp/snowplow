<template>
  <div class="container">
    <h1>content:</h1>
    <ul>
      <li v-for="content of contents" :key="content.order">
        <pre>{{ content.m1 }}</pre>
        <pre>{{ content.m2 }}</pre>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const contents = await $content(`books/${params.user}/${params.book}/${params.parent}/sh${params.page}`).sortBy('order').fetch()

      return {
        contents
      }
    }
  }
</script>