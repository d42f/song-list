import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FiltersProvider } from '../context/FiltersContext'
import { LevelFilter } from '../components/LevelFilter'

function renderWithProvider() {
  return render(
    <FiltersProvider>
      <LevelFilter />
    </FiltersProvider>,
  )
}

describe('LevelFilter', () => {
  it('shows FILTER BY LEVEL when closed', () => {
    renderWithProvider()
    expect(screen.getByText(/filter by level/i)).toBeInTheDocument()
  })

  it('shows level buttons after toggle open', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText(/filter by level/i))
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '15' })).toBeInTheDocument()
  })

  it('calls onToggleLevel when a level is clicked', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText(/filter by level/i))
    await userEvent.click(screen.getByRole('button', { name: '7' }))
    expect(screen.getByRole('button', { name: '7' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows badge with selected range when closed', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText(/filter by level/i))
    await userEvent.click(screen.getByRole('button', { name: '5' }))
    await userEvent.click(screen.getByRole('button', { name: '8' }))
    await userEvent.click(screen.getByRole('button', { name: '10' }))
    await userEvent.click(screen.getByText(/hide filter/i))
    expect(screen.getByText('5 - 10')).toBeInTheDocument()
  })

  it('toggles open/closed on button click', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText(/filter by level/i))
    expect(screen.getByText(/hide filter/i)).toBeInTheDocument()
    await userEvent.click(screen.getByText(/hide filter/i))
    expect(screen.getByText(/filter by level/i)).toBeInTheDocument()
  })
})
