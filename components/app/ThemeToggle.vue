<script lang="ts" setup>
const colorMode = useColorMode()

const isLight = computed({
  get() {
    return colorMode.value === 'light'
  },
  set(value) {
    colorMode.preference = value ? 'light' : 'dark'
  },
})
</script>

<template>
  <USwitch
    v-model="isLight"
    unchecked-icon="solar:moon-bold"
    checked-icon="solar:sun-bold"
  />
</template>

<style>

</style>
