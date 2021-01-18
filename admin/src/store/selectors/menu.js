const isMenuLoading = (state) => state.menu.isMenuLoading
const menu = (state) => state.menu.menu
const menuCategories = (state) => state.menu.menu.categories

const categoryById = (categoryId) => (state) =>
  state.menu.menu.categories.find((category) => category.id === categoryId)
const selectedCategoryId = (state) => state.menu.selectedCategoryId

export default { isMenuLoading, menu, menuCategories, categoryById, selectedCategoryId }