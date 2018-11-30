import React from 'react';
import PropTypes from 'prop-types';
import '../../component-styles/my-days/MyDaysPagination.css';

const propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired
};

class MyDaysPagination extends React.Component {
    constructor(props) {
        super(props);
        //Must be ODD number or else BUG
        const MAX_PAGES_VISIBLE_AT_ONCE = 5;
        this.state = {
            totalPages: null,
            currentPage: null,
            leftMostPage: 1,
            rightMostPage: undefined,
            maxPages: MAX_PAGES_VISIBLE_AT_ONCE
        }
    }

    static getDerivedStateFromProps(props, thisState) {
        if (props.totalItems !== thisState.totalItems
            || props.currentPage !== thisState.currentPage) {
            let totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
            if (totalPages > thisState.maxPages) {
                let numberOfPagesAroundCurrentPage = Math.floor(thisState.maxPages / 2);
                let rightMostPage = thisState.maxPages;
                let leftMostPage = 1;
                if (props.currentPage > numberOfPagesAroundCurrentPage) {
                    leftMostPage = props.currentPage - numberOfPagesAroundCurrentPage;
                    if (props.currentPage + numberOfPagesAroundCurrentPage > props.totalItems)
                        rightMostPage = props.totalItems;
                    else
                        rightMostPage = props.currentPage + numberOfPagesAroundCurrentPage;
                }
                return {
                    leftMostPage: leftMostPage,
                    rightMostPage: rightMostPage,
                    totalPages: totalPages,
                    currentPage: props.currentPage
                };
            }
            return {
                totalPages: totalPages,
                currentPage: props.currentPage,
                rightMostPage: totalPages
            };
        }
        return {};
    }

    renderPageLinks() {
        if (!this.state.totalPages || this.state.totalPages <= 1)
            return;
        let pageBar = [];
        pageBar.push(<li
            className={this.state.currentPage === 1 ? "disabled" : ""}
            key={"prev-page"}>
            <a onClick={() => this.prevPage()} href="#">Previous</a>
        </li>);
        for (let i = this.state.leftMostPage; i <= this.state.rightMostPage; i++) {
            let activeClassName = this.state.currentPage === i ? "active" : "";
            pageBar.push(<li key={"page-link" + i}>
                <a
                    className={activeClassName}
                    onClick={() => this.handleLinkClick(i)} href="#">{i}</a>
            </li>)
        }
        pageBar.push(<li
            className={this.state.currentPage === this.state.totalPages ? "disabled" : ""}
            key={"next-page"}>
            <a onClick={() => this.nextPage()} href="#">Next</a>
        </li>);
        return pageBar;
    }

    handleLinkClick(pageNumber) {
        this.setState({currentPage: pageNumber});
        this.props.handlePageChange(pageNumber);
    }

    prevPage() {
        return this.handleLinkClick(this.state.currentPage - 1);
    }

    nextPage() {
        return this.handleLinkClick(this.state.currentPage + 1);
    }

    render() {
        return (
            <div className="my-days-pagination">
                <ul className="page-bar">
                    {this.renderPageLinks()}
                </ul>
            </div>
        )
    }
}

export default MyDaysPagination;