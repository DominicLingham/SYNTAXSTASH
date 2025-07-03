<script lang="ts" setup>
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="min-h-screen flex justify-center items-center bg-background dark:bg-background-dark">
    <AuthCard>
      <div class="flex flex-col gap-3">
        <AuthSignUpForm />
      </div>
      <template #action>
        <p>Already have an account?</p>
        <ULink to="/login" class="text-primary font-semibold">
          Log in
        </ULink>
      </template>
    </AuthCard>
  </div>
</template>

<style>

</style>
