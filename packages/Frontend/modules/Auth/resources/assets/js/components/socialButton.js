import PropTypes from "prop-types";
import React, { Component } from "react";

import SocialLogin from "./SocialLogin/index";

class Button extends Component {
    static propTypes = {
        triggerLogin: PropTypes.func.isRequired
        //triggerLogout: PropTypes.func.isRequired
    };

    render() {
        const { children, triggerLogin, triggerLogout, ...props } = this.props;
        const style = {
            cursor: "pointer",
            width: "100%"
        };

        return (
            <div
                onClick={triggerLogin}
                style={style}
                {...props}
            >
                {children}
            </div>
        );
    }
}

export default SocialLogin(Button);
