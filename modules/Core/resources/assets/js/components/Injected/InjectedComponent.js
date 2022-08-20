import React, { Component, useState, useEffect, useContext } from 'react';
import { CoreContext } from '../Contexts/CoreContext';

const InjectedComponent = (gbprops) => {

    const { data } = useContext(CoreContext);
    const { component: Component, ...props } = gbprops;
    console.log(props);

    const [error, setError] = useState(null);

    useEffect(function() {

    }, []);

    if(!error) return (<><Component {...props} /></>)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>
                            500
                        </h2>
                        <div className="error-details"></div>
                        <div className="error-actions"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InjectedComponent;
