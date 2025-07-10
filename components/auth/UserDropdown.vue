<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const authStore = useAuthStore()

const router = useRouter()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    type: 'link',
    onSelect: () => router.push('/sign-out'),
  },
])
</script>

<template>
  <UDropdownMenu
    v-if="authStore.user"
    :items="items"
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 8,
    }"
    :ui="{
      content: 'w-48',
    }"
    color="primary"
  >
    <UButton
      variant="link"
      size="xl"
      :label="authStore.user.name"
      :avatar="{
        src: authStore.user.image,
      }"
    />
  </UDropdownMenu>
</template>

<style>

</style>
