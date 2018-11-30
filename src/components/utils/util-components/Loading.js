import React from 'react';
import './util-styles/Loading.css';
import * as ReactDOM from "react-dom";

const Loading = (props) => {
    let render = <div className="loading-background">
        <div className="loading-wrapper">
            <div className="loading-inner">
            </div>
        </div>
    </div>;
    if (props.portal)
        return ReactDOM.createPortal(render, props.portal);
    else
        return (
            render
        )
};

export default Loading;
