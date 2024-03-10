import React, { useState, useEffect } from 'react';
import './DishSuggester.css';

interface Dish {
  name: string;
  ingredients: string[];
  state: string;
}

interface DishSuggesterProps {
  allDishes: Dish[];
  selectedIngredients: string[];
}

const DishSuggester: React.FC<DishSuggesterProps> = ({ allDishes, selectedIngredients }) => {
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const filteredDishes = allDishes.filter((dish) =>
    dish.ingredients.every((ingredient) => selectedIngredients.includes(ingredient))
    );
    setFilteredDishes(filteredDishes);
  }, [allDishes, selectedIngredients]);

  return (
    <div>
     <div className="matching-dishes">
       
      <ul>
       
        {filteredDishes.map((dish) => (
          <li key={dish.name}>
            <strong>{dish.name}</strong> - {dish.state}
          </li>
        ))}
      </ul>
     </div>
    </div>
  );
};

export default DishSuggester;
