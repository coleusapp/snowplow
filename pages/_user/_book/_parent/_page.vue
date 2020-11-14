<template>
  <container>
    <div class="max-w-xl mx-auto">
      <coleus-alert-warning v-if="showError"
        >خطایی رخ داده است.</coleus-alert-warning
      >
      <nuxt-child :class="[toggleContents ? 'hidden' : 'block']" />
    </div>
  </container>
</template>

<script>
export default {
  data: () => ({
    toggleContents: false,
    showError: false
  }),
  created() {
    this.$root.$on('close-menu', () => {
      this.toggleContents = false
    })
    this.$root.$on('toggle-contents', () => {
      this.toggleContents = !this.toggleContents
    })
    this.$root.$on('graphql-error', () => {
      this.showError = true
    })
  }
}
</script>
