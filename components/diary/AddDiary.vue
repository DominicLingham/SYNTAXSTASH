<script lang="ts" setup>
const open = ref(false)

const state = ref({
  name: '',
  description: '',
})
</script>

<template>
  <UModal
    v-model:open="open"
    title="Create a diary"
    :ui="{
      footer: 'flex justify-end',
    }"
  >
    <UButton
      label="Create a diary"
      icon="material-symbols:add"
      variant="subtle"
    />

    <template #body>
      <UForm class="flex flex-col gap-4">
        <UFormField label="Title">
          <UInput
            v-model="state.name"
            class="w-full"
          />
        </UFormField>
        <UFormField label="description">
          <UTextarea
            v-model="state.description"
            placeholder="Say a bit about your journey..."
            :max-rows="4"
            autoresize
            class="w-full"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton>Save</UButton>
    </template>
  </UModal>
</template>

<style>

</style>
