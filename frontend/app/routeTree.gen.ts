/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CallbackImport } from './routes/callback'
import { Route as IndexImport } from './routes/index'
import { Route as ProjectProjectIdImport } from './routes/project/$projectId'
import { Route as ProjectMoodboardMoodboardIdImport } from './routes/project/moodboard/$moodboardId'

// Create/Update Routes

const CallbackRoute = CallbackImport.update({
  id: '/callback',
  path: '/callback',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProjectProjectIdRoute = ProjectProjectIdImport.update({
  id: '/project/$projectId',
  path: '/project/$projectId',
  getParentRoute: () => rootRoute,
} as any)

const ProjectMoodboardMoodboardIdRoute =
  ProjectMoodboardMoodboardIdImport.update({
    id: '/project/moodboard/$moodboardId',
    path: '/project/moodboard/$moodboardId',
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
    '/callback': {
      id: '/callback'
      path: '/callback'
      fullPath: '/callback'
      preLoaderRoute: typeof CallbackImport
      parentRoute: typeof rootRoute
    }
    '/project/$projectId': {
      id: '/project/$projectId'
      path: '/project/$projectId'
      fullPath: '/project/$projectId'
      preLoaderRoute: typeof ProjectProjectIdImport
      parentRoute: typeof rootRoute
    }
    '/project/moodboard/$moodboardId': {
      id: '/project/moodboard/$moodboardId'
      path: '/project/moodboard/$moodboardId'
      fullPath: '/project/moodboard/$moodboardId'
      preLoaderRoute: typeof ProjectMoodboardMoodboardIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/callback': typeof CallbackRoute
  '/project/$projectId': typeof ProjectProjectIdRoute
  '/project/moodboard/$moodboardId': typeof ProjectMoodboardMoodboardIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/callback': typeof CallbackRoute
  '/project/$projectId': typeof ProjectProjectIdRoute
  '/project/moodboard/$moodboardId': typeof ProjectMoodboardMoodboardIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/callback': typeof CallbackRoute
  '/project/$projectId': typeof ProjectProjectIdRoute
  '/project/moodboard/$moodboardId': typeof ProjectMoodboardMoodboardIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/callback'
    | '/project/$projectId'
    | '/project/moodboard/$moodboardId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/callback'
    | '/project/$projectId'
    | '/project/moodboard/$moodboardId'
  id:
    | '__root__'
    | '/'
    | '/callback'
    | '/project/$projectId'
    | '/project/moodboard/$moodboardId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CallbackRoute: typeof CallbackRoute
  ProjectProjectIdRoute: typeof ProjectProjectIdRoute
  ProjectMoodboardMoodboardIdRoute: typeof ProjectMoodboardMoodboardIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CallbackRoute: CallbackRoute,
  ProjectProjectIdRoute: ProjectProjectIdRoute,
  ProjectMoodboardMoodboardIdRoute: ProjectMoodboardMoodboardIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/callback",
        "/project/$projectId",
        "/project/moodboard/$moodboardId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/callback": {
      "filePath": "callback.tsx"
    },
    "/project/$projectId": {
      "filePath": "project/$projectId.tsx"
    },
    "/project/moodboard/$moodboardId": {
      "filePath": "project/moodboard/$moodboardId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
