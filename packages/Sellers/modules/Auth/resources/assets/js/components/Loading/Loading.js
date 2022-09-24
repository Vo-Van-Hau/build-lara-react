import { Fragment, useContext } from "react";
const Loading = ({ history, ...props }) => {
    return (
        <Fragment>
            <div id="page-loading-circle">
                <div className="loader">
                    <div className="loader">
                        <div className="loader">
                            <div className="loader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Loading;
