// Convierte el subconjunto de C++ de Arduino que usan las lecciones a JavaScript ejecutable.
// No es un compilador de C++: entiende declaraciones de variables y funciones con tipos simples,
// #define, arrays con llaves y la librería Servo. Lo que no entiende, lo avisa con un error claro.

export class ErrorDeCodigo extends Error {}

const TIPOS = String.raw`(?:unsigned\s+long|unsigned\s+int|long|int|float|double|bool|boolean|byte|char|String|void)`

function sacarTipos(parametros: string) {
  if (!parametros.trim()) return ''
  return parametros.split(',').map(p => {
    const partes = p.trim().split(/\s+/)
    return partes[partes.length - 1].replace(/[&*]/g, '')
  }).join(', ')
}

export function transpilar(codigo: string): { js: string; funciones: string[] } {
  let js = codigo.replace(/\r\n/g, '\n')

  // #include: solo se admite Servo (las demás librerías del kit se explican en la lección y se prueban en Wokwi o en la placa).
  js = js.replace(/^\s*#include\s*<([^>]+)>.*$/gm, (_, libreria: string) => {
    if (libreria.trim() === 'Servo.h') return ''
    throw new ErrorDeCodigo(`El simulador no tiene la librería ${libreria}. Probá este código en Wokwi o en la placa.`)
  })

  // #define NOMBRE valor → const NOMBRE = valor;
  js = js.replace(/^\s*#define\s+(\w+)\s+(.+)$/gm, 'const $1 = $2;')

  // Servo miServo; → let miServo = new Servo();
  js = js.replace(/\bServo\s+(\w+)\s*;/g, 'let $1 = new Servo();')

  // Definición de funciones: int sumar(int a, int b) { → async function sumar(a, b) {
  const funciones: string[] = []
  js = js.replace(new RegExp(String.raw`\b${TIPOS}\s+(\w+)\s*\(([^)]*)\)\s*\{`, 'g'), (_, nombre: string, parametros: string) => {
    funciones.push(nombre)
    return `async function ${nombre}(${sacarTipos(parametros)}) {`
  })

  // Arrays: int pines[] = {2, 3, 4}; → let pines = [2, 3, 4];
  js = js.replace(new RegExp(String.raw`\b(?:const\s+)?${TIPOS}\s+(\w+)\s*\[\s*\d*\s*\]\s*=\s*\{([^{}]*)\}`, 'g'), 'let $1 = [$2]')
  // Array sin inicializar: int lecturas[10]; → let lecturas = new Array(10).fill(0);
  js = js.replace(new RegExp(String.raw`\b(?:const\s+)?${TIPOS}\s+(\w+)\s*\[\s*(\w+)\s*\]\s*;`, 'g'), 'let $1 = new Array($2).fill(0);')

  // Variables: const int led = 13; → const led = 13;   int x = 0; → let x = 0;
  js = js.replace(new RegExp(String.raw`\bconst\s+${TIPOS}\s+(\w+)`, 'g'), 'const $1')
  js = js.replace(new RegExp(String.raw`\b${TIPOS}\s+(\w+)`, 'g'), 'let $1')

  // Casteos de C: (int) x → Math.trunc(x) no es trivial; se avisa para que no den resultados distintos.
  if (/\(\s*(?:int|long|float|byte)\s*\)/.test(js)) {
    throw new ErrorDeCodigo('El simulador no entiende los casteos como (int). Usá las funciones de Arduino, por ejemplo map() o constrain().')
  }

  // delay() y las funciones propias pueden esperar: se las llama con await.
  const esperan = ['delay', ...funciones]
  js = js.replace(new RegExp(String.raw`(?<!function\s)\b(${esperan.join('|')})\s*\(`, 'g'), 'await $1(')

  if (!funciones.includes('setup')) throw new ErrorDeCodigo('Falta la función setup().')
  if (!funciones.includes('loop')) throw new ErrorDeCodigo('Falta la función loop().')

  return { js: `${js}\n;return { setup, loop };`, funciones }
}
