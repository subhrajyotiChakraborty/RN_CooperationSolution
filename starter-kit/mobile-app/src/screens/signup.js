import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import PickerSelect from 'react-native-picker-select';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidUserName: true,
      isValidEmail: true,
      isValidPassword: true,
      isValidPhoneNumber: true,
      isValidAddress: true,
      selectedRole: '',
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcomeTextStyle}>Join us</Text>
        <Text style={styles.subTextStyle}>Sign up to continue</Text>
        <View style={styles.signupFormContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Enter your full name"
            />
            {!this.state.isValidUserName ? (
              <Text style={styles.errorText}>Enter your name</Text>
            ) : null}
          </View>
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

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your 10 digit mobile number"
              keyboardType="phone-pad"
            />
            {!this.state.isValidPhoneNumber ? (
              <Text style={styles.errorText}>
                Please enter your 10 digit mobile number
              </Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your home address"
            />
            {!this.state.isValidAddress ? (
              <Text style={styles.errorText}>
                Please enter your 10 digit mobile number
              </Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>User Role</Text>
            <PickerSelect
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: styles.selector,
                inputAndroid: styles.selectorAndroid,
              }}
              value={this.state.selectedRole}
              onValueChange={t =>
                this.setState({...this.state, selectedRole: t})
              }
              items={[
                {label: 'Social Worker', value: 'Social Worker'},
                {label: 'Teacher', value: 'Teacher'},
                {label: 'Doctor', value: 'Doctor'},
                {label: 'Business Owner', value: 'Business Owner'},
                {label: 'Technical Person', value: 'Technical Person'},
              ]}
              placeholder={{
                label: 'Select your role...',
              }}
              placeholderTextColor="rgb(128, 128, 128)"
            />
            {!this.state.isValidAddress ? (
              <Text style={styles.errorText}>Please select you role</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.signupBtnContainer}>
          <TouchableOpacity style={styles.signupBtn}>
            <Text style={styles.signupTextStyle}>Sign Up</Text>
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
  signupFormContainer: {
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
  signupBtnContainer: {
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 10,
    marginBottom: 30,
  },
  signupBtn: {
    padding: 15,
  },
  signupTextStyle: {
    fontSize: 18,
    fontFamily: 'IBMPlexSans-Medium',
    color: '#fff',
    textAlign: 'center',
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25,
    fontSize: 16,
  },
  selectorAndroid: {
    fontFamily: 'IBMPlexSans-Medium',
    color: 'black',
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
});
export default Signup;
