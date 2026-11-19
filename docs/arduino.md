# Curso de Arduino

Curso gamificado para el kit del equipo (Arduino Uno R3 compatible, con RFID). Primero electricidad "para no quemar nada", después programación con un simulador en el navegador y, al final, los sensores del kit.

## Dónde está cada cosa

- Lecciones: `src/content/arduino/*.mdx` (15 lecciones, track `arduino`, agrupadas por `modulo`; completar un módulo da una insignia 🏅 en la home).
- Simulador: `src/arduino/`
  - `transpilar.ts`: convierte el subconjunto de C++ de Arduino a JavaScript (solo admite la librería `Servo.h`).
  - `simulador.ts`: ejecuta el sketch con reloj virtual (para comprobar) o real (para ver los LEDs), y avisa errores que en la placa real son peligrosos o confusos (PWM en un pin sin ~, escribir sin `pinMode`, pines 0 y 1 con `Serial`, etc.).
  - `desafios.ts`: los 8 desafíos (parpadeo, semáforo, serie, botón, potenciómetro, fade, alarma, semáforo peatonal), cada uno con su circuito, código inicial, solución y verificador.
  - `ArduinoSim.tsx`: el componente que se usa en las lecciones con `<ArduinoSim desafio="id" />`.
- Tests: `src/arduino/*.test.ts(x)`. Cada solución pasa sin advertencias, cada código inicial falla y se prueban los errores típicos.

## Agregar un desafío

1. Agregá la entrada en `desafios.ts` con `verificar`, que devuelve la lista de problemas (vacía = superado).
2. `npm test`: el test parametrizado verifica la solución y el código inicial automáticamente.
3. Usalo en una lección con `<ArduinoSim desafio="nuevo-id" />` (importando `ArduinoSim` desde `../../arduino/ArduinoSim`).

## Límites

- El simulador no cablea: los errores de conexión (cortocircuitos, LED sin resistencia, RC522 a 5 V) se cubren con teoría y la checklist de la lección 3.
- Sensores con librería (DHT, MFRC522) o `pulseIn` se prueban en [Wokwi](https://wokwi.com) o en la placa.
- Que un desafío se haya superado se guarda en el navegador (`localStorage`), no en Firebase. El progreso de lecciones sí se sincroniza.
