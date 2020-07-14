import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Enter your email"
            />
            {!this.state.isValidEmail ? (
              <Text style={styles.errorText}>Enter a valid email</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="Enter your password"
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
            onPress={() => this.props.navigation.navigate('Tabs')}>
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
  },
  subTextStyle: {
    color: 'rgb(173,173,173)',
    fontSize: 18,
  },
  logInFormContainer: {
    marginVertical: 40,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 24,
  },
  input: {
    borderBottomColor: 'rgb(183,183,183)',
    borderBottomWidth: 1,
    padding: 0,
    fontSize: 16,
  },
  errorText: {
    marginTop: 5,
    color: 'red',
  },
  loginBtnContainer: {
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 10,
  },
  loginBtn: {
    padding: 15,
  },
  loginTextStyle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default SignIn;
