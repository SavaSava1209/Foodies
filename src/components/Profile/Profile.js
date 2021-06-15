import Button from 'react-bootstrap/Button';

import { useState } from 'react'; 
import './Profile.css'


function Profile({ toggleModal, user, loadUser }) {
  const [ username, setUsername ] = useState(user.username);
  const [ dob, setDob ] = useState(user.dob) 
  
  const onInputChange = (event) => {
    
    switch (event.target.name) {
      case 'username': 
        setUsername(event.target.value)
        break
      case 'date':
        setDob(event.target.value)        
        break
      default: 
        return

    }
  } 
  const onEditButton = () => {
    setDob(null)
  
  }

  const onSaveSubmit = (data) => {
    fetch(`https://warm-reef-43761.herokuapp.com/profile/${user.user_id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify({ formUpdate: data
      })
    })
    .then(resp => resp.json())
    .then(data => {
      loadUser({...user, ...data})
      toggleModal()

    })
    .catch(err => console.log(err))
  }

 
  return (  
    <div className='modal'> 
      <div className="col-md-8"> 
        <div className="card mb-3">
          <div className="card-body">           
            <div className="row">              
              <div className="col-sm-11" >              
              </div>
              <div className="col-sm-1 mb-3">
                <Button onClick={toggleModal} variant="info" size='sm'>x</Button>
              </div>
            </div>         
            <div className="row">
              <div className="col-sm-3 align-self-center">
                <h6 className="mb-0">Username</h6>
              </div>
              <div className="col-sm-7">
                <input onChange={onInputChange} name='username' placeholder={user.username}/>
              </div>
              
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3 align-self-center">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 ">
                <h6> {user.email} </h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3 align-self-center">
                <h6 className="mb-0">Date of Birth</h6>
              </div>
              { dob === undefined || dob === null ?
                <div className="col-sm-9  align-self-center">
                  <input type='date' name='date' onChange={onInputChange} />
                </div>
                :
                <>
                  <div className="col-sm-7 align-self-center">
                    <h6>{new Date(dob).toLocaleDateString()}</h6> 
                  </div>
                  <div className="col-sm-2">
                   <Button variant="info" onClick={onEditButton}>Edit</Button>
                  </div>
                </>
              }
              
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3" >
                <h6 className="mb-0">Saved Recipes</h6>
              </div>
              <div className="col-sm-9 ">
                {user.recipes_number}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Register on</h6>
              </div>
              <div className="col-sm-9 ">
                {new Date(user.create_on).toLocaleDateString()}
              </div>
            </div>
           
            <hr />
            <div className="row">
              <div className="col-sm-12">
                <button className="btn btn-info ma2" onClick={() => onSaveSubmit({username, dob})}>Save</button>
                <button className="btn btn-info ma2 " onClick={toggleModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
