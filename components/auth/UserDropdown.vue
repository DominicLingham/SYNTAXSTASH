<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const authStore = useAuthStore()

const router = useRouter()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Dashboard',
    icon: 'material-symbols:dashboard',
    type: 'link',
    onSelect: () => router.push('/dashboard'),
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    type: 'link',
    onSelect: () => router.push('/sign-out'),
  },
])

const avatarPath = computed(() => authStore.user?.image || '/SyntaxStashLogo.png')
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
        src: avatarPath,
      }"
    />
  </UDropdownMenu>
</template>

<style>

</style>
