import React, { Component } from "react";
import posed from "react-pose";
import { Helmet } from "react-helmet";
import { cx } from "emotion";

import SignupForm from "./SignupForm";
import SignupSuccess from "./SignupSuccess";
import Container from "../../components/Container";
import Text from "../../components/Text";

import API from "../../api";

import styles from "./styles";
import logo from "../../assets/logo.png";
import doggy from "../../assets/dog-avatar.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignupSuccess: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values, bag) {
    try {
      delete values.confirmPassword;
      const payload = {
        campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
        data: { ...values },
      };
      const data = await API.signup(payload);
      bag.setSubmitting(false);
      this.setState({ isSignupSuccess: true });
    } catch (e) {
      bag.setSubmitting(false);
      bag.setErrors(API.setErrors(e.response.data.errors.details.errors));
    }
  }

  render() {
    const PoseSignupForm = posed(SignupForm)({
      visible: { opacity: 1 },
      invisible: { opacity: 0, display: "none" },
    });

    const PoseSignupSuccess = posed(SignupSuccess)({
      visible: { opacity: 1 },
      invisible: { opacity: 0, display: "none" },
    });

    return (
      <Container fluid style={styles.mainContainer}>
        <Helmet>
          <title>Signup - Bitcharge</title>
        </Helmet>
        <Container style={styles.heroContainer}>
          <Container style={styles.heroLogoContainer}>
            <a href="/">
              <img
                alt="raisely-logo"
                className={cx(styles.logoImageStyle)}
                src={logo}
              />
            </a>
          </Container>
          <Container style={styles.heroTextContainer}>
            <img
              alt="signup-avatar"
              className={cx(styles.signupAvatarIconStyle)}
              src={doggy}
            />
            <Text tag="h3" style={styles.heroText}>
              Let's get you set up.
            </Text>
          </Container>
        </Container>
        <Container style={styles.bodyContainer}>
          <PoseSignupForm
            pose={this.state.isSignupSuccess ? "invisible" : "visible"}
            onSubmit={this.handleSubmit}
          />
          <PoseSignupSuccess
            pose={this.state.isSignupSuccess ? "visible" : "invisible"}
          />
        </Container>
      </Container>
    );
  }
}

export default Signup;
