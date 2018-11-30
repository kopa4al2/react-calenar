import React from 'react';
import PropTypes from 'prop-types';
import './util-styles/ToolTip.css';

const ToolTip = (props) => {

        function getStyles() {
            return props.customStyle ? props.customStyle : {};
        }

        return (
            <span style={getStyles()} className={`tooltip ${props.position}`}>{props.tooltip}</span>
        )
    }
;
ToolTip.propTypes = {
    tooltip: PropTypes.string.Required,
    customStyle: PropTypes.object,
    position: PropTypes.oneOf("left", "right", "top", "bottom")
};
ToolTip.defaultProps = {
    position:"right"
};
export default ToolTip;
