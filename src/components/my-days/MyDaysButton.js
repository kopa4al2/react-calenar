import React from 'react';
import '../../component-styles/my-days/MyDaysButton.css';
import ToolTip from "../utils/util-components/ToolTip";
import {ContextToPropsHOC} from "../HOC/ContextToPropsHOC";

let customToolTipStyle = {
    marginTop: "-15px",
    marginLeft: "50px",
    width: "100%"
};

class MyDaysButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDaySaved: this.props.isDaySaved
        }
    }

    componentDidMount() {
    //    TODO
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isDaySaved !== state.isDaySaved)
            return {isDaySaved: props.isDaySaved};
        return {}
    }

    render() {
        return (
            <div className={`my-days-button ${!this.props.context.isLoggedIn === null ? "d-none" : ""}`}>
                <button onClick={() => this.props.handleMyDaysButtonClick()}
                        className="tooltip-activator w-100 btn btn-primary">
                    <ToolTip position={"bottom"}
                             tooltip={this.state.isDaySaved ?
                                 "Notes and other changes will remain"
                                 :
                                 "Add to favorites to save notes and some extra features"}
                             customStyle={customToolTipStyle}/>
                    {
                        this.state.isDaySaved ?
                            "Remove day from favorites"
                            :
                            "Save day to my favorites"
                    }
                </button>
            </div>
        )
    }
}

export default ContextToPropsHOC(MyDaysButton);