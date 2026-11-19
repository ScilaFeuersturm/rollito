// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('htmlFor y className llegan al DOM como for y class', () => {
  render(<App />)
  const campo = screen.getByLabelText('Título') // funciona porque htmlFor asocia el label
  expect(campo.getAttribute('maxlength')).toBe('60')
  expect(screen.getByRole('heading', { name: 'Nueva tarea' }).getAttribute('class')).toBe('titulo')
  expect(screen.getByLabelText('Es urgente')).toBeTruthy()
})
