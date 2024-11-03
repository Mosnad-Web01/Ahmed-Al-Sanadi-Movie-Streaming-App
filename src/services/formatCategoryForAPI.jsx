 // /services/formatCategoryForAPI.jsx
 export const formatCategoryForAPI = (category) => {
    return category.replace(/-/g, '_').toLowerCase();
  };