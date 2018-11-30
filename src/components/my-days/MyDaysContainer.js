import React from 'react';
import CalendarDay from "./CalendarDay";
import '../../component-styles/my-days/MyDaysContainer.css';
import Loading from "../utils/util-components/Loading";
import MyDaysPagination from "./MyDaysPagination";
import MyDaysService from "../../services/MyDaysService";


class MyDaysContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.loggedInUser,
            totalItems: 0,
            pageSize: 3,
            currentPage: 1,
            currentPageItems: [],
            isLoading: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isLoggedIn && props.currentUser) {
            return {currentUser: props.currentUser}
        }
        return {
            currentUser: undefined,
            totalItems: 0,
            currentPageItems: []
        };
    }

    componentDidMount() {
        if (this.state.currentPageItems.length === 0 && this.state.currentUser)
            this.fetchDays();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isLoading)
            return;
        if (!this.props.isLoggedIn || !this.state.currentUser)
            return;

        if (this.state.totalItems === 0 || this.state.currentPageItems.length === 0)
            this.fetchDays();
    }

    fetchDays() {
        this.setState({isLoading: true});
        MyDaysService.getDaysCount(this.state.currentUser).then((resp) => {
            MyDaysService.getDaysPaged(this.state.pageSize, this.state.currentPage, this.state.currentUser)
                .then((resp) => {
                    this.setState({
                        currentPageItems: resp,
                        isLoading: false
                    });
                });
            this.setState({totalItems: resp.count});
        });
    }

    handlePageChange(pageNumber) {
        this.setState({isLoading: true});
        MyDaysService.getDaysPaged(this.state.pageSize, pageNumber, this.state.currentUser)
            .then((pageOfItems) => {
                this.setState({
                    currentPageItems: pageOfItems,
                    isLoading: false,
                    currentPage: pageNumber
                });
            });
    }

    renderDays() {
        if (!this.state.currentUser)
            return <div>"Please log in to view favorite days"</div>;
        let output = [];
        this.state.currentPageItems.map((item) => {
            output.push(<CalendarDay
                key={item._id}
                openMessageBox={this.props.openMessageBox}
                currentDateId={item.dayId}
                shouldCheckIfDaysAreChanged={() => this.fetchDays()}/>)
        });

        return output

    }

    render() {
        let loading = this.state.isLoading ? <Loading/> : "";
        return (
            <React.Fragment>
                <div className="top-div">
                    <MyDaysPagination
                        totalItems={this.state.totalItems}
                        itemsPerPage={this.state.pageSize}
                        currentPage={this.state.currentPage}
                        handlePageChange={this.handlePageChange.bind(this)}/>
                </div>
                <div className="my-days-container">
                    {loading}
                    {this.renderDays()}
                </div>
            </React.Fragment>
        )
    }
}

export default MyDaysContainer;
