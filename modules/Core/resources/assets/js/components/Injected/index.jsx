// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { CoreContext } from "../Contexts/CoreContext";

// export default class InjectedComponent extends Component {
//     static contextType = CoreContext;

//     static propTypes = {
//         component: PropTypes.func.isRequired
//     };

//     state = { error: null };

//     componentDidMount() {
//         const { data } = this.context;
//         const { config } = data;
//         this.setState({ config: config });
//     }

//     componentDidCatch(error, info) {
//         console.error(error, info);
//         this.setState({ error });
//     }

//     render() {
//         const { component: Component, ...props } = this.props;
//         const { t } = this.props;
//         if (!this.state.error) {
//             return <Component {...props} />;
//         }
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="error-template">
//                             <h1>Oops!</h1>
//                             <h2>
//                                 404 {this.props.t('core:error.not_found')}
//                             </h2>
//                             <div className="error-details">

//                                 {this.props.t('core:error.an_error_has_occured')}
//                             </div>
//                             <div className="error-actions">
//                                 <a
//                                     href={this.state.config.app.backendURL}
//                                     className="btn btn-primary btn-lg"
//                                 >
//                                     <span className="glyphicon glyphicon-home"></span>
//                                     {this.props.t('core:error.take_me_home')}{" "}
//                                 </a>
//                                 <a
//                                     href={this.state.config.app.backendURL}
//                                     className="btn btn-default btn-lg"
//                                 >
//                                     <span className="glyphicon glyphicon-envelope"></span>{" "}
//                                     {this.props.t('core:error.contact_support')}{" "}{" "}
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
