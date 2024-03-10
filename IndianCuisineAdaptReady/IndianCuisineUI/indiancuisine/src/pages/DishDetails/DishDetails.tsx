import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './DishDetails.css'

export const DishDetails = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const [dish, setDish] = useState<any>();

    useEffect(() => {
        let dishSelected = state.data.filter((item: any) => {
            return item.name === id
        })
        setDish(dishSelected[0])

    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '32px' }}>
                <Link to='/'>Back</Link>
                <h2>Dish Details Page</h2>
                <span></span>
            </div>

            {dish &&
                <div className="dish-card">
                    <div className="dish-details">
                        <h3 className="dish-name">{dish.name}</h3>
                        <p className="dish-ingredients">Ingredients: {dish.ingredients.join(', ')}</p>
                        <p className="dish-ingredients">Cook Time: {dish.cook_time}</p>
                        <p className="dish-ingredients">course: {dish.course}</p>
                        <p className="dish-ingredients">diet: {dish.diet}</p>
                        <p className="dish-ingredients">state: {dish.state}</p>
                        <p className="dish-ingredients">prep_time: {dish.prep_time}</p>
                        <p className="dish-ingredients">region: {dish.region}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default DishDetails;
