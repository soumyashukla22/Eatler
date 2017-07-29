import React, {Component} from 'react';
import classnames from 'classnames';

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    }
  }


  render() {
    // console.log(this.state)
    return <a
      className="link-container" href={"/recipe/" + this.props.recipe.recipe_id} target="_blank">
      <div className="card-container" onMouseEnter={() => {
        this.setState({showInfo: true})
      }} onMouseLeave={() => {
        this.setState({showInfo: false})
      }}>
        <a href={"/recipe/" + this.props.recipe.recipe_id} target="_blank">
          <img className={classnames({"card-image": true, 'card-image-hover': this.state.showInfo})}
               src={"/api/recipes/file/main/" + this.props.recipe.recipe_id}/>
        </a>
        <div className={classnames({"card-footer": true, 'card-footer-hover': this.state.showInfo})}>
          <div className="card-title"><span>{this.props.recipe.title.toUpperCase()}</span></div>
        </div>
        <div className={classnames({"read-more": true, 'read-more-hover': this.state.showInfo})}>
          <div className={classnames({'read-more-div': this.state.showInfo})}><span>Read More</span></div>
        </div>
      </div>
    </a>
  }
}

export default RecipeCard;