import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>About my Page
      </div>
    );
  }
}

export default {
  path: 'about',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, About);
    });
  }
};
