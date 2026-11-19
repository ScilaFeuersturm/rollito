// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('el campo responde y la lista diferida termina mostrando el filtro', async () => {
  render(<App />)
  expect(screen.getByText('5000 resultados')).toBeTruthy()
  fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: '4999' } })
  expect((screen.getByLabelText('Buscar') as HTMLInputElement).value).toBe('4999')
  expect(await screen.findByText('1 resultados')).toBeTruthy()
})
