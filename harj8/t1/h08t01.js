class Names extends React.Component {
    render() {
        let names = ["Arska", "Basso", "Mixu"];
        return (
        <div>
            {names.map(function(name, index){
                return <p key={ index }>Terve {name}!</p>;
            })}
        </div>
        );
    }
}
ReactDOM.render(
        <Names />,
        document.getElementById('root')
);