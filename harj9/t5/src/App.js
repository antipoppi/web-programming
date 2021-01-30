import React from 'react';
import persons from './persons.json';

class Persons extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          persons: [],
          loaded: false
      };
      this.onLoadClick = this.onLoadClick.bind(this);
      this.getPersons = this.getPersons.bind(this);
  }
  
  componentDidMount() {
      this.getPersons();
  }
  
  // Tyhjätään mahdollisesti aiemmin haettu data ja haetaan uudelleen

  getPersons() {
    let personsData = persons; // tuodaan lokaalisti ja persons.json on muutettu taulukoksi (joka pysyy silti validina jsonina)
    setTimeout(() => this.setState({persons: personsData, loaded:true}), 3000);
  }
  
  onLoadClick () {
      this.setState({persons:[], loaded:false});
      this.getPersons();
  }
  
  render() {

  // Jos dataa EI ole VIELÄ ladattu:
  if (!this.state.loaded) {
      return (
          <div>
              <p>Loading...</p>
          </div>
      );
  }
      
  // Näytetään haettu JSON-data:
  return (
      <div>
          <ul>
          {this.state.persons.map((person, index) =>
                      <li key={index}>{person.name} : {person.score}</li>
              )}
          </ul>
          <p><button onClick={this.onLoadClick}>Load again</button></p>
      </div>
  );
  }

}

function App() {
  return (
    <div>
      <h3>Highscores</h3>
      <Persons />
    </div>
  )
}

export default App;
