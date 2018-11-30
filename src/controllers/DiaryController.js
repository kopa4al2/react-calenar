import React from 'react'
import {ContextToPropsHOC} from "../components/HOC/ContextToPropsHOC";
import DiaryView from "../components/diary/DiaryView";

class DiaryController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        // let loading = this.state.isLoading ? (<Loading portal={document.getElementsByClassName("todos")[0]}/>) : "";
        return (
            <React.Fragment>
                <DiaryView/>
            </React.Fragment>
        )
    }
}

export default ContextToPropsHOC(DiaryController);