import './Ingredient.css';
import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ingredient from '../../img/ingredient.jpg';
import FoodList from '../FoodList/FoodList';


function Ingredient(props) {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');  
  const [ingredientArray, setIngredientArray] = useState([]);
  const [isInputValid, setIsInputValid] = useState(false);

  const onInputChange = (event) => {    
    setInput(event.target.value)
  };
  
  const onPhotoSubmit = (event) => {
    if (props.isLogin) {
      if (input.length > 0 ) {
      setImageUrl(input)
      fetch('https://warm-reef-43761.herokuapp.com/image', {
        method: 'post',
        headers: {        
          'Content-Type': 'application/json',
          'authorization': window.localStorage.getItem('token')
        },
        body: JSON.stringify({
          url: input
        })
      })
      .then(resp => resp.json())
      .then(response => { 
        if (response === 'failed' || response === 'Error') {
          setIsInputValid(false);
          setIngredientArray([])
        } else {
          setIsInputValid(true);
          setIngredientArray(response)
        }
      })
      .catch(err => console.log(err, 'unable to fetch clairifai API'))
      }
    } else {
      alert( 'Please log in to use the function')
    }
    
    
  }

  return (   
    <div>
      <div className='searchBar'>
      <div className='title'>
        <img src={ingredient} alt='ingredient' style={{width: '150px', height: '100px', border: 'none' }}/> 
        <h2>Check Ingredient</h2>
      </div>
      <InputGroup className="mb-3 w-70 center" >
        <InputGroup.Prepend >
          <InputGroup.Text id="inputGroup-sizing-default">Image Link</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='paste URL or image file'
          onChange={onInputChange}
        />
        <InputGroup.Append>
          <Button 
            onClick={onPhotoSubmit} variant="outline-secondary">Check</Button>
        </InputGroup.Append>
      </InputGroup>
      </div>
       { isInputValid ? 
                <FoodList imgUrl={imageUrl} ingredientArray={ingredientArray}  />
                : null
              }
     </div>

    
   
  );
}

export default Ingredient;
