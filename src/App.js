import "./App.css";
import Navigation from "./components/Navigations/Navigation";
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForms/ImageLinkForm";
import Rank from "./components/Rank/Rank.js";
import 'react-tsparticles'
import { Component, useCallback } from "react";
import Particles from "react-tsparticles";
import Clarifai  from 'clarifai';

import { loadFull } from "tsparticles";
import { render } from "@testing-library/react";

const app = new Clarifai.App({
 apiKey: '362b1699a12e4a58acef102b1752021a'
});

const particlesOptions = {
  particles:{
    number:{
      value : 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        password: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,

      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row  * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) =>{
     this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input})
     ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
const Clarifai = require('clarifai');
    const PAT = '24c2f35dbd314d52afab9b5a3656d88f';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = this.state.input  ;
    // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(response => {
          if(response){
            fetch('http://localhost:3000/image', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
              id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries : count})
              )
            })
          }
          this.displayFaceBox(this.calculateFaceLocation(response))})
        .catch(error => console.log('error', error));
  }

  onRouteChange = (route) =>{
    if( route === 'signout'){
      this.setState({isSignedIn : false})
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route : route})
  }

  render(){
    const {isSignedIn, imageUrl, route, box} = this.state
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOptions}
      />
      <Navigation isSignedIn={isSignedIn } onRouteChange={this.onRouteChange}/>
      {route === 'home'
      ?<div>
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>
        :(
          route === 'signin' ?
          <Signin onRouteChange={this.onRouteChange}/> :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
  );
  }
}

export default App;
