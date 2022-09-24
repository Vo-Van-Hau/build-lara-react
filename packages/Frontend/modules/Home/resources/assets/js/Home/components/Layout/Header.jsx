import React from "react";
import { Breadcrumb } from 'antd';

export default class Header extends React.Component {
    render() {
        return (
            <Breadcrumb style={{marginBottom:16}}>
                <Breadcrumb.Item>System</Breadcrumb.Item>
                <Breadcrumb.Item>Users</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
            </Breadcrumb>
        );
    }
}
