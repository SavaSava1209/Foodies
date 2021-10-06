import './App.css';
import React, { useState, useEffect , Suspense} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Slide from './components/Slide/Slide';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import Ingredient from './components/Ingredient/Ingredient';
import RecommendRecipe from'./components/RecommendRecipe/RecommendRecipe' ;
import Register from'./components/Register/Register';
import Signin from'./components/Signin/Signin' ;
import SavedRecipes from './components/SavedRecipes/SavedRecipes' ;




const initialState = {  
  isLogin: false,
  user: {
    email: '',
    username: '',
    create_on: '',  
    user_id: '',
    dob: '',
    recipes_number: ''
  }
}



function App() {
  const [ user, setUser ] = useState(initialState);
  const [ isProfileOpen, setIsProfileOpen] = useState(false); 


  useEffect(() => {          
    const token = window.localStorage.getItem('token')
    if (token) {      
      return fetch('https://warm-reef-43761.herokuapp.com/signin', {
        method: 'post',
        headers: { 
          'content-type': 'Application/json',
          'authorization': token
        }       
      })
      .then(resp => resp.json())
      .then(data => {         
        if (data.id) {         
          return fetch(`https://warm-reef-43761.herokuapp.com/profile/${data.id}`, {
            method: 'get',
            headers: { 
              'Content-Type': 'application/json',
              'authorization': token
            }
          })
          .then(resp => resp.json())
          .then(user => { 
            loadUser(user)            
          })
          .catch(err => console.log('unable to refresh'))
        }
      })
      .catch(console.log)
    }
  }, [])

  const loadUser = (data) => {    
      setUser({
        isLogin: true,
        user: {
          email: data.email,
          username: data.username,
          create_on: data.create_on,
          user_id: data.user_id,
          dob: data.dob,
          recipes_number: data.recipes_number
        }
    });    
  }


  
  const signout = (event) => {   
    setUser(initialState) 
    window.localStorage.removeItem('token') 
   
  }

  const toggleModal = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  
  return (

    <div className="App">
        <Router basename='/Foodies'>  
          <Navigation 
            isLogin={user.isLogin} signout={signout} toggleModal={toggleModal}/>             
          { isProfileOpen && 
            <Modal>
              <Profile  toggleModal={toggleModal} user={user.user} loadUser={loadUser}/>
            </Modal>
          }
          <Switch>           
            <Route path='/' exact component = {Slide} />
            <Route path='/register' >
              <Register loadUser={loadUser} /> 
            </Route>
            <Route path='/signin'>
              <Signin loadUser={loadUser} />
            </Route>
            <Route path='/foodlist' >
              <Ingredient isLogin={user.isLogin}/>
            </Route>           
            <Route path='/recommendrecipes' >
              <RecommendRecipe user={user.user} loadUser={loadUser} isLogin={user.isLogin} />
            </Route> 
             <Route path='/savedrecipes' >
              <SavedRecipes user={user.user} loadUser={loadUser}/> 
            </Route>
          </Switch>
         
          </Router>  
        
    </div>
  );
}

export default App;
