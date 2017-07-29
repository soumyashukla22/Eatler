import React, {Component} from 'react';


const IngredientInput = ({quantity, ingredient, deleteIngredient, updateIngredient, index, onKeyPress}) => {

  return <div className="row">
    <div className="col-sm-3"><input id={index} type="text" onChange={(event) => updateIngredient(event, 'quantity')}
                                     value={quantity}></input></div>
    <div className="col-sm-5"><input id={index} type="text"
                                     onChange={(index, value) => updateIngredient(index, 'ingredient', value)}
                                     onKeyPress={onKeyPress}
                                     value={ingredient}></input></div>
    <div onClick={deleteIngredient}><span id={index} className="fa fa-trash bigger"></span></div>
  </div>

}

class IngredientList extends Component {
  constructor(props) {
    super(props)
    this.updateRawIngredients = this.updateRawIngredients.bind(this);
    this.convertRawIngredientInput = this.convertRawIngredientInput.bind(this);
    this.validateRawIngredientInput = this.validateRawIngredientInput.bind(this);
    this.updateRegex = this.updateRegex.bind(this);
    this.state = {rawIngredients: '1-2 cup milk', errors: '', regex: '^([0-9\\/\\-]+)\\s(.+)$'}
  }

  updateRegex(event) {
    this.setState({regex: event.target.value, 'errors': ''})
  }

  validateRawIngredientInput() {
    const rawText = this.state.rawIngredients;
    const rawLnes = rawText.split("\n")
    const ingList = []
    var errorList = []
    console.log(this.state.regex)
    var re = new RegExp(this.state.regex);
    for (var lineId in rawLnes) {
      var match = re.exec(rawLnes[lineId])
      if (match !== null) {
        ingList.push({quantity: match[1], ingredient: match[2].toLowerCase()})
      } else {
        errorList.push(rawLnes[lineId]);
      }
    }
    if (errorList.length > 0) {
      this.setState({'errors': errorList.join("\n")})
      return null;
    } else {
      this.setState({'errors': 'Perfect!'})
    }
    return ingList;
  }

  convertRawIngredientInput() {
    var newIngList = this.validateRawIngredientInput();

    if (newIngList !== null) {
      this.props.onRawIngredientUpdate(newIngList);
    }
  }


  updateRawIngredients(event) {
    if (event.target.value !== this.state.rawIngredients) {
      var newState = {rawIngredients: event.target.value, errors: ''};
      this.setState(newState)
    }

  }

  render() {
    const {ingredientsList, addEmptyRow, deleteIngredient, updateIngredient, onKeyPress, onRawIngredientUpdate} = this.props;
    var existingIngredients = null;
    if (ingredientsList !== undefined && ingredientsList.length > 0) {
      existingIngredients = ingredientsList.map(function (value, index) {
        return <IngredientInput key={index} quantity={value.quantity} ingredient={value.ingredient}
                                deleteIngredient={deleteIngredient}
                                updateIngredient={updateIngredient}
                                index={index}
                                onKeyPress={onKeyPress}
                                onRawIngredientUpdate={onRawIngredientUpdate}/>
      })
    }

    return <div className="ingredients-list">{existingIngredients}
      <div className="row">
        <div className="col-sm-1" onClick={addEmptyRow}><span className="fa fa-plus"></span></div>
        <div className="col-sm-1" data-toggle="modal" data-target="#myModal"><span className="fa fa-bolt"></span>
        </div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Enter Raw Text for Ingredients</h4>
              </div>
              <div className="modal-body">
                <input type="text" value={this.state.regex} onChange={this.updateRegex}></input>
                <textarea value={this.state.rawIngredients} onChange={this.updateRawIngredients}></textarea>
              </div>
              <div className="modal-error">
                {this.state.errors}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={this.validateRawIngredientInput}>
                  Validate
                </button>
                <button type="button" className="btn" data-dismiss="modal" onClick={this.convertRawIngredientInput}>
                  Update
                </button>
                <button type="button" className="btn" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  }
}

export default IngredientList