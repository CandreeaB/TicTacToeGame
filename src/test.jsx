constructor(props) {
    super(props);
    this.state = {
        newItem: '',
        counter: 0,
    };
}

handleChange = (e) => {
    this.setState({
        newItem: e.target.value,
    });
};

handleAdd = () => {
    this.props.addTodo(this.state.counter, this.state.newItem);
    this.setState({
        counter: this.state.counter + 1,
    })
};

handleRemove = (key) => {
    this.props.deleteTodo(key)
};

render() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">TO DO LIST</h1>
            </header>
            <div className="App-intro">
                <input value={this.state.newItem} type='text' onChange={ this.handleChange } />
                <button onClick={ this.handleAdd }>
                    Submit
                </button>