import React from "react";


interface Category {
  slug: string;
  name: string;
  url: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onChange }) => (
  <div style={{ margin: '1rem 0 2rem 0', textAlign: 'right' }}>
    <label htmlFor="category-filter" style={{ marginRight: 8, fontWeight: 700 }}>Filter by Category:</label>
    <select
      id="category-filter"
      value={selectedCategory}
      onChange={e => onChange(e.target.value)}
      style={{ padding: '0.4rem 1rem', borderRadius: 6, border: '1px solid #1976d2', fontWeight: 500 }}
    >
      <option value="all">All</option>
      {categories.map(cat => (
        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
      ))}
    </select>
  </div>
);

export default CategoryFilter;
