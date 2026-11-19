// Traduce los códigos de error de Firebase a mensajes para la persona.
export function mensajeDeError(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : ''
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'El mail o la contraseña no son correctos.'
    case 'auth/invalid-email':
      return 'Ese mail no tiene un formato válido.'
    case 'auth/email-already-in-use':
      return 'Ya hay una cuenta con ese mail. Probá entrar o recuperar la contraseña.'
    case 'auth/weak-password':
    case 'auth/password-does-not-meet-requirements':
      return 'La contraseña es muy débil: usá al menos 8 caracteres.'
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Esperá unos minutos y probá de nuevo.'
    case 'auth/network-request-failed':
    case 'unavailable':
      return 'No hay conexión. Revisá tu red.'
    case 'permission-denied':
      return 'El código de invitación no es válido o ya se usó.'
    case 'nombre-invalido':
      return 'Escribí tu nombre (de 1 a 60 caracteres).'
    case 'clave-corta':
      return 'La contraseña tiene que tener al menos 8 caracteres.'
    case 'claves-distintas':
      return 'Las dos contraseñas nuevas no coinciden.'
    default:
      return 'Algo salió mal. Probá de nuevo.'
  }
}
