import React from 'react';
import './App.css';
import Navbar from "./components/navbar/index";
import marvelChars from  "../src/components/marvelChars.json";
import Card from "./components/card";

let correctGuesses = 0;
let topScore = 0;
let clickMessage = "Click an image to begin!";


function shuffle(array){
  array.sort(() => Math.random() - 0.5);
}

class App extends React.Component {

  state = {
    marvelChars,
    clickMessage,
    topScore,
    correctGuesses
  }

  handleClick =(id) => {
    const marvelChars = this.state.marvelChars;

    const clickedImage = marvelChars.filter((image) => image.id === id);

    if (clickedImage[0].clicked){
      correctGuesses = 0;
      clickMessage = "You guessed incorrectly!";

      for (let i = 0; i < marvelChars.length; i++){
        marvelChars[i].clicked = false;
      }

      this.setState({clickMessage});
      this.setState({correctGuesses});
      this.setState({marvelChars});
    }else if (correctGuesses < 11){
      clickedImage[0].clicked = true;

      correctGuesses++;

      clickMessage = "You guessed correctly!";

      if (correctGuesses > topScore){
        topScore = correctGuesses;
        this.setState({topScore});
      }

      
      shuffle(marvelChars);

      this.setState({marvelChars});
      this.setState({correctGuesses});
      this.setState({clickMessage});
    }else{
      clickedImage[0].clicked = true;

      correctGuesses = 0;
      clickMessage = "You WON";
      topScore = 12;
      this.setState({topScore});

      for (let i = 0; i < marvelChars.length; i++){
        marvelChars[i].clicked = false;
      }

      shuffle(marvelChars);

      this.setState({marvelChars});
      this.setState({correctGuesses});
      this.setState({clickMessage});
    }
  }

  render(){
    const imgList = this.state.images.map(image => (
      <Card
      id={image.id}
      image={image.image}
      key={image.id}
      handleClick = {this.handleClick}
      />
    ))
    return(
      <div className="wrapper">
        <Navbar clickMessage={this.state.clickMessage} topScore={this.state.topScore} correctGuesses={this.state.correctGuesses}/>
        <div className="container">
          <div class="row">
            {imgList}
          </div>
        </div>
      </div>
    )}
}

export default App;