import React, { Component } from "react";
import { Layout, Menu, Dropdown, Icon } from "antd";
import Compose from "./loggedin/Compose";
import Inbox from "./loggedin/Inbox";
import Sent from "./loggedin/Sent";

import { fetchUserProfilesForCache } from "./../helpers/slack";
import { clearCache } from "./../helpers/electron";

export default class LoggedIn extends Component {
  state = {
    selectedKey: "compose",
  };

  componentDidMount() {
    this.prefetch();
  }

  prefetch() {
    const token = this.props.user.accessToken;
    fetchUserProfilesForCache(token);
  }

  onClickMenu = p => {
    switch (p.key) {
      case "signout":
        clearCache();
        break;
    }
  };

  render() {
    let selectedComponent = null;
    switch (this.state.selectedKey) {
      case "compose":
        selectedComponent = <Compose user={this.props.user} />;
        break;
      case "inbox":
        selectedComponent = <Inbox user={this.props.user} />;
        break;
      case "sent":
        selectedComponent = <Sent user={this.props.user} />;
        break;
    }
    const menu = (
      <Menu onClick={this.onClickMenu}>
        <Menu.Item key="signout">Sign out</Menu.Item>
      </Menu>
    );
    return (
      <Layout className="container loggedIn">
        <Layout.Sider breakpoint="lg" collapsedWidth="0">
          <div style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
            <h3 style={{ color: "#fff" }}>{this.props.user.channel.name}</h3>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <a
                className="ant-dropdown-link"
                href="#"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {this.props.user.profile.display_name}
                <Icon type="down" />
              </a>
            </Dropdown>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.state.selectedKey]}
            onSelect={selected => {
              this.setState({
                selectedKey: selected.key,
              });
            }}
          >
            <Menu.Item key="compose">
              <span className="nav-text">Compose</span>
            </Menu.Item>
            <Menu.Item key="inbox">
              <span className="nav-text">Inbox</span>
            </Menu.Item>
            <Menu.Item key="sent">
              <span className="nav-text">Sent</span>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout style={{ background: "#ffffff" }}>
          <Layout.Content style={{ padding: "1rem" }}>
            {selectedComponent}
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>
            daily ©2018 Created by gotokatsuya
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}
