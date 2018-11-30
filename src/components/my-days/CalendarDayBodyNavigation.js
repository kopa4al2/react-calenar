import React from 'react';
import '../../component-styles/CalendarDayBodyNavigation.css';

class CalendarDayBodyNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLinks: {
                isNotesActive: true,
                diaryActive: false,
                isTodoListActive: false
            }
        };
        this.handleLinkClick = this.handleLinkClick.bind(this)
    }

    handleLinkClick(e) {
        let activeLinks = {};
        for (let [activeLink] of Object.entries(this.state.activeLinks)) {
            activeLinks[activeLink] = activeLink.toLowerCase().includes(e.target.name.toLowerCase());
        }
        this.props.linkChangeHandler(activeLinks);
        this.setState({activeLinks: activeLinks})
    }

    render() {
        return (
            <div className={`calendar-day-body-navigation `}>
                <ul>
                    <li className={this.state.activeLinks.isNotesActive ? "active" : ""}>
                        <a
                           onClick={this.handleLinkClick}
                           name="notes"
                           href="#">
                        Notes
                    </a></li>
                    <li className={this.state.activeLinks.isTodoListActive ? "active" : ""}>
                        <a
                           onClick={this.handleLinkClick}
                           name="todolist"
                           href="#">
                        TODO List
                    </a></li>
                    <li className={this.state.activeLinks.diaryActive ? "active" : ""}>
                        <a
                           onClick={this.handleLinkClick}
                           name="diary"
                           href="#">
                        Diary
                    </a></li>
                </ul>
            </div>
        )
    }
}

export default CalendarDayBodyNavigation;