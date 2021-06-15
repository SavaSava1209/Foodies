import './Navigation.css';
import React from "react";
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";




const Navigation = ({isLogin, signout,toggleModal}) => {
  return (
      <Navbar bg="light" expand="lg" className='pa3'>
      <Link to='/' className='link'> <Navbar.Brand >Foodies</Navbar.Brand></Link>    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          { isLogin ? 
             <Nav.Link as={Link} to='/' onClick={signout}>Sign out</Nav.Link> 
             :
             <Nav.Link as={Link} to='/register'>Register</Nav.Link> 
          } 
          { isLogin ?
            <NavDropdown title="Explore" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={toggleModal}>Profile</NavDropdown.Item>                              
              <NavDropdown.Item as={Link} to='/savedrecipes'>Saved Recipes</NavDropdown.Item>
              <NavDropdown.Divider />               
              <NavDropdown.Item as={Link} to='/foodlist'>Check Ingredients </NavDropdown.Item> 
              <NavDropdown.Item as={Link} to='/recommendrecipes'>Check Recipes </NavDropdown.Item>
            </NavDropdown>
            :
            <NavDropdown title="Explore" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/signin'>Sign in</NavDropdown.Item>
              <NavDropdown.Divider />               
              <NavDropdown.Item as={Link} to='/foodlist'>Check Ingredients </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/recommendrecipes'>Check Recipes </NavDropdown.Item>
            </NavDropdown>
          }
          </Nav>

      {/*<Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        </Form>*/}
        </Navbar.Collapse>
      </Navbar>
  )

}

export default Navigation;
