import React, { Component } from 'react';
import Nav from '../Nav'
import PictureCarousel from '../PictureCarousel'
import Card from '../Card'

import './index.css'

class Home extends Component {
  render() {
    const picArray = ['/images/IMG_8538.JPG', '/images/IMG_8684.JPG']
    const blogSummary = []
    for (let i = 0; i < 5; i++) {
      blogSummary.push({
        'title': 'Zuchini Veg Balls',
        'img': '/images/IMG_8538.JPG',
        'description': "Some description that describes what this is and how it was made. Some more words to increase it and do something. Some description that describes what this is and how it was made. And some other words and more words that increase the number of lines and shows me what it looks like"
      })
      blogSummary.push({
        'title': 'Zuchini Veg Balls',
        'img': '/images/IMG_8538.JPG',
        'description': "Some description"
      })
    }
    return (
      <div>
        <Nav />
        <div className="col-md-10 col-sm-offset-2">
          <br />
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
              <div className="carousel">
                <PictureCarousel picArray={picArray}/>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
              {
                blogSummary.map(function(blogEntry, index){
                  return <Card title={blogEntry.title} image={blogEntry.img} description={blogEntry.description} key={index}/>
                })
              }
            </div>
          </div>
          <br /><br />
          <div className="row">
            <div className="footer">
              <p>Copyright <i className='fa fa-copyright'></i> 2017 Soumya Shukla. </p>
              <p>For any questions contact soumyashukla22@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
