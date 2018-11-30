import React from 'react';
import '../../component-styles/ToDoView.css';
import Confirmation from "../utils/util-components/Confirmation";
import ToDoItem from "./ToDoItem";
import Loading from "../utils/util-components/Loading";
import ToDoInput from "./ToDoInput";


class ToDoView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isConfirmDialogOpen: false,
            idToDelete: null,
            isLoading: false,
            isLoadingFinish: false,
            itemId: null
        }
    }

    componentDidMount() {
        this.setState({items: this.props.itemsToDisplay});
    }

    static getDerivedStateFromProps(props, state) {
        if (props.itemsToDisplay !== state.items)
            return {items: props.itemsToDisplay};
        return {};
    }

    async finishItem(itemId) {
        this.setState({isLoadingFinish: true, itemId: itemId});
        this.showCongratz();
        await this.props.finishItem(itemId);
        this.setState({isLoadingFinish: false, itemId: null});
    };

    showCongratz() {
        let DELAY_AFTER_GRATZ_HIDES = 2000;
        let outerDiv = document.createElement('div');
        outerDiv.classList.add("congratz-outer");
        let innerDiv = document.createElement('div');
        innerDiv.classList.add("congratz-inner");
        innerDiv.innerHTML = "GOOD JOB";
        outerDiv.appendChild(innerDiv);
        document.getElementsByTagName("BODY")[0].appendChild(outerDiv);
        setTimeout(() => {
            document.getElementsByTagName("BODY")[0].removeChild(outerDiv)
        }, DELAY_AFTER_GRATZ_HIDES);
    }

    openConfirmation(idToDelete) {
        this.setState({
            isConfirmDialogOpen: true,
            idToDelete: idToDelete
        })
    }

    closeConfirmation() {
        this.setState({
            isConfirmDialogOpen: false,
            idToDelete: null
        })
    }

    async confirmDelete() {
        this.setState({isLoading: true});
        await this.props.removeToDoItem(this.state.idToDelete);
        this.setState({isLoading: false});
        this.closeConfirmation();
    }

    async addTodoItem(e) {
        this.setState({isLoading: true});
        await this.props.addToDoItem(e);
        this.setState({isLoading: false});
    }

    render() {
        let confirm = this.state.isConfirmDialogOpen ?
            <Confirmation isOpen={this.state.isConfirmDialogOpen}
                          closeFunction={() => this.closeConfirmation()}
                          confirmFunction={() => this.confirmDelete()}
                          confirmationMessage={"Remove TODO item from the list"}/>
            :
            "";
        let loading = this.state.isLoading ? <Loading/> :
            this.state.isLoadingFinish ? <Loading portal={document.getElementById(this.state.itemId).firstChild}/> :
                "";
        return this.props.isLoggedIn ? (
                <React.Fragment>
                    {confirm}
                    {loading}
                    <ToDoInput
                        addTodoItem={this.addTodoItem.bind(this)}/>
                    <div className="todos">
                        {this.renderToDoItems()}
                    </div>
                </React.Fragment>
            )
            :
            (
                <div className="todos">
                    <div className={"pl-4"}>Log in to add TODO items</div>
                </div>
            )
    }

    renderToDoItems() {
        if (this.state.items === null)
            return <Loading/>;
        return this.state.items.length > 0 ?
            this.state.items.map((todoItem) =>
                <ToDoItem
                    id={todoItem._id}
                    key={todoItem._id}
                    item={todoItem}
                    finishItem={this.finishItem.bind(this)}
                    openConfirmation={this.openConfirmation.bind(this)}/>)
            :
            <div className={"pl-4"}>No TODOs for today</div>
    }
}

export default ToDoView;