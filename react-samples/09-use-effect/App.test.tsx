// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('carga las tareas y vuelve a cargarlas cuando cambia el filtro', async () => {
  render(<App />)
  expect(await screen.findByText('Comprar yerba')).toBeTruthy()
  fireEvent.click(screen.getByLabelText('Solo pendientes'))
  await screen.findByText('Pagar la luz')
  await new Promise(r => setTimeout(r, 400))
  expect(screen.queryByText('Comprar yerba')).toBeNull()
})
