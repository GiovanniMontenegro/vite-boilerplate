import { createFileRoute } from '@tanstack/react-router'
import type { JSX } from 'react'

function RouteComponent(): JSX.Element {
  return <div>Hello "/prova"!</div>
}

export const Route = createFileRoute('/prova')({
  component: RouteComponent,
})


