import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import ingredientSlide from '../../img/ingredient-slide.jpg';
import recipeSlide from '../../img/recipe-slide.jpg';
import './Slide.css'




const Slide = () => {
  return (    
    <Carousel >
      <Carousel.Item className='bg-pink slide'  >     
          <Link to='/recommendrecipes'>   
            <img className="d-block w-60 center "  src={recipeSlide} alt="Check Recipes"/>
              <Carousel.Caption className='br3 w-60 center caption' style={{backgroundColor: 'lightblue'}}>
                <h3>Check Recipes</h3>
                <p>Find recipes that makes you happy</p>
              </Carousel.Caption>            
          </Link>
  
      </Carousel.Item>

      <Carousel.Item className='bg-pink slide' >
       <Link to='/foodlist'>
          <img className="d-block w-60 center" src={ingredientSlide} alt="Check Ingredients"/>
          <Carousel.Caption className='br3 w-60 center caption' style={{backgroundColor: 'lightblue'}}>
            <h3>Check Ingredient</h3>
            <p>Simply paste the image URL to find out the ingredients</p>
          </Carousel.Caption>
        </Link>
        </Carousel.Item>
      </Carousel>
  )

}

export default Slide;
