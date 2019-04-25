import React, { Component } from "react";
import { Icon, Dropdown, Menu, message } from "antd";

class Image extends Component {
  state = {
    isDropDownShowing: false
  };
  setDropDown = value => {
    this.setState({ isDropDownShowing: value });
  };
  menu = () => {
    const {
      className,
      src,
      toggleFullscreen,
      index,
      ratioClassName,
      toggleIsModalVisible,
      addMediaToCollection,
      firebaseId,
      fullscreen,
      collections
    } = this.props;
    const lists = Object.keys(collections).reverse();
    const srcKey = className === "gif" ? "url" : "low";
    const listMenuItem = lists.map(list => (
      <Menu.Item
        key={list}
        onClick={() => {
          addMediaToCollection({ [firebaseId]: { [className]: { className: ratioClassName, [srcKey]: src } } }, list);
          this.setDropDown(false);
          message.info(`Added to collection ${list}`);
        }}
      >
        {list}
      </Menu.Item>
    ));
    return (
      <Menu>
        <h4 style={{ marginLeft: "4px" }}>
          <Icon type="bars" /> Add to collection
          <Icon onClick={() => this.setDropDown(false)} type="close" />
        </h4>

        {!lists.length && (
          <div onClick={() => toggleIsModalVisible()}>
            <Icon style={{ marginLeft: 4 }} type="login" />
            Log in or register
          </div>
        )}
        {listMenuItem}
      </Menu>
    );
  };
  render() {
    const { isDropDownShowing } = this.state;
    const {
      className,
      src,
      toggleFullscreen,
      index,
      ratioClassName,
      toggleIsModalVisible,
      addMediaToCollection,
      firebaseId,
      fullscreen
    } = this.props;
    return (
      <React.Fragment>
        <img
          onClick={() => {
            this.this.setDropDown(false);
            toggleFullscreen(index);
          }}
          alt="Could not be loaded"
          className={className}
          // ref={img => (this.img = img)}
          src={src}
        />

        <Dropdown
          overlayStyle={{ zIndex: fullscreen ? 1231231231231231 : 2 }}
          overlayClassName="mediaAddDropdown"
          placement="topRight"
          visible={isDropDownShowing}
          overlay={this.menu()}
        >
          <div
            style={{ zIndex: fullscreen ? 1231231231231231 : 2 }}
            onClick={() => this.setDropDown(!isDropDownShowing)}
            className="addNewMediaIcon"
            onBlur={() => this.setDropDown(false)}
          >
            <Icon
              style={{ zIndex: fullscreen ? 1231231231231231 : 2 }}
              className="addNewMediaIcon"
              type={isDropDownShowing ? "up" : "plus"}
            />
          </div>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default Image;
