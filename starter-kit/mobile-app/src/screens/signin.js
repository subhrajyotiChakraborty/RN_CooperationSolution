import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {TextField} from 'react-native-material-textfield';

import * as actions from '../store/actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidEmail: true,
      isValidPassword: true,
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcomeTextStyle}>Welcome back</Text>
        <Text style={styles.subTextStyle}>Sign in to continue</Text>
        <View style={styles.logInFormContainer}>
          <View style={styles.inputContainer}>
            <TextField
              // style={styles.input}
              label="Email"
              labelFontSize={16}
              keyboardType="email-address"
              // placeholder="Enter your email"
            />
            {!this.state.isValidEmail ? (
              <Text style={styles.errorText}>Enter a valid email</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextField
              secureTextEntry
              label="Password"
              labelFontSize={16}
              characterRestriction={20}
              // style={styles.input}
              // placeholder="Enter your password"
            />
            {!this.state.isValidPassword ? (
              <Text style={styles.errorText}>
                Please enter a valid password
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              this.props.auth();
              if (this.props.isLoggedIn) {
                this.props.navigation.navigate('Tabs');
              }
            }}>
            <Text style={styles.loginTextStyle}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  welcomeTextStyle: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 5,
    fontFamily: 'IBMPlexSans-Medium',
  },
  subTextStyle: {
    color: 'rgb(173,173,173)',
    fontSize: 18,
    fontFamily: 'IBMPlexSans-Medium',
  },
  logInFormContainer: {
    marginVertical: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
    paddingBottom: 10,
  },
  input: {
    borderBottomColor: 'rgb(183,183,183)',
    borderBottomWidth: 1,
    padding: 0,
    fontSize: 16,
    fontFamily: 'IBMPlexSans-Medium',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontFamily: 'IBMPlexSans-Medium',
  },
  loginBtnContainer: {
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 10,
  },
  loginBtn: {
    padding: 15,
  },
  loginTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: () => dispatch(actions.authUser({})),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
