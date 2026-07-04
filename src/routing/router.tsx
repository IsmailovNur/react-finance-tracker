import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import { AppRoutes } from "./routes.ts";
import MainLayout from "../pages/MainLayout/MainLayout.tsx";
import CreateCategoryPage
  from "../pages/CreateCategoryPage/CreateCategoryPage.tsx";
import CreateTransactionPage
  from "../pages/CreateTransactionPage/CreateTransactionPage.tsx";
import CategoriesPage from "../pages/CategoriesPage/CategoriesPage.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.main,
        element: <MainPage />,
      },
      {
        path: AppRoutes.createCategory,
        element: <CreateCategoryPage />,
      },
      {
        path: AppRoutes.createTransaction,
        element: <CreateTransactionPage />,
      },
      {
        path: AppRoutes.categories,
        element: <CategoriesPage />,
      },
      {
        path: AppRoutes.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
]);
