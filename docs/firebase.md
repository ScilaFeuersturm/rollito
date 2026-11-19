# Cuentas de Taller Fichín (Firebase)

Sin cuenta solo se ve la landing (`src/app/Landing.tsx`): qué es Rollito y "¿No tenés cuenta? Contactate con Aramis". Lecciones, repaso, simulacros, práctica y material privado piden una cuenta de miembro; después de entrar, se vuelve a la página pedida (`/cuenta/?volver=`). El progreso se guarda en Firebase y se ve en cualquier dispositivo. Hay lugar para 10 miembros; la admin genera los códigos de invitación.

**Límite conocido:** el sitio es estático. El HTML publicado ya no trae el texto de las lecciones y `public/robots.txt` deja indexar solo la landing, pero el contenido sigue dentro del JavaScript del sitio: alguien con conocimientos técnicos lo puede leer. Para protección real habría que cifrar el contenido y guardar la clave en Firestore, legible solo por miembros.

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Configuración de Firebase y todas las llamadas | `src/cuenta/servicio.ts` (se descarga solo si hace falta) |
| Unión del progreso del navegador con el de la nube | `src/cuenta/combinar.ts` (+ test) |
| Pantalla de cuenta: entrar, código, recuperar y cambiar contraseña | `src/app/Cuenta.tsx` → `/cuenta/` |
| Panel de admin: progreso e invitaciones | `src/app/Admin.tsx` → `/admin/` |
| Reglas de seguridad de Firestore | `firebase/firestore.rules` |
| Tests de las reglas (emulador) | `firebase/reglas.emulador.mjs` → `npm run test:reglas` (necesita Java 21+) |

## Datos

- `admins/{uid}`: quién es admin. Se crea a mano en la consola; desde la app nadie lo puede escribir.
- `invitaciones/{codigo}`: `{ usada, creadaEn, usadaPor?, usadaEn? }`. Un solo uso.
- `miembros/{uid}`: `{ nombre, email, invitacion, creadoEn }`. Se crea al canjear un código. Borrarla quita el acceso.
- `progreso/{uid}`: `{ lecciones: { idDeLeccion: 'AAAA-MM-DD' }, actualizado }`.

## Puesta en marcha (una sola vez)

1. **Publicar las reglas:** Firebase → Firestore Database → **Reglas**. Reemplazá todo por el contenido de `firebase/firestore.rules` y tocá **Publicar**.
2. **Crear el primer código a mano** (la admin todavía no existe): Firestore → **Datos** → "Iniciar colección" → ID `invitaciones`. ID del documento: un código inventado largo (por ejemplo `prim-era4-xk9z`, en minúsculas). Campos: `usada` (boolean) = `false`, `creadaEn` (timestamp) = ahora.
3. **Registrarte** en https://rollito.onrender.com/cuenta/ → "Tengo un código", con ese código.
4. **Nombrarte admin:** Firebase → Authentication → **Usuarios**, copiá tu **UID**. En Firestore, creá la colección `admins` con un documento cuyo ID sea tu UID (sin campos, o un campo `nombre`).
5. Volvé a `/cuenta/`: aparece el link al **Panel de administración**. Desde ahí generás los códigos para el resto.

## Seguridad

- La configuración web (`apiKey`, etc.) es pública por diseño. La protección son las reglas, que están probadas con el emulador (20 casos: canje de un solo uso, nadie lee ni escribe el progreso ajeno, solo la admin administra, nadie se nombra admin desde la app).
- Capa extra opcional: en Google Cloud Console → APIs y servicios → Credenciales, restringí la clave del navegador a los sitios `rollito.onrender.com/*` y `localhost:*`.
- Firebase Auth permite que cualquiera cree una cuenta usando la API directamente; sin una invitación válida esa cuenta no puede leer ni escribir nada.
- El límite de 10 lugares lo controla el panel de admin (no genera códigos si no hay lugar).
- Al salir, se borra el progreso guardado en ese navegador (queda en la cuenta), por si el dispositivo es compartido.
