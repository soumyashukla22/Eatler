import React, {Component} from 'react';
import classNames from 'classnames';

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [{
        name: 'Facebook', link: "http://facebook.com/eatler", icon: "fa-facebook-square"
      }, {
        name: 'Instagram', link: "https://www.instagram.com/hungry.eatler", icon: 'fa-instagram'
      }, {
        name: "Twitter", link: "https://twitter.com/hungryEatler", icon: 'fa-twitter-square'
      }]
    }
  }


  render() {
    return (
      <div className="side-nav">
        <div className="logo-container">
          <a href="/">EATLER</a>
        </div>
        <div className="nav-link-container">
          <ul>
            <li>
              <a href="/">
                <span className="nav-link">HOME</span>
              </a>
            </li>
            {this.state.links.map(function (link, index) {
              return <li key={index}>
                <a href={link.link} target="_blank">
                  <span className="nav-link">{link.name.toUpperCase()}</span>
                </a>
              </li>
            })}
          </ul>
        </div>
        <div className="nav-social">
          {this.state.links.map(function (link, index) {
            let classnameList = {'fa': true}
            classnameList[link.icon] = true
            return <a key={index} target="_blank" href={link.link}><i className={classNames(classnameList)}></i> </a>
          })}
        </div>
      </div>
    );
  }
}