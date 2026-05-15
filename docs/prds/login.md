# PRD — Login simulado por email

## Problema

El proyecto necesita simular "estar logueado" para que el header
muestre el correo del usuario y un botón de salida. No se requiere
autenticación real (sin contraseña, sin verificación, sin base de
datos de usuarios). El estado debe sobrevivir a recargas y a cerrar
la pestaña, de manera independiente del carrito.

## Alcance

1. **Formulario en `/login`**: un único campo `email` (tipo `email`,
   `required`). Al enviar, se guarda una sesión persistente que
   contiene el correo y se redirige a `/`.
2. **Persistencia en cookie HTTP-only** (`milan_session`), TTL
   30 días, `SameSite=Lax`, `Path=/`. Lectura desde Server
   Components vía `lib/session`.
3. **Header**:
   - Si no hay sesión → enlace `Iniciar sesión` → `/login`.
   - Si hay sesión → muestra el correo + formulario `Salir` que
     ejecuta una server action y limpia la cookie.
4. **Independencia del carrito**: cerrar sesión **no** vacía el
   carrito; iniciar sesión **no** lo modifica.

## Criterios de aceptación

- [ ] Al enviar el formulario con un email válido, la respuesta
      redirige a `/` y el header muestra el correo enviado.
- [ ] Al recargar cualquier página, el correo sigue visible.
- [ ] Al cerrar y reabrir el navegador antes de 30 días, el correo
      sigue visible.
- [ ] El botón "Salir" elimina la cookie y el header vuelve a mostrar
      "Iniciar sesión".
- [ ] El módulo `lib/session/index.ts` expone **máximo 3** funciones
      públicas: `getSession`, `setSession`, `clearSession`.
- [ ] El carrito persiste sin cambios al iniciar/cerrar sesión.

## Fuera de alcance

- Contraseña, hash, verificación de email, 2FA.
- Modelo `User` en Prisma (la cookie es la única fuente de verdad).
- Recuperación de sesión, expiración corta, refresh tokens.
- Vincular el carrito al usuario.
- Roles, permisos, autorización.

## Riesgos / decisiones

- La cookie es HTTP-only por higiene básica, aunque al no haber
  password no hay un secreto real que proteger. Esto facilita que la
  lectura ocurra exclusivamente en el servidor.
- Sin validación de dominio: cualquier email con sintaxis válida es
  aceptado (consistente con el carácter de práctica del ejercicio).
