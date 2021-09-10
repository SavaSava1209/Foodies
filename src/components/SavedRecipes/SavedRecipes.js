import './SavedRecipes.css';
import { useState, useEffect } from 'react';



function SavedRecipes({user, loadUser}) {
  const [savedRecipes, setSavedRecipes] = useState([])
  
  useEffect(() => {
    fetch(`https://warm-reef-43761.herokuapp.com/saved_recipes/${user.user_id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'authorization': window.localStorage.getItem('token')
      } 
    })
    .then(resp=> resp.json())
    .then(recipes => {
      setSavedRecipes(recipes)      
    })
    .catch(console.log)
  },[user.recipes_number])

  

 

  const textAreaSubmit = (event, recipe_id) => {  
      event.preventDefault();        
      const note = document.getElementById(recipe_id)    
      fetch(`https://warm-reef-43761.herokuapp.com/saved_recipes/${user.user_id}`, {
        method: 'put',
        headers: { 
          'content-type': 'Application/json',
          'authorization': window.localStorage.getItem('token')
        },
        body: JSON.stringify({
          recipe_id: recipe_id,
          note: note.value
          })
        })
      .then(resp => resp.json())
      .catch(err => console.log('can not save note'))
     
};
  const deleteRecipe = (e, recipe_id) => {     
    e.preventDefault()
    fetch(`https://warm-reef-43761.herokuapp.com/saved_recipes/${user.user_id}`, {
        method: 'delete',
        headers: { 
          'content-type': 'Application/json',
          'authorization': window.localStorage.getItem('token')
        },
        body: JSON.stringify({
          recipe_id: recipe_id          
          })
        })
      .then(resp => resp.json()) 
      .then(data => { 
        if (data) {          
           fetch(`https://warm-reef-43761.herokuapp.com/profile/${user.user_id}`, {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json',
                'authorization': window.localStorage.getItem('token')
              }              
            })
           .then(resp => resp.json())
           .then(data => {

             loadUser(data)            
           })
           .catch(err => console.log(err))
        }
      })     
      .catch(err => {
        if (err === 'unauthorized') {
          console.log(err)
        }
      })
  }

  return (
    <div className='ma3' >
    
      <table  id='recipes'>
        <tbody>
          <tr>
            <th>Food Name</th>
            <th>Picture</th>
            <th>Note</th>
            <th>Delete</th>
          </tr>
        </tbody>
        {console.log(savedRecipes)}
        { savedRecipes.map( recipe => {
          return (
            <tbody key={recipe.recipe_id}>            
              <tr>
                <td><a href={recipe.url}> {recipe.title} </a></td>              
                <td width='20%'><img alt='recipe' src={recipe.image} style={{width: '70%'}}/></td>
                <td>
                  <textarea id={recipe.recipe_id} defaultValue={recipe.note} />                       
                  <button className='button' onClick={(e) => textAreaSubmit(e, recipe.recipe_id)} 
                    style={{float: "right"}} >
                  Save</button>                
                </td>
                <td>
                  <button className='button' onClick={ (e) => deleteRecipe(e, recipe.recipe_id) } >delete</button>
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
 
}


export default SavedRecipes;
