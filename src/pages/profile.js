import React, { Component } from "react";
import firebase, { firebaseAuth } from "../helpers/firebase";
import { Button, Avatar, Dropdown, Menu, Icon } from "antd";
import styled from "styled-components";
import UsersModel from "../models/users";
import Header from "../components/Header";
import Content from "../components/Content";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import Loading from "../components/Loading";
const UserContainer = styled.div`
  width: 400px;
  height: 150px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: calc(100% - 20px);
    padding: 0 10px;
  }
`;

const TitleUser = styled.h3`
  color: #000;
  font-size: 20px;
  text-align: center;
  font-weight: 300;
  margin-top: ;
`;

class Profile extends Component {
  state = {
    currentUser: {},
    loading: true
  };
  componentDidMount() {
    UsersModel.findOne(this.props.match.params._user)
      .then(data => {
        this.setState({ loading: false, currentUser: data });
      })
      .catch(() => {
        this.props.history.push("/");
      });
  }
  render() {
    if (this.state.loading) return <Loading />;

    let { currentUser } = this.state;
    let { google } = this.props;

    return (
      <div>
        <Header hasBack={true} />;
        <Content>
          <UserContainer>
            <Avatar
              size={100}
              src={currentUser.imgUrl}
              style={{ cursor: "pointer" }}
            />
            <TitleUser>
              {currentUser.name ? currentUser.name : "Without Name"}
            </TitleUser>
          </UserContainer>
          <div>
            <Map
              initialCenter={currentUser.position}
              zoom={8}
              disableDefaultUI
              google={google}
            >
              <Marker position={currentUser.position} />
            </Map>
          </div>
        </Content>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(Profile);
