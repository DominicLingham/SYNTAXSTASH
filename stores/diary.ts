import type { SelectDiary, SelectDiaryWithEntries } from '~/lib/db/schema'
import type { diaryQueryType } from '~/lib/zod-schemas'
import { defineStore } from 'pinia'

export const useDiaryStore = defineStore('diary', () => {
  const query: diaryQueryType = {
    entries: true,
  }
  const { data: userDiary, refresh: refreshUserDiary } = useFetch<SelectDiary | SelectDiaryWithEntries>('/api/diary', {
    lazy: true,
    query,
  })

  return {
    userDiary,
    refreshUserDiary,
  }
})
