export const AppRoutes = {
  main: '/',
  createCategory: '/category-create',
  editCategory: '/category-edit/:id',
  createTransaction: '/create-transaction',
  editTransaction: '/edit-transaction/:id',
  categories: '/categories',
  notFound: '*',
} as const;