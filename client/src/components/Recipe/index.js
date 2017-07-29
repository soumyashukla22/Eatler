import React, {Component} from 'react';
import {getFreshDataFromUrl} from '../Common/ApiHelper'

export default class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeId: this.props.match.params.recipeId
    }
  }

  componentDidMount() {
    console.log("mount")
    getFreshDataFromUrl(this.state.recipeId).then((resp) => {
      console.log(resp)
      this.setState({recipe: resp[0]})
    });
  }

  render() {
    console.log(this.state.recipe)
    if (this.state.recipe === undefined) {
      return null;
    }
    return (
      <div className="main-panel recipe-panel">
        <div className="image-container">
          <img className="main-image" src={"/api/recipes/file/sec/" + this.state.recipeId}/>
        </div>
        <div className="recipe-container">
          <h1>{this.state.recipe.title}</h1>
          <p>{this.state.recipe.desc}</p>
          <div className="row steps-header">
            <div className="col-md-5">Ingredients</div>
            <div className="col-md-6">Procedure</div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="row">
                {this.state.recipe.ingredientsList.map(function (ingredient, index) {
                  return <div>
                    <div className="col-md-2 quantity-container">{ingredient.quantity}</div>
                    <div className="col-md-10">{ingredient.ingredient}</div>
                  </div>
                })}
              </div>
            </div>
            <div className="col-md-6">
              <ol className="procedure-list">
                {this.state.recipe.procedure.split('\n').map(function (row, index) {
                  return <li>{row}</li>
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
