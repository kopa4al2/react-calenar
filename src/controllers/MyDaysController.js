import React from 'react';
import PropTypes from 'prop-types';
import MyDaysService from "../services/MyDaysService";
import UtilFunctions from "../components/utils/UtilFunctions";
import Loading from "../components/utils/util-components/Loading";
import {ContextToPropsHOC} from "../components/HOC/ContextToPropsHOC";
import MyDaysButton from "../components/my-days/MyDaysButton";

const propTypes = {
    activeDate: PropTypes.instanceOf(Date).Required,
    handleClickFunction:PropTypes.func
};

class MyDaysController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: this.props.context.loggedInUser,
            isDaySaved: null ,
            currentDayId: null
        }
    }

    componentWillMount() {
        if (this.props.context.loggedInUser) {
            this.getCurrentDayId(this.props.activeDate, this.props.context.loggedInUser);
            this.checkIfDayIsSaved(this.props.activeDate, this.props.context.loggedInUser);
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //          TODO: FIX SOME DAY :)
    //     if(!UtilFunctions.areUsersDtoSame(props.loggedInUser, state.loggedInUser)){
    //         return {loggedInUser: props.loggedInUser}
    //     }
    // }
    componentWillUpdate(nextProps) {

        if (this.state.loggedInUser && !nextProps.context.loggedInUser) {
            this.setState({loggedInUser: null});
            return;
        }
        if (!this.state.loggedInUser && nextProps.context.loggedInUser) {
            this.setState({loggedInUser: nextProps.context.loggedInUser});
            this.checkIfDayIsSaved(nextProps.activeDate, nextProps.context.loggedInUser);
            this.getCurrentDayId(nextProps.activeDate, nextProps.context.loggedInUser)
        }
        if ((nextProps.activeDate !== this.props.activeDate) &&
            nextProps.context.loggedInUser) {
            this.checkIfDayIsSaved(nextProps.activeDate, nextProps.context.loggedInUser);
            this.getCurrentDayId(nextProps.activeDate, nextProps.context.loggedInUser)
        }
    }

    async handleMyDaysButtonClick() {
        this.setState({isLoading: true});
        if (this.state.isDaySaved)
            await this.removeDay();
        else
            await this.saveDay();

        if(this.props.handleClickFunction)
            this.props.handleClickFunction();
    }

    async checkIfDayIsSaved(date, user) {
        MyDaysService.checkIfDayIsSaved(
            UtilFunctions.extractIdByDate(date),
            user)
            .then((isDaySaved) => {
                this.setState({isDaySaved: isDaySaved});
            });
    }

    async getCurrentDayId(date, user) {
        await MyDaysService.getDayIdByDate(date, user).then(
            (id) => {
                if (id)
                    this.setState({currentDayId: id});
                else
                    this.setState({
                        currentDayId: null,
                        isDaySaved: false
                    })
            },
            (error) => {
            })
    }

    async saveDay() {
        MyDaysService.saveToMyDays(
            this.props.activeDate,
            this.state.loggedInUser)
            .then((success) => {
                this.setState({
                    isDaySaved: true,
                    currentDayId: success._id,
                    isLoading: false
                })
            })
    }

    async removeDay() {
        MyDaysService.removeDaysFromMyDay(
            this.state.currentDayId,
            this.state.loggedInUser)
            .then((success) => {
                this.setState({
                    isDaySaved: false,
                    currentDayId: null,
                    isLoading: false
                })
            })
    }

    render() {
        return this.state.isDaySaved === null ?
            (
                <React.Fragment>

                </React.Fragment>
            )
            :
            (
            <React.Fragment>
                {this.state.isLoading ?
                    <Loading/>
                    :
                    <MyDaysButton isDaySaved={this.state.isDaySaved}
                                  handleMyDaysButtonClick={() => this.handleMyDaysButtonClick()}/>
                }
            </React.Fragment>
        )
    }
}

MyDaysController.propTypes = propTypes;
export default ContextToPropsHOC(MyDaysController);