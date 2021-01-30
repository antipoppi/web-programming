let highscoreData = [
            {
                id: 1,
                name: 'Jason',
                score: 4000
            },
            {
                id: 2,
                name: 'Make',
                score: 3000
            },
            {
                id: 3,
                name: 'Bill',
                score: 2000
            },
            {
                id: 4,
                name: 'Liza',
                score: 1000
            }
        ];

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
        setTimeout(() => this.setState({persons: highscoreData, loaded:true}), 3000);
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
    // Näytetään ladattu highscoreData:
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
ReactDOM.render(
    <Persons />,
    document.getElementById("root")
);
    

    