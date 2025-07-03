<script lang="ts" setup>

</script>

<template>
  <UForm
    class="flex flex-col gap-4"
  >
    <UFormField label="Email address" name="email">
      <UInput
        type="email"
        placeholder="Enter your email (e.g. name@domain.com)"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
      class="w-full"
    >
      <UInput
        type="password"
        placeholder="Enter your password"
        class="w-full"
      />
    </UFormField>

    <UButton
      block
      type="submit"
      color="primary"
    >
      Login
    </UButton>
  </UForm>
</template>

<style>

</style>
