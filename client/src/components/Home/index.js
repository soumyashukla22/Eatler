import React, {Component} from 'react';
import {getFreshDataFromUrl} from '../Common/ApiHelper'
import StackGrid from "react-stack-grid";
import RecipeCard from './RecipeCard'
import './home.less';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

  }

  componentDidMount() {
    getFreshDataFromUrl('').then((resp) => {
      console.log(resp);
      let recipes = []
      recipes.push.apply(recipes, resp);
      recipes.push.apply(recipes, resp);
      recipes.push.apply(recipes, resp);
      recipes.push.apply(recipes, resp);
      recipes.push.apply(recipes, resp);
      this.setState({data: recipes});
    });
  }

  render() {
    return (
      <div className="main-panel">
        <StackGrid monitorImagesLoaded={true} columnWidth={285}>{
          this.state.data.map(function (recipe, index) {
            return <RecipeCard recipe={recipe} key={index} />
          })
        }
        </StackGrid>

      </div>
    );
  }
}

export default Home;
