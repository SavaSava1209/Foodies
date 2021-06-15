import { useState } from 'react';

import './Signin.css';
import pinkMug from '../../img/pink-mug.png';
import laurelWreath from '../../img/laurel-wreath.png';
import { useHistory  } from "react-router-dom";


const Signin = ({loadUser, isLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory()


  

  const saveAuthToken = (token) => {
    window.localStorage.setItem("token", token)
  }

  const onSigninSubmit = () => {
    if (email.length > 0 && password.length > 0 ) {
      fetch('https://warm-reef-43761.herokuapp.com/signin', {
        method: 'post',
        headers: { 'content-type': 'Application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        }) 
      })
      .then(resp => resp.json())
      .then(user => {
        if (user.userId && user.success === 'true') {
          saveAuthToken(user.token)         
          fetch(`https://warm-reef-43761.herokuapp.com/profile/${user.userId}`, {
            method: 'get',
            headers: { 
              'Content-Type': 'application/json',
              'authorization': user.token
            }
          })
          .then(resp => resp.json())
          .then(user => {            
            loadUser(user)
            history.push('/')
          })
          .catch(err => console.log('unable to save token'))
        }
      })
      .catch(err => console.log(err))
    }
  }

  return(   
    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="card card0 border-0" >
        <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                  <div className="row"> 
                    <img alt='logo' src={laurelWreath} className="logo" style={{ border: 'none'}} /> 
                  </div>
                  <div className="row px-3 justify-content-center mt-4 mb-5 border-line" > 
                    <img alt='signin' src={pinkMug} className="image" style={{ border: 'none'}}/> 
                  </div>
              </div>
            </div>
            <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-5 " style={{alignContent: 'center'}}>
                    <div className="row mb-4 px-3">
                        <h6 className="mb-0 mr-4 mt-2">Sign In</h6>                      
                    </div>
                    <div className="row px-3 mb-4">
                        <div className="line"></div> 
                        <div className="line"></div>
                    </div>
                    <div className="row px-3"> 
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm tl">Email Address</h6>
                      </label> 
                      <input 
                        onChange={(event)=> setEmail(event.target.value)} 
                        className="mb-4" type="text" name="email" placeholder="Enter a valid email address"/>                       
                    </div>
                    <div className="row px-3"> 
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm tl">Password</h6>
                      </label> 
                      <input
                        onChange={(event) => setPassword(event.target.value)} 
                        type="password" name="password" placeholder="Enter password" /> 
                    </div>
                    <div className="row px-3 mb-4">
                        <a href="#0" className="col-sm ml-auto mb-0 text-sm d-flex justify-content-start">Forgot Password?</a>
                    </div>
                    <div className="row mb-3 px-3"> 
                      <button 
                        onClick={ onSigninSubmit }
                        type="submit" className="btn btn-blue text-center">Login</button> 
                    </div>
                    <div className="row mb-4 px-3"> 
                      <small className="font-weight-bold d-flex justify-content-start ">Don't have an account? 
                        <a href='/register' className="text-danger ">Register</a>
                      </small> 
                    </div>
                </div>
            </div>
        </div>
       
      </div>
    </div>
  )
};


export default Signin;