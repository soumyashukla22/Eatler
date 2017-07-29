import React, {Component} from 'react';

import './style.css';

export default class NotFound extends Component {

  render() {
    return (
      <div className="main-panel not-found-panel">

        <div className="cupcake-image-container">
          <img src="/images/cupcake.png" className="cupcake-image"/>
        </div>
        <h3>We could not find the recipe you're looking for, but here's a cupcake! Enjoy :)</h3>
      </div>
    );
  }
}
