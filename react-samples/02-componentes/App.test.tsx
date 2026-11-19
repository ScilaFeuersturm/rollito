// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('reutiliza el mismo componente dos veces', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Mis tareas' })).toBeTruthy()
  expect(screen.getAllByRole('article')).toHaveLength(2)
})
