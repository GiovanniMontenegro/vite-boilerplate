/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProvaRouteImport } from './routes/prova/route'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ProvaRouteRoute = ProvaRouteImport.update({
  id: '/prova',
  path: '/prova',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/prova': {
      id: '/prova'
      path: '/prova'
      fullPath: '/prova'
      preLoaderRoute: typeof ProvaRouteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/prova': typeof ProvaRouteRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/prova': typeof ProvaRouteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/prova': typeof ProvaRouteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/prova'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/prova'
  id: '__root__' | '/' | '/prova'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProvaRouteRoute: typeof ProvaRouteRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProvaRouteRoute: ProvaRouteRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.ts",
      "children": [
        "/",
        "/prova"
      ]
    },
    "/": {
      "filePath": "index.ts"
    },
    "/prova": {
      "filePath": "prova/route.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
