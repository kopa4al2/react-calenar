import React from 'react';
import '../../component-styles/DiaryView.css';

class DiaryView extends React.Component {


    render() {

        return (
            <div className="diary-container">
                <div className="page-wrapper"><div className="page"></div></div>
                <div className="page-wrapper"><div className="page"></div></div>
            </div>
        )
    }
}


export default DiaryView;