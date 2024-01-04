import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class MenuExampleInverted extends Component {
  state = { activeItem: 'Customer' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        
        <Menu.Item
          as={NavLink} to="/"
          name='Customer'
          active={activeItem === 'Customer'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/Product"
          name='Product'
          active={activeItem === 'Product'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          as={NavLink} to="/Store"
          name='Store'
          active={activeItem === 'Store'}
          onClick={this.handleItemClick}
        />
         <Menu.Item
          as={NavLink} to="/Sale"
          name='Sale'
          active={activeItem === 'Sale'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}


// import React from 'react';
// import {  Link } from "react-router-dom";

// const Navbar= () =>{
//   return (
//   <div className='Navbar'>
//     <div className='Customer'>
//       <Link to="/">Customer</Link>
//     </div>
//     <div className='Product'>
//       <Link to="/Product">Product</Link>
//     </div>
   
//   </div>
//   );
// }
// export default Navbar;