import './Register.css';
import pinkMug from '../../img/pink-mug.png';
import laurelWreath from '../../img/laurel-wreath.png';
import { useState } from 'react';
import { useHistory  } from "react-router-dom";



const Register = ({ loadUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const history = useHistory()

  const onRegisterSubmit = (event) => {
 
    if (email.length > 0 && password.length > 0 && username.length > 0 ) {
    fetch('https://warm-reef-43761.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'Application/json' },
      body:  JSON.stringify({
        email: email,
        password: password,
        username: username
      }) 
    })
    .then(resp => resp.json())
    .then(data => {
      if (data[0].user_id) {
        window.localStorage.setItem('token', data[1] )
        loadUser(data[0]); 
        history.push('/')        
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
                    <img alt='coverphoto' src={pinkMug} className="image" style={{ border: 'none'}}/> 
                  </div>
              </div>
            </div>
            <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-5 " style={{alignContent: 'center'}}>
                    <div className="row mb-4 px-3">
                        <h6 className="mb-0 mr-4 mt-2">Register</h6>                     
                    </div>
                    <div className="row px-3 mb-4">
                        <div className="line"></div> 
                        <div className="line"></div>
                    </div>
                    <div className="row px-3"> 
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm tl">User Name</h6>
                      </label> 
                      <input 
                        onChange={(event) => setUsername(event.target.value) }
                        className="mb-4" type="text" name="username" placeholder="Enter username" /> 
                    </div>
                    <div className="row px-3"> 
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm tl">Email Address</h6>
                      </label> 
                      <input 
                        onChange={(event) => setEmail(event.target.value) }
                        className="mb-4" type="text" name="email" placeholder="Enter a valid email address"/> 
                    </div>
                    <div className="row px-3"> 
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm tl">Password</h6>
                      </label> 
                      <input 
                        onChange={(event) => setPassword(event.target.value) }
                        type="password" name="password" placeholder="Enter password" /> 
                    </div>                    
                    <div className="row mb-3 px-3 mt-3">  
                      <button 
                        onClick={ onRegisterSubmit }
                        type="submit" className="btn btn-blue text-center">Register
                      </button> 
                    </div>
                    <div className="row mb-4 px-3"> 
                      <small className="font-weight-bold d-flex justify-content-start ">Already have an account? 
                        <a href='/signin' className="text-danger ">Sign In</a>
                      </small> 
                    </div>
                </div>
            </div>
        </div>
       
      </div>
    </div>
  )
};


export default Register