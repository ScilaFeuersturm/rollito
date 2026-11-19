# Curso de Claude Code

Track `claude-code` de Rollito: 12 lecciones en `src/content/claude-code/`, para que el equipo de Taller Fichín aprenda a trabajar con Claude Code. Cada lección tiene una **misión** práctica (en `tarea_local`) y completar un módulo da una **insignia** en la tarjeta de la home.

**Última verificación contra la documentación oficial:** 19/11/2026.

| Módulo | Lecciones | Fuentes (code.claude.com/docs/en/…) |
| --- | --- | --- |
| Primeros pasos | 01 Instalar y primera sesión | quickstart, interactive-mode |
| Cómo pedirle las cosas | 02 Pedidos claros · 03 Corregir el rumbo y cuidar el contexto | best-practices, interactive-mode |
| Permisos y configuración | 04 Modos de permisos · 05 settings.json, allow y deny | permission-modes, permissions, settings |
| Memoria del proyecto | 06 CLAUDE.md | memory |
| Automatizar | 07 Skills · 08 Hooks · 09 MCP · 10 Subagentes | skills, hooks-guide, hooks, mcp, sub-agents |
| Trabajo diario seguro | 11 Trabajo seguro | permissions, best-practices |
| Desafío final | 12 Configurá un proyecto de punta a punta | todas |

## Datos que cambiaron respecto de tutoriales viejos (a 19/11/2026)

- Los comandos propios se unificaron con las **skills** (`.claude/skills/<nombre>/SKILL.md`); `.claude/commands/` sigue funcionando.
- El atajo `#` para la memoria **no aparece** en la documentación actual: se usa `/memory` o se le pide a Claude.
- Existe el modo de permisos **`auto`** (un clasificador revisa las acciones), que en versiones recientes es el modo de inicio.
- Las reglas de permisos se evalúan **deny → ask → allow** y gana la primera que coincide.
- Un `.claudeignore` no tiene efecto: se usan reglas de deny de `Read`.

## Revisión semanal

Claude Code se actualiza seguido. Una vez por semana:

1. Releer las páginas de la tabla y comparar con cada lección: nombres de comandos, archivos, campos de frontmatter, atajos y modos.
2. Corregir lo que cambió y actualizar la fecha de "Verificado…" al final de cada lección tocada y la de este archivo.
3. Si aparece algo nuevo e importante, proponer una lección.
4. Correr `npm test` y `npm run build`, commitear y verificar que el deploy de Render quede `live`.
