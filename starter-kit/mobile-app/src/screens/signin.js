import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {TextField} from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';

import * as actions from '../store/actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidEmail: true,
      isValidPassword: true,
      email: '',
      password: '',
    };
  }

  handleTextChange = (text, fieldName) => {
    this.setState({
      ...this.state,
      [fieldName]: text,
    });
  };

  handleSighIn = () => {
    const {email, password} = this.state;
    const userData = {
      email,
      password,
    };

    if (!email.trim().length || !password.trim().length) {
      Alert.alert('Error', 'All fields are required', [{text: 'OK'}]);
    } else {
      this.props.auth(userData);
    }

    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('Tabs');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={styles.welcomeTextStyle}>Welcome back</Text>
        <Text style={styles.subTextStyle}>Sign in to continue</Text>
        <View style={styles.logInFormContainer}>
          <View style={styles.inputContainer}>
            <TextField
              style={styles.input}
              labelTextStyle={styles.floatingInputLabel}
              label="Email"
              labelFontSize={20}
              keyboardType="email-address"
              placeholder="Enter your email"
              value={this.state.email}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={t => this.handleTextChange(t, 'email')}
              onSubmitEditing={this.handleSighIn}
              returnKeyType="send"
              enablesReturnKeyAutomatically={true}
            />
            {!this.state.isValidEmail ? (
              <Text style={styles.errorText}>Enter a valid email</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextField
              secureTextEntry
              label="Password"
              labelTextStyle={styles.floatingInputLabel}
              labelFontSize={20}
              characterRestriction={20}
              style={styles.input}
              placeholder="Enter your password"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.password}
              onChangeText={t => this.handleTextChange(t, 'password')}
              onSubmitEditing={this.handleSighIn}
              returnKeyType="send"
              enablesReturnKeyAutomatically={true}
            />
            {!this.state.isValidPassword ? (
              <Text style={styles.errorText}>
                Please enter a valid password
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.loginBtnContainer}>
          <TouchableOpacity style={styles.loginBtn} onPress={this.handleSighIn}>
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
    fontSize: 20,
    fontFamily: 'IBMPlexSans-Medium',
    paddingBottom: 10,
  },
  floatingInputLabel: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  input: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontFamily: 'IBMPlexSans-Medium',
  },
  loginBtnContainer: {
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 5,
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
  spinnerTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
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
    auth: userData => dispatch(actions.authUser(userData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
