import '@testing-library/jest-dom'
import { vi } from 'vitest'

const mockObserver = {
  observe: () => {},
  unobserve: () => {},
  disconnect: () => {},
}

global.IntersectionObserver = vi.fn(() => mockObserver) as unknown as typeof IntersectionObserver
