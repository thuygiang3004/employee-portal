import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock crypto
const crypto = {
  getRandomValues: () => new Uint32Array(10)
}
vi.stubGlobal('crypto', crypto)

// Configure Vue Test Utils
config.global.stubs = {
  'router-view': true,
  'router-link': true
} 