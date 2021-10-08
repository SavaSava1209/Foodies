import './RecommendRecipe.css'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import recipe from '../../img/recipe.png';



function RecommendRecipe({ user, loadUser, isLogin }) {
  const [foodName, setFoodName] = useState('');
  const [recipesArray, setRecipesArray] = useState([])
  const [heart, setHeart] = useState([])
  

 

  const onInputChange = (event) => {    
    setFoodName(event.target.value)
  }

  const onBottonSubmit = () => {   
    if (isLogin) {
       fetch('https://warm-reef-43761.herokuapp.com/recipes', {
          method: 'post',
          headers: { 
            'Content-Type': 'application/json',
            'authorization': window.localStorage.getItem('token')
          },
          body: JSON.stringify({
            foodName: foodName
          })
        })
        .then(resp => resp.json())
        .then(recipes => {          
          if (recipes.results.length > 0) { 
            setRecipesArray(recipes.results) 
          } else {
            setRecipesArray([])
          }             
        })
        .catch(err=> console.log(err))    
    } else {
      alert('Please log in to use this function')
    }
  }

  const favoriteButton = (recipe) => {   
    setHeart([...heart, recipe.id])
    console.log(heart)
    fetch(`https://warm-reef-43761.herokuapp.com/saved_recipes/${user.user_id}`, {
      method: 'post',
      headers: { 
        'Content-Type': 'application/json',
        'authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        recipe_id: recipe.id,
        url: recipe.sourceUrl,
        title: recipe.title,
        image: recipe.image
      })
    })
    .then(resp => resp.json())
    .then(data => {
    if (data === 'exist') {
      alert('reciped added')
    } 
      loadUser({...user, ...data})
    })
    .catch(console.log)
  }

  return (
    <div>
      <div className='searhBar'>
        <div className='title flex'>
          <img src={recipe} alt='recipe' style={{width: '100px', border: 'none'}}/>
          <h2>Check Recipes</h2>  
            
        </div>
        <InputGroup className="mb-3 w-70 center" >
          <InputGroup.Prepend >
            <InputGroup.Text id="inputGroup-sizing-default">Food Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={onInputChange}
          />
          <InputGroup.Append>
            <Button 
              onClick={onBottonSubmit} variant="outline-secondary">Check</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>     
      
      {
        recipesArray.length > 0 &&
          recipesArray.map(recipe => {
            return (
              <div className='box' key={recipe.id}>
                <div className="responsive">
                  <div className="gallery">
                    <a target="_blank" href={recipe.sourceUrl} rel="noreferrer">
                      <img src={recipe.image} rel="noreferrer" alt="Recipes " width="600" height="auto" />
                    </a>          
                    <div className="desc">{recipe.title}</div>
                    <div>
                      <button type="button" className="btn btn-outline-danger mb2" name='favorite' 
                        onClick={() => favoriteButton(recipe)}>        
                           {heart.includes(recipe.id)? <AiFillHeart /> : <AiOutlineHeart />}          
                      </button>                     
                    </div>
                  </div>
                </div>
              </div>
            )
          })        
      }
   </div>
  );
}


export default RecommendRecipe;
