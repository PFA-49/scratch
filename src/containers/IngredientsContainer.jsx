import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createlist } from '../reducers/recipeListSlice';
import IngredientChoice from '../components/IngredientChoice';

const IngredientsContainer = () => {
  const [selectedIngredient, setSelectedIngredientState] = useState('');
  const dispatch = useDispatch();

  const getRecipeList = async () => {
    const URL = `/api/get?ingredient= ${selectedIngredient}`;
    try {
      const response = await fetch(URL);
      const recipeList = await response.json();
      console.log(recipeList);
      dispatch(createlist(recipeList));
      return;
    } catch (error) {
      throw new Error(error);
    }
  };

  //   const getRecipeList = () => {

  //     const URL = `/api/get?ingredient= ${choiceIngredient}`

  //     const response = fetch(URL)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       const recipeList = data;
  //       console.log(recipeList);
  //       dispatch(createlist(data));
  //     });
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    getRecipeList();
  };

  const ingredientChoiceList = ['potato', 'egg', 'bacon', 'flour', 'garlic'];

  return (
    <div
      className='IngredientsContainer absolute bottom-9 left-24 m-6 p-2 text-3xl'
      style={{ left: '135px' }}
    >
      <form className='justify-between' onSubmit={handleSubmit}>
        <div
          className='flex flex-col border-4 border-green p-20 rounded-lg shadow-xl'
          style={{ height: 'calc(100vh - 315px)' }}
        >
          {ingredientChoiceList.map((choice, index) => (
            <IngredientChoice
              className='text-gray-400 mb-10'
              id={'option' + index}
              key={index}
              choice={choice}
              value={choice}
              selectedIngredient={selectedIngredient}
              setSelectedIngredientState={setSelectedIngredientState}
            />
          ))}
          <button className='text-xl' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngredientsContainer;
