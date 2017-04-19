import React from 'react';
import Carousel from 'nuka-carousel';

const Decorators = [{
  component: React.createClass({
    render() {
      return (
        <div onClick={this.props.previousSlide} className='fa fa-arrow-left fa-2x'></div>
      )
    }
  }),
  position: 'TopLeft',
  style: {
    background: 'grey',
    opacity: 0.3,
    color: 'white',
    padding: 10,
    paddingTop: 250,
    height: "100%"
  }
}, {
  component: React.createClass({
    render() {
      return (
        <div onClick={this.props.nextSlide} className='fa fa-arrow-right fa-2x'></div>
      )
    }
  }),
  position: 'TopRight',
  style: {
    background: 'grey',
    opacity: 0.3,
    color: 'white',
    padding: 10,
    paddingTop: 250,
    height: "100%"
  }
}];


const PictureCarousel = ({picArray}) => {
  return (
    <Carousel decorators={Decorators} dragging={true} wrapAround={true} autoplay={true}>
      {
        picArray.map(function(pic, index){
          return <img key={index} src={pic} alt="Not found"/>
        })
      }
    </Carousel>
  )
};

export default PictureCarousel;
