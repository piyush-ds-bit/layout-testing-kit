
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { SkillCategory } from '@/types/database';

interface CategoryListProps {
  categories: SkillCategory[];
  selectedCategory: string | null;
  setSelectedCategory: (id: string) => void;
  handleDeleteCategory: (id: string) => void;
  addingCategory: boolean;
  setAddingCategory: (adding: boolean) => void;
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  handleAddCategory: (e: React.FormEvent) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  handleDeleteCategory,
  addingCategory,
  setAddingCategory,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-white">Skill Categories</h2>
        <Button 
          onClick={() => setAddingCategory(!addingCategory)} 
          size="sm"
          className="bg-portfolio-accent hover:bg-portfolio-accent-dark text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </Button>
      </div>
      
      {addingCategory && (
        <form onSubmit={handleAddCategory} className="mb-4 flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="portfolio-input flex-1"
            placeholder="Category name"
            required
          />
          <Button type="submit" className="bg-portfolio-accent text-white">Add</Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setAddingCategory(false)}
            className="border-portfolio-dark text-portfolio-gray-light"
          >
            Cancel
          </Button>
        </form>
      )}
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-portfolio-accent text-white'
                  : 'bg-portfolio-card-bg text-portfolio-gray-light hover:bg-portfolio-darker'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
            
            <button 
              onClick={() => handleDeleteCategory(category.id)}
              className="ml-1 p-1 text-red-500 hover:text-red-400 rounded-full hover:bg-red-500/10"
              title="Delete category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
