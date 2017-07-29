import React, {Component} from 'react';
import {postFileToUrl} from '../Common/ApiHelper'
import Alert from './Alert'
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: '', image_type: 'main'};
    this.imageUploadCallback = this.imageUploadCallback.bind(this);
    this.handleImageTypeChanged = this.handleImageTypeChanged.bind(this);
  }


  imageUploadCallback(json) {
    if (json["error_code"] === 0) {
      this.setState({'successMsg': 'Image Uploaded Successfully'})
    } else {
      this.setState({'errorMsg': json['err_desc']})

    }
  }

  handleImageTypeChanged(event) {
    this.setState({'image_type': event.target.value});
  }

  _handleSubmit(e) {
    this.setState({errorMsg: '', successMsg: ''})
    e.preventDefault();
    let data = new FormData();
    data.append('file', this.state.file);
    postFileToUrl('/api/recipes/upload/' + this.state.image_type + "/" + this.props.recipe_id, data, this.imageUploadCallback)
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<div className="img-preview">
        <img width='200px' src={imagePreviewUrl} alt="Recipe"/>
      </div>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="close-btn" onClick={this.props.onClose}><i className="fa fa-close"></i></div>
            <div className="row">

            </div>
            <div className="row">

              <div className="previewComponent">
                <div className="col-sm-3">
                  <input type="radio" name="image_type" value='main' checked={this.state.image_type === 'main'}
                         onChange={this.handleImageTypeChanged}/>Primary
                </div>
                <div className="col-sm-3">
                  <input type="radio" name="image_type" value='sec' checked={this.state.image_type === 'sec'}
                         onChange={this.handleImageTypeChanged}/>Secondary
                </div>
                <div className="col-sm-6">
                  <input className="fileInput"
                         type="file"
                         onChange={(e) => this._handleImageChange(e)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 imgPreview">
                {$imagePreview}
              </div>
            </div>
            <Alert type="success" message={this.state.successMsg}/>
            <Alert type="error" message={this.state.errorMsg}/>
            <div className="row">

              <button className="btn submitButton submit-button"
                      type="submit"
                      onClick={(e) => this._handleSubmit(e)}>Upload Image
              </button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default ImageUpload;