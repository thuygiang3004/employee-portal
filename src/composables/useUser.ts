import { ref } from 'vue'
import type { User } from '../types/user'
import { UserSchema } from '../types/user'

export function useUser() {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const setUser = (userData: unknown) => {
    try {
      const validatedUser = UserSchema.parse(userData)
      user.value = validatedUser
      error.value = null
    } catch (e) {
      error.value = 'Invalid user data'
      user.value = null
    }
  }

  return {
    user,
    error,
    setUser
  }
} 