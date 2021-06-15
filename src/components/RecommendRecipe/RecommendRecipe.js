import './RecommendRecipe.css'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import recipe from '../../img/recipe.png';


function RecommendRecipe({ user, loadUser, isLogin }) {
  const [foodName, setFoodName] = useState('');
  const [recipesArray, setRecipesArray] = useState([])
 

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
                      onClick={() => favoriteButton(recipe )}>
                      Add to facorite 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart ml2" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
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
