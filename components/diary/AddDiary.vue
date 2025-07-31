<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

const open = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

const state = reactive({
  name: '',
  description: '',
  isPublic: false,
})

async function onSubmit(event: FormSubmitEvent) {
  isSubmitting.value = true
  try {
    const inserted = await $fetch('/api/diary', {
      method: 'post',
      body: event.data,
    })

    // eslint-disable-next-line no-console
    console.log(inserted)
  }
  catch (e) {
    const error = e as Error
    console.error(error)
  }
  finally {
    isSubmitting.value = false
  }
}
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
      <UForm
        :state="state"
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UFormField label="Name" name="name">
          <UInput
            v-model="state.name"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Description (optional)"
          name="description"
        >
          <UTextarea
            v-model="state.description"
            placeholder="Say a bit about your journey..."
            :max-rows="12"
            autoresize
            class="w-full"
            :ui="{
              base: 'min-h-28 max-h-64',
            }"
          />
        </UFormField>
        <UButton type="submit" class="max-w-fit self-end">
          Save
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style>

</style>
