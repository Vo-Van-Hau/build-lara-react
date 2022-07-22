import React, { Fragment } from "react";
import List from "./List";
import Edit from "./Edit";
import queryString from "query-string";

export class Index extends React.Component {

    constructor(props) {

            super(props);

            this.state = {
                action: "list",
                loading: true
            };
    }

    getAction = () => {

        const { action } = queryString.parse(this.props.history.location.search);

        if (action != undefined) {

            this.setState({
                action: action
            });
        }

        this.setState({
            loading: false
        });
    };

    componentDidMount() {

            this.getAction();
    }

    componentWillUnmount() {}

    render() {

        if (this.state.loading)  return <></>;

        switch (this.state.action) {

            case 'list':
                return <List {...this.props} />;

            case 'edit':
                return <Edit {...this.props}/>;

            default: return <Fragment><h1>Not Found</h1></Fragment>
        }
    }
}
