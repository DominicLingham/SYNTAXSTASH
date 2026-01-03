<script lang="ts" setup>
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-zinc-50 dark:bg-zinc-950">
    <AuthCard>
      <div class="flex flex-col gap-3">
        <AuthSignUpForm />
      </div>
      <template #action>
        <p class="text-zinc-600 dark:text-zinc-400">
          Already have an account?
        </p>
        <ULink to="/login" class="text-primary font-semibold">
          Log in
        </ULink>
      </template>
    </AuthCard>
  </div>
</template>

<style>

</style>
