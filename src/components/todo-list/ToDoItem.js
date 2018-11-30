import React from 'react';
import ToolTip from "../utils/util-components/ToolTip";
import '../../component-styles/ToDoView.css';
import Confirmation from "../utils/util-components/Confirmation";

const customToolTipStyle = {
    "marginTop": "-35px"
};

const ToDoItem = (props) => {

    function checkUncheckInput(e) {
        props.finishItem(props.item._id, e.target.checked);
    }

    return (
        <div className={"todo-list-row"} id={props.id}>
            <div className="form-check">
                <input onChange={checkUncheckInput}
                       disabled={props.item.isFinished === "true"}
                       checked={props.item.isFinished === "true"}
                       type="checkbox"/>
                <span className={props.item.isFinished === "true" ? "checked" : "unchecked"}>
                    {props.item.content}
                </span>
            </div>
            <span onClick={() => props.openConfirmation(props.item._id)}
                  className={"tooltip-activator"}>
                        <a href={"#"}>X</a>
                        <ToolTip position={"top"} tooltip={"Remove"} customStyle={customToolTipStyle}/>
                    </span>
        </div>
    )
};

export default ToDoItem;