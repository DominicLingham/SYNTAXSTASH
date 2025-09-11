<script lang="ts" setup>
import { deleteDiaryEntrySchema } from '~/lib/zod-schemas'

const props = defineProps<{
  entryId: string
}>()

const emits = defineEmits(['update:diaryEntryRemoved'])

const open = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

async function submitDelete() {
  isSubmitting.value = true

  try {
    const validated = deleteDiaryEntrySchema.safeParse(props.entryId)

    if (!validated.success) {
      errorMessage.value = 'Unable to delete diary entry'
    }

    await $fetch(`/api/diary-entries/${props.entryId}`, {
      method: 'delete',
    })

    emits('update:diaryEntryRemoved')
    open.value = false
  }
  catch (e) {
    const error = e as Error
    console.error(error)
    errorMessage.value = error.message
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open" :close="false">
    <UButton
      icon="material-symbols:delete"
      variant="subtle"
      color="error"
    />

    <template #body>
      <p class="font-semibold">
        Are you sure you want to remove this diary entry?
      </p>
    </template>

    <template #footer="{ close }">
      <div class="w-full flex items-center justify-end gap-2">
        <UButton @click="close">
          Cancel
        </UButton>
        <UButton color="error" @click="submitDelete">
          Confirm
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<style>

</style>
