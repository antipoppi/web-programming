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
        $.ajax({
            url: 'persons.json',
            cache: false,
            dataType: 'json'
        }).done((data) => {
            this.setState({persons: data.persons, loaded:true});
        }).fail((jqXHR, textStatus, errorThrown) => {
            console.log(textStatus+":"+errorThrown);
        });
        
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
ReactDOM.render(
    <Persons />,
    document.getElementById("root")
);
    

    