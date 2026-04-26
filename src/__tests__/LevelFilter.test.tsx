import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LevelFilter } from '../components/LevelFilter'

describe('LevelFilter', () => {
  it('shows FILTER BY LEVEL when closed', () => {
    render(<LevelFilter selectedLevels={new Set()} onToggleLevel={vi.fn()} />)
    expect(screen.getByText(/filter by level/i)).toBeInTheDocument()
  })

  it('shows level buttons after toggle open', async () => {
    render(<LevelFilter selectedLevels={new Set()} onToggleLevel={vi.fn()} />)
    await userEvent.click(screen.getByText(/filter by level/i))
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '15' })).toBeInTheDocument()
  })

  it('calls onToggleLevel when a level is clicked', async () => {
    const handler = vi.fn()
    render(<LevelFilter selectedLevels={new Set()} onToggleLevel={handler} />)
    await userEvent.click(screen.getByText(/filter by level/i))
    await userEvent.click(screen.getByRole('button', { name: '7' }))
    expect(handler).toHaveBeenCalledWith(7)
  })

  it('shows badge with selected range when closed', () => {
    render(<LevelFilter selectedLevels={new Set([5, 8, 10])} onToggleLevel={vi.fn()} />)
    expect(screen.getByText('5 - 10')).toBeInTheDocument()
  })

  it('toggles open/closed on button click', async () => {
    render(<LevelFilter selectedLevels={new Set()} onToggleLevel={vi.fn()} />)
    await userEvent.click(screen.getByText(/filter by level/i))
    expect(screen.getByText(/hide filter/i)).toBeInTheDocument()
    await userEvent.click(screen.getByText(/hide filter/i))
    expect(screen.getByText(/filter by level/i)).toBeInTheDocument()
  })
})
