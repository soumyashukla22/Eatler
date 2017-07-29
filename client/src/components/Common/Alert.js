import React from 'react';
import classnames from 'classnames';
import './Alert.css'

const Alert = ({type, message}) => {
  let clzName = ''
  switch (type) {
    case 'success':
      clzName = 'success';
      break;
    case 'error':
      clzName = 'error';
      break;
    case 'info':
      clzName = 'info';
      break;
    default:
      clzName = 'info';
      break;
  }
  let messageDiv = <div className={classnames('alert-div', clzName)}>{message}</div>
  console.log(message)
  if (message === null || message === '' || message === undefined) {
    messageDiv = ''
  }
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          {messageDiv}
        </div>
      </div>
    </div>
  )
}

export default Alert
