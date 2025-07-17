<script lang="ts" setup>
import OAuthLogin from '~/components/auth/OAuthLogin.vue'

definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-background dark:bg-background-dark">
    <AuthCard>
      <div class="flex flex-col gap-3">
        <OAuthLogin />
        <!--        <USeparator label="OR" /> -->
        <!--        <LoginForm /> -->
      </div>
      <!--      <template #action> -->
      <!--        <p>Need an account?</p> -->
      <!--        <ULink to="/sign-up" class="text-primary font-semibold"> -->
      <!--          Sign up -->
      <!--        </ULink> -->
      <!--      </template> -->
    </AuthCard>
  </div>
</template>

<style>

</style>
