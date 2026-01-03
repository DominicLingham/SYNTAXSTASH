<script lang="ts" setup>
import OAuthLogin from '~/components/auth/OAuthLogin.vue'

definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-zinc-50 dark:bg-zinc-950">
    <AuthCard>
      <div class="flex flex-col gap-3">
        <OAuthLogin />
      </div>
    </AuthCard>
  </div>
</template>

<style>

</style>
