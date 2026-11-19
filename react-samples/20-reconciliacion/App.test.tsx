// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

const sumar = () => fireEvent.click(screen.getByRole('button', { name: 'Sumar' }))
const cambiarPersona = () => fireEvent.click(screen.getByRole('button', { name: 'Cambiar persona' }))

it('sin key, el estado se queda en la posición aunque cambie la persona', () => {
  render(<App />)
  sumar(); sumar()
  cambiarPersona()
  expect(screen.getByText(/Beto: 2/)).toBeTruthy()
})

it('con key, cambiar la persona descarta el estado', () => {
  render(<App />)
  fireEvent.click(screen.getByLabelText('Usar key'))
  sumar(); sumar()
  expect(screen.getByText(/Ana: 2/)).toBeTruthy()
  cambiarPersona()
  expect(screen.getByText(/Beto: 0/)).toBeTruthy()
})
