import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'

const Catalog = lazy(() => import("./pages/Catalog/Cotalog.tsx"));
const Lesson = lazy(() => import("./pages/Lesson/Lesson.tsx"));
const Test = lazy(() => import("./pages/Test/Test.tsx"));

import Error from "./pages/Error/Error.tsx";

import LoadingStatus from './components/LoadingStatus/';

import { Provider } from 'react-redux';
import { store } from "./stores/storeTest.ts";

const router = createHashRouter([
  {
    path: "/",
    element: <Suspense fallback={<LoadingStatus />}><Catalog /></Suspense>,
    errorElement: <Error />,
  },
  {
    path: "/lesson/:id",
    element: <Suspense fallback={<LoadingStatus />}><Lesson /></Suspense>,
    errorElement: <Error />
  },
  {
    path: "/test",
    element: <Suspense fallback={<LoadingStatus />}><Test /></Suspense>,
    errorElement: <Error />
  }
], {})

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>,
)
