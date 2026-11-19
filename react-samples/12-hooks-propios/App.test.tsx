// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('el hook propio maneja el estado y la cuenta de pendientes', () => {
  render(<App />)
  expect(screen.getByText('Pendientes: 2')).toBeTruthy()
  fireEvent.click(screen.getByLabelText('Comprar yerba'))
  expect(screen.getByText('Pendientes: 1')).toBeTruthy()
})
