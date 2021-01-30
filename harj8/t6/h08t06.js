class Autolaskuri extends React.Component {
    constructor(props) {
        super(props);
        this.state = {laskuri: [0,0]}
        this.onImageClicked = this.onImageClicked.bind(this);
    }
    
    onImageClicked(event) {
        // ensin selvitetään kumpaa kuvaa painettiin
        var imgID = event.target.id;
        /*  koska alkuperäistä taulukkoa ei voi suoraan päivittää
            otetaan siitä kopio jota muokataan
            ja asetetaan se sitten setState:lla alkuperäisen taulukon tilalle
        */
        let counts = [...this.state.laskuri]
        var carCount = counts[0];
        var vanCount = counts[1];
        // jos car-kuva
        if (imgID == 1) {
            carCount++;
            counts[0] = carCount;
            this.setState({laskuri: counts});
        } // jos van-kuva
        if (imgID == 2) {
            vanCount++;
            counts[1] = vanCount;
            this.setState({laskuri: counts});
        }
        //debugger;
        //console.log(counts);
        //console.log(this.state.laskuri[0]);
        //console.log(this.state.laskuri[1]);
    }
    render() {
        return (
            <div>
                <h1>Autolaskuri</h1>
                <p>Klikkaa mieleistä auton kuvaa</p>
                <div id="imgContainer">
                    <span>Car: {this.state.laskuri[0]}</span><br/>
                    <img id="1" src="img/car.jpg" onClick={this.onImageClicked}></img><br/>
                    <span>Van: {this.state.laskuri[1]}</span><br/>
                    <img id="2" src="img/van.jpg" onClick={this.onImageClicked}></img>
                </div>
            </div>
            
        );
    }
}

ReactDOM.render(
        <Autolaskuri />,
        document.getElementById('root')
);