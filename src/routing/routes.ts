export const AppRoutes = {
  main: '/',
  createCategory: '/category-create',
  editCategory: '/category-edit/:id',
  createTransaction: '/create-transaction',
  categories: '/categories',
  notFound: '*',
} as const;