// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('el botón enfoca el campo usando la ref', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Escribir una tarea' }))
  expect(document.activeElement).toBe(screen.getByLabelText('Título'))
})
