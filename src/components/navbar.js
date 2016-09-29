import React from 'react'
import cx from 'classnames'

const logoStyle = { width: '100%', height: '100%' }
const logoContainer = { width: 100, height: 40, margin: "8px auto 1px" }
const logoImage = "/assets/images/logo.png"

class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.renderSideNav = this.renderSideNav.bind(this);
  }

  componentDidMount(){
    if($ !== undefined) {
      $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true
      })
    }
  }

  renderSideNav() {

    return (
      <ul id="nav-mobile" className="side-nav collection with-header">
        <li className="collection-header">
          <div style={logoContainer}>
            <img style={logoStyle} src={logoImage} alt="logo" />
          </div>

        </li>
        {this.props.children}
      </ul>
    )
  }

  render() {
    let {brand, className, ...props} =  this.props;
    let classes = {
      right: this.props.right,
      'hide-on-med-and-down': true
    };
    let brandClasses = {
      'brand-logo': true,
      right: this.props.left,
      'hide-on-med-and-down': true
    }

    return (
      <div className={className}>
        <nav className='nav-wrapper grey darken-3'>
          <div className="row">
            <div className="col s12">

              <a href='/' className={cx(brandClasses)}>
                <div className="left-align" style={logoContainer}>
                  <img style={logoStyle} src={logoImage} alt="logo" />
                </div>
                {brand}
              </a>
              <ul className={cx(className, classes)}>
                {this.props.children}
              </ul>
              {this.renderSideNav()}
              <a className='button-collapse' href='#' data-activates='nav-mobile'>
                <i className="fa fa-bars grey-text text-ligthen-5"></i>
              </a>

            </div>
          </div>

        </nav>
      </div>
    )
  }
}

export default Navbar
