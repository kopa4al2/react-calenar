import React from 'react'
import ToDoListService from "../services/ToDoListService";
import ToDoView from "../components/todo-list/ToDoView";
import {ContextToPropsHOC} from "../components/HOC/ContextToPropsHOC";
import MyDaysPagination from "../components/my-days/MyDaysPagination";
import Loading from "../components/utils/util-components/Loading";

class ToDoListController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalItems: 0,
            pageSize: 5,
            currentPage: 1,
            currentPageItems: null,
            currentDateId: null
        }
    }

    componentDidMount() {
        this.initTodoItems();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentDateId !== state.currentDateId && props.context.isLoggedIn) {
            return {currentDateId: props.currentDateId};
        }
        return {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentDateId !== this.state.currentDateId)
            this.initTodoItems();
    }

    async initTodoItems() {
        if (!this.state.currentDateId)
            return;
        this.setState({isLoading: true});
        let totalItems = await ToDoListService.getToDoListCount(this.props.context.loggedInUser, this.state.currentDateId);
        let currentPageItems = await this.fetchToDoListPaged();
        this.setState({
            totalItems: totalItems.count,
            currentPageItems: currentPageItems,
            isLoading: false
        })
    }

    async fetchToDoListPaged(pageSize, currentPage, loggedInUser, currentDayId) {
        return new Promise((resolve, reject) => {
            ToDoListService.getToDoListByDayPaged(
                pageSize || this.state.pageSize,
                currentPage || this.state.currentPage,
                loggedInUser || this.props.context.loggedInUser,
                currentDayId || this.props.currentDateId
            ).then(
                (success) => resolve(success),
                (fail) => reject(fail)
            )
        });
    }

    async addToDoItem(content) {
        let data = {
            isFinished: false,
            dayId: this.props.currentDateId,
            content: content
        };
        return new Promise((resolve, reject) => {
            ToDoListService.addToDoItem(data, this.props.context.loggedInUser)
                .then(
                    (success) => {
                        //Put the newly created item on top
                        let currentPageItems = this.state.currentPageItems;
                        this.setState({currentPageItems: currentPageItems, currentPage: 1});
                        this.initTodoItems();
                        this.props.openMessageBox('success', "Added TODO item")
                        resolve();
                    },
                    (fail) => {
                        this.props.openMessageBox('error', "Could not add TODO item");
                        reject();
                    }
                )
        });
    }

    async finishToDoItem(itemId) {
        let todoItem = await ToDoListService.finishToDoItem(itemId, this.props.context.loggedInUser);
        let newItems = this.state.currentPageItems;
        newItems.map((item) => {
            if (item._id === itemId)
                item.isFinished = "true";
        });
        this.setState({currentPageItems: newItems});
    }

    async removeToDoItem(itemId) {
        return new Promise((resolve, reject) => ToDoListService.removeToDoItem(itemId, this.props.context.loggedInUser)
            .then(
                (success) => {
                    let currentPageItems = this.state.currentPageItems;
                    let currentPageWithoutElem = currentPageItems.filter((item) => item._id !== itemId);
                    if (this.state.totalItems > 0 && currentPageWithoutElem.length <= 0) {
                        //    we have deleted all the items on this page, but we still have items to display
                        this.setState({
                            currentPage: this.state.currentPage - 1
                        })
                    } else {
                        this.setState({currentPageItems: currentPageWithoutElem});
                    }
                    this.initTodoItems();
                    this.props.openMessageBox("success", "Removed TODO item");

                    resolve();
                },
                (error) => this.props.openMessageBox("error", "Could not delete TODO item")
            )
        )
    }

    async handlePageChange(pageNumber) {
        this.setState({isLoading: true});
        let newPageItems = await this.fetchToDoListPaged(this.state.pageSize, pageNumber);
        this.setState({
            currentPage: pageNumber,
            currentPageItems: newPageItems,
            isLoading: false
        });
    }

    render() {
        let loading = this.state.isLoading ? (<Loading portal={document.getElementsByClassName("todos")[0]}/>) : "";
        return (
            <div className={"todo-list-container"}>
                {loading}
                <MyDaysPagination
                    totalItems={this.state.totalItems}
                    itemsPerPage={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    handlePageChange={this.handlePageChange.bind(this)}/>
                <ToDoView
                    isLoggedIn={this.props.context.isLoggedIn}
                    itemsToDisplay={this.state.currentPageItems}
                    addToDoItem={this.addToDoItem.bind(this)}
                    finishItem={this.finishToDoItem.bind(this)}
                    removeToDoItem={this.removeToDoItem.bind(this)}/>
            </div>
        )
    }
}

export default ContextToPropsHOC(ToDoListController);