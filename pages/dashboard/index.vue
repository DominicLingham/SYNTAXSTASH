<script lang="ts" setup>
import TipTapEditor from '~/components/app/TipTapEditor.vue'

const content = ref()
</script>

<template>
  <div>
    <h1>You are logged in</h1>
    <UContainer class="mt-4">
      <TipTapEditor v-model="content" />
    </UContainer>
    <div />
  </div>
</template>

<style>

</style>
