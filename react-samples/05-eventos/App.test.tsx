// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('el hijo avisa al padre con la función que recibe por props', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Completar' }))
  fireEvent.click(screen.getByRole('button', { name: 'Completar' }))
  expect(screen.getByText('Tareas hechas hoy: 2')).toBeTruthy()
})
