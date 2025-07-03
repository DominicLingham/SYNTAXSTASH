<script setup lang="ts">

</script>

<template>
  <UForm
    class="flex flex-col gap-4"
  >
    <UFormField label="First name" name="firstName">
      <UInput
        placeholder="First name"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Last name" name="lastName">
      <UInput
        placeholder="First name"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Email address" name="email">
      <UInput
        type="email"
        class="w-full"
        placeholder="Enter your email (e.g. name@domain.com)"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        type="password"
        placeholder="Enter your password"
        class="w-full"
      >
        <template #trailing>
          <UButton
            color="primary"
            variant="link"
            icon="i-bx:show"
            :padded="false"
          />
        </template>
      </UInput>
    </UFormField>

    <UFormField
      label="Confirm password"
      name="confirmPassword"
    >
      <UInput
        type="password"
        placeholder="Confirm your password"
        class="w-full"
      >
        <template #trailing>
          <UButton
            color="primary"
            variant="link"
            icon="i-bx:show"
            :padded="false"
          />
        </template>
      </UInput>
    </UFormField>

    <UButton
      block
      type="submit"
      color="primary"
    >
      Sign up
    </UButton>
  </UForm>
</template>

<style scoped>

</style>
