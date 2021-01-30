// TodoBanner component
class TodoBanner extends React.Component {
    // render this component
    render (){
        return (
            <h1>Todo Example with React</h1>
        );
    }

}

// TodoList component
class TodoList extends React.Component {
    constructor(props) {
        super(props);
 }
    // render this component
    render () {
      return (
         <ul>
            {this.props.items.map((item, index) =>
                        <li key={index} id={index}>{item} <img src="delete.jpg" onClick={this.props.removeItem} /></li>
                )}
        </ul>
      );
    }

}

// TodoForm component
class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: ""};
        // LISÄÄ TÄHÄN JOS TARVIT MUUTA
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // add a new item -> call parent
    handleSubmit(e) {
        // prevent normal submit event
        e.preventDefault();
        // gets the input-value and set it for state-item
        let newItem = this.refs.item.value;
        this.setState({ item: newItem });
        // call parent to add a new item
        this.props.addItem(newItem);
        // remove new typed item from text input
        this.refs.item.value = "";
        // focus text input
        this.refs.item.focus();
    }

    // render component
    render (){
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" ref="item" autoFocus required /><input type="submit" value="Add" />
            </form>
        );
    }

}

// App component
class App extends React.Component {
    // init state
    constructor(props) {
        super(props);
        this.state = {items: []};
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    
    }

    // add a new item
    addItem (newItem) {
        // add new item to items array
        // takes a copy of old array (because original is read-only), adds newItem to it and replaces the old array
        this.setState({
            items: [...this.state.items, newItem] 
        })
    }

    // remove item
    removeItem (index){
        // remove from items array
        let itemsCopy = [...this.state.items]; // needs a copy because original is read-only
        // get the index-number from parent-id   
        let i = index.target.parentElement.id;
        //console.log(index.target.parentElement.id);
        itemsCopy.splice(i, 1); // removes one value from that index
        this.setState({items: itemsCopy}); // replace old array with the new one
        // focus on input-field
        document.querySelector("input").focus();
    }

    // render component
    render () {
        // passes the addItem-method for TodoForm-component
        // passes the state-items and removeItem method for ToDoList-component
        return (
            <div>
                <TodoBanner/>
                <TodoForm addItem={this.addItem} /> 
                <TodoList items={this.state.items} removeItem={this.removeItem} />
            </div>
        );
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
