<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type * as z from 'zod'
import { InsertDiary } from '~/lib/db/schema'

const open = ref(false)

type Schema = z.infer<typeof InsertDiary>

const state = reactive<Schema>({
  name: '',
  description: '',
  isPublic: false,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // eslint-disable-next-line no-console
  console.log(event.data)
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
        :schema="InsertDiary"
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
