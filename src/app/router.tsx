import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react'

// Router mínimo basado en la History API.
// useSyncExternalStore lee la URL como un "store" externo a React. En el servidor no hay
// `location`, así que el tercer argumento devuelve la ruta que se está prerenderizando.

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  addEventListener('popstate', listener)
  return () => {
    listeners.delete(listener)
    removeEventListener('popstate', listener)
  }
}

export function navigate(href: string) {
  history.pushState(null, '', href)
  scrollTo(0, 0)
  listeners.forEach(listener => listener())
}

export function usePathname(serverPathname: string) {
  return useSyncExternalStore(subscribe, () => location.pathname, () => serverPathname)
}

// Un <a> común: sin JavaScript (o con Ctrl/Cmd+clic) se comporta como un link normal.
export function Link({ href, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(href)
  }
  return <a href={href} onClick={handleClick} {...props} />
}
