import type { SelectDiary, SelectDiaryWithEntries } from '../schema'
import { db } from '../db'

export async function fetchDiary(userId: string, includeEntries: boolean): Promise<SelectDiary | SelectDiaryWithEntries | undefined> {
  return db.query.diary.findFirst({
    where: (diary, { eq }) => eq(diary.userId, userId),
    ...(includeEntries && {
      with: {
        entries: includeEntries,
      },
    }),
  })
}
