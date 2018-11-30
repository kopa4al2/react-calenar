import React from 'react';
import '../../../component-styles/DayBlockStyle.css';

const DayBlock = (props) => {

    return (
        <div className={`day-block ${props.className}`}
             onClick={() => props.clickHandler(props)}>
            {props.value}
        </div>
    );
};

export default DayBlock;