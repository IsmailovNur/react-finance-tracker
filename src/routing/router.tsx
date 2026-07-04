import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import { AppRoutes } from "./routes.ts";
import MainLayout from "../pages/MainLayout/MainLayout.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.main,
        element: <MainPage />,
      },
      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
]);
