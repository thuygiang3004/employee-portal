import { vi } from 'vitest'

// Mock crypto for tests
const crypto = {
  getRandomValues: (arr: Uint8Array) => arr.map(() => Math.floor(Math.random() * 256))
}
vi.stubGlobal('crypto', crypto) 