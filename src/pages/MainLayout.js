import React,{Component} from 'react'

// components
import Navbar from '../components/navbar'
import NavbarItem from '../components/navbar-item'

class MainLayout extends Component {

  render(){
    return(
      <div>
        <Navbar brand='' className="navbar-fixed" right>
          <NavbarItem href='/'>Dashboard</NavbarItem>
          <NavbarItem href='page2'>Page2</NavbarItem>
        </Navbar>

        {this.props.children}

      </div>
    )
  }
}


export default MainLayout
