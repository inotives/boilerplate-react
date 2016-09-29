import React, {Component} from 'react'

class Preloader extends Component {

  render() {
    return (
      <div className="progress">
          <div className="indeterminate"></div>
      </div>
    )
  }
}

export default Preloader
