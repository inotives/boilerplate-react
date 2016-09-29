import React from 'react';
import {Link} from 'react-router'

class NavbarItem extends React.Component {
  render() {
    let {divider, href, children, ...props} = this.props;
    if (divider) {
      return <li className="divider"></li>
    } else {
      return (
        <li {...props}>
          <Link to={href} className="grey-text text-lighten-2" activeClassName="active grey darken-2">{children}</Link>
        </li>
      );
    }
  }
}

NavbarItem.propTypes = {
  href: React.PropTypes.string,
  divider: React.PropTypes.bool,
}

export default NavbarItem;
