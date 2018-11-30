import React from 'react';

class ToDoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

    submit(e) {
        e.preventDefault();
        if (this.state.input === "")
            return;
        this.props.addTodoItem(this.state.input);
        this.setState({input: ""});
    }

    handleInput(event) {
        this.setState({input: event.target.value});
    }

    render() {
        return (
            <div className={"todo-list-container"}>
                <form className={"form-inline justify-content-end"} onSubmit={this.submit.bind(this)}>
                    <div className="form-group w-100">
                        <input className={"form-control"}
                               onChange={this.handleInput.bind(this)}
                               value={this.state.input}
                               name="content"
                               type="text"/>
                        <input className={"btn btn-primary"} value={"Add to my TODO list"} type="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default ToDoView;