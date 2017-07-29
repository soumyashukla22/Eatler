import React, {Component} from 'react';
import IngredientList from '../Common/IngredientList'
import {postDataToUrl, getFreshDataFromUrl} from '../Common/ApiHelper'
import ImageUpload from '../Common/ImageUpload'

import './content.less';


export default class Content extends Component {
  constructor(props) {
    super(props)
    this.updateIngredient = this.updateIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.addEmptyRow = this.addEmptyRow.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.editForm = this.editForm.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.searchRecipe = this.searchRecipe.bind(this);
    this.onRawIngredientUpdate = this.onRawIngredientUpdate.bind(this);
    this.openImageUploader = this.openImageUploader.bind(this);
    this.onClose = this.onClose.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.state = {
      recipe_id: 'french_macarons',
      extras: {
        imageUploadOpen: false
      }
    }
    this.searchRecipe()
  }

  removeImage(url) {
    console.log(url)
    getFreshDataFromUrl(url)
  }

  onClose() {
    var newState = {};
    newState['extras'] = {'imageUploadOpen': false};
    this.setState(newState)
  }

  openImageUploader() {
    var newState = {};
    newState['extras'] = {'imageUploadOpen': true};
    this.setState(newState)
  }

  editForm(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState)
  }

  addEmptyRow() {
    var newIngredientsList = 'ingredientsList' in this.state ? this.state.ingredientsList.slice() : [];
    newIngredientsList.push({quantity: "", ingredient: ""});
    this.setState({'ingredientsList': newIngredientsList});
  }

  deleteIngredient(event) {
    var newIngredientsList = this.state.ingredientsList.slice();
    newIngredientsList.splice(event.target.id, 1)
    this.setState({'ingredientsList': newIngredientsList});
  }

  updateIngredient(event, key) {
    if (event.target.value.indexOf('`') > -1) {
      return;
    } else {
      var value = event.target.value;
      var index = event.target.id
      var newIngredientsList = this.state.ingredientsList.slice();
      newIngredientsList[index][key] = value;
      this.setState({'ingredientsList': newIngredientsList});
    }

  }

  onKeyPress(event) {
    if (event.key === '`') {
      this.addEmptyRow();
    }
  }

  onRawIngredientUpdate(ingredientList) {
    console.log(ingredientList)
    this.setState({'ingredientsList': ingredientList});
  }

  saveRecipe() {
    if (!('recipe_id' in this.state) || this.state.recipe_id === null) {
      console.log("Not saving");
      return;
    }
    delete this.state._id;
    postDataToUrl("/api/recipes", {"recipe": JSON.stringify(this.state)});
  }

  searchRecipe() {
    var url = this.state.recipe_id;
    getFreshDataFromUrl(url).then(data => {
      console.log(data[0])
      var newState = {}
      Object.assign(newState, data[0]);
      console.log(newState)
      newState['extras'] = {'imageUploadOpen': false};
      this.setState(newState);
    });
  }

  render() {
    // console.log(this.state)
    return (
      <div className="main-panel">
        <h1>
          Content
        </h1>

        <div className="recipe-details">
          <div className="row">
            <div className="col-sm-2 content-label">ID:</div>
            <div className="col-sm-8"><input type="text" value={this.state.recipe_id} id="recipe_id"
                                             onChange={this.editForm}></input></div>
            <div className="col-sm-2">
              <button className="btn submit-button" onClick={this.searchRecipe}>Search</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 content-label">Title:</div>
            <div className="col-sm-9"><input type="text" value={this.state.title} id="title"
                                             onChange={this.editForm}></input></div>
          </div>
          <div className="row">
            <div className="col-sm-2 content-label">Description:</div>
            <div className="col-sm-9"><textarea value={this.state.desc} id="desc"
                                                onChange={this.editForm}></textarea></div>
          </div>
          <div className="row">
            <div className="col-sm-2 content-label">Ingredients:</div>
            <div className="col-sm-9">
              <IngredientList ingredientsList={this.state.ingredientsList}
                              addEmptyRow={this.addEmptyRow}
                              deleteIngredient={this.deleteIngredient}
                              updateIngredient={this.updateIngredient}
                              onKeyPress={this.onKeyPress}
                              onRawIngredientUpdate={this.onRawIngredientUpdate}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 content-label">Procedure:</div>
            <div className="col-sm-9"><textarea value={this.state.procedure} id="procedure"
                                                onChange={this.editForm}></textarea></div>
          </div>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-9">
              <button className="btn submit-button" onClick={this.saveRecipe}>Submit</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 content-label">Images:</div>
            <div className="col-sm-9 image-uploader">
              <div onClick={this.openImageUploader}><i className="fa fa-upload"></i></div>
              <ImageUpload image_type="main" recipe_id={this.state.recipe_id}
                           isOpen={this.state.extras.imageUploadOpen} onClose={this.onClose}/>
              <div className="row">
                <div className="col-sm-2"><img src={"/api/recipes/file/main/" + this.state.recipe_id} width="100"/>
                </div>
                <div className="col-sm-1">
                  <div onClick={() => {
                    this.removeImage("/file/delete/main/" + this.state.recipe_id)
                  }}><label className="content-label">Remove</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2"><img src={"/api/recipes/file/sec/" + this.state.recipe_id} width="100"/>
                </div>
                <div className="col-sm-1">
                  <div onClick={() => {
                    this.removeImage("/file/delete/sec/" + this.state.recipe_id)
                  }}><label className="content-label">Remove</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*
           ID
           Title
           Description
           Map<String, String> Ingredients
           List<String> Procedure
           Main Image
           Secondary Images
           */}

        </div>
      </div>
    );
  }
}
