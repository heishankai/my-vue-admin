<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <p class="hello">{{ msg }}</p>
</template>

<style scoped>
.hello {
  margin-top: 1rem;
  font-size: 1.125rem;
}
</style>
