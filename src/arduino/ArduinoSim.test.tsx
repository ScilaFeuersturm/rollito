// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { ArduinoSim } from './ArduinoSim'

afterEach(() => { cleanup(); localStorage.clear() })

it('con el código inicial no pasa; con la solución, el desafío queda superado', async () => {
  render(<ArduinoSim desafio="semaforo" />)
  fireEvent.click(screen.getByRole('button', { name: '✔ Comprobar desafío' }))
  expect((await screen.findByText('Todavía no:')).parentElement?.textContent).toContain('debería estar prendida')

  fireEvent.click(screen.getByRole('button', { name: 'Ver solución' }))
  fireEvent.click(screen.getByRole('button', { name: '✔ Comprobar desafío' }))
  expect(await screen.findByText('🎉 ¡Desafío superado! Ya lo podés probar en la placa real.')).toBeTruthy()
  expect(screen.getByText('✓ Superado')).toBeTruthy()
})

it('un error de código se muestra traducido', async () => {
  render(<ArduinoSim desafio="parpadeo" />)
  fireEvent.change(screen.getByLabelText('Tu código'), { target: { value: 'void setup() { pinMode(led, OUTPUT); }\nvoid loop() {}' } })
  fireEvent.click(screen.getByRole('button', { name: '✔ Comprobar desafío' }))
  expect((await screen.findByText('Todavía no:')).parentElement?.textContent).toContain('No existe "led"')
})
