/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, LoaderFunctionArgs } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store.ts';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';  // Import your global CSS styles

// Import Components
import RootLayout from './RootLayout.tsx';
import Index from './features/flights/Index.tsx';
import ErrorPage from './common/components/ErrorPage.tsx';
import LoginForm from './features/auth/LoginForm.tsx';
import RegisterForm from './features/auth/RegistrationForm.tsx';

// Lazy-loaded Components
const AddFlight = React.lazy(() => import('./features/flights/AddFlight.tsx'))
const EditFlight = React.lazy(() => import('./features/flights/EditFlight.tsx'))
const ViewFlight = React.lazy(() => import('./features/flights/ViewFlight.tsx'))

// Loader function to handle invalid flight ID
const FlightParamHandler = ({ params }: LoaderFunctionArgs<{ id: string }>) => {
  if (params.id && isNaN(+params.id)) {
    throw new Response("Bad Request", { statusText: 'Please make sure that this is a right URL', status: 400 });
  }
  return null;
}
// Route Configuration
const routes = [
  { index: true, element: <Index /> },
  { path: '/', element: <Index /> },
  { path: 'flight/addFlight', element: <Suspense fallback={<div>Loading...</div>}><AddFlight /></Suspense> },
  {
    path: 'flight/:id/edit',
    element: <Suspense fallback={<div>Loading...</div>}><EditFlight /></Suspense>,
    loader: FlightParamHandler
  },
  {
    path: '/flight/:id',
    element: <Suspense fallback={<div>Loading...</div>}><ViewFlight /></Suspense>,
    loader: FlightParamHandler
  },
  { path: 'register', element: <RegisterForm /> },
  { path: 'login', element: <LoginForm /> },
];


// Router Configuration
const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: routes,
}]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
