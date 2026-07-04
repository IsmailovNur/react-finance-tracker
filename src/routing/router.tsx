import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import { AppRoutes } from "./routes.ts";
import MainLayout from "../pages/MainLayout/MainLayout.tsx";
import CategoryFormPage from "../pages/CategoryFormPage/CategoryFormPage.tsx";
import TransactionFormPage
  from "../pages/CreateTransactionPage/TransactionFormPage.tsx";
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
        element: <CategoryFormPage />,
      },
      {
        path: AppRoutes.editCategory,
        element: <CategoryFormPage />,
      },
      {
        path: AppRoutes.createTransaction,
        element: <TransactionFormPage />,
      },
      {
        path: AppRoutes.editTransaction,
        element: <TransactionFormPage />,
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
