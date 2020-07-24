import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import PickerSelect from 'react-native-picker-select';
import {TextField} from 'react-native-material-textfield';
import Spinner from 'react-native-loading-spinner-overlay';

import * as actions from '../store/actions';
import {CheckedIcon, UncheckedIcon} from '../images/svg-icons';
import InputField from '../components/InputField';
import {add} from '../lib/utils';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidUserName: true,
      isValidEmail: true,
      isValidPassword: true,
      isValidPhoneNumber: true,
      isValidAddress: true,
      isValidRole: true,
      useLocation: true,
      selectedRole: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.getLocation();
  }

  handleTextChange = (text, fieldName) => {
    this.setState({
      ...this.state,
      [fieldName]: text,
    });
  };

  handleToggleUseLocation = () => {
    this.setState(prevState => {
      return {
        ...this.state,
        useLocation: !prevState.useLocation,
      };
    });
  };

  handleSignup = () => {
    const {name, phone, email, password, address, selectedRole} = this.state;
    const userData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password: password.trim(),
      address: address.trim(),
      role: selectedRole.trim(),
      location: this.props.locationStr.trim(),
    };

    // console.log(userData);
    if (
      !name.trim().length ||
      !phone.trim().length ||
      !email.trim().length ||
      !password.trim().length ||
      !address.trim().length ||
      !selectedRole.trim().length ||
      !this.props.locationStr.trim().length
    ) {
      Alert.alert('Error', 'All fields are required', [{text: 'OK'}]);
    } else {
      this.props.registerUser(userData);
    }

    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('Tabs');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.isError
          ? Alert.alert('Error', this.props.message, [
              {text: 'OK', onPress: () => this.props.resetErrorState()},
            ])
          : null}
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={styles.welcomeTextStyle}>Join us</Text>
        <Text style={styles.subTextStyle}>Sign up to continue</Text>
        <View style={styles.signupFormContainer}>
          <View style={styles.inputContainer}>
            <TextField
              style={styles.input}
              labelTextStyle={styles.floatingInputLabel}
              labelFontSize={20}
              label="Full Name"
              value={this.state.name}
              onChangeText={t => this.handleTextChange(t, 'name')}
              onSubmitEditing={this.handleSignup}
              returnKeyType="next"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              keyboardType="email-address"
              placeholder="Enter your full name"
            />
            {!this.state.isValidUserName ? (
              <Text style={styles.errorText}>Enter your name</Text>
            ) : null}
          </View>
          <View style={styles.inputContainer}>
            <TextField
              style={styles.input}
              labelTextStyle={styles.floatingInputLabel}
              labelFontSize={20}
              label="Email"
              value={this.state.email}
              onChangeText={t => this.handleTextChange(t, 'email')}
              onSubmitEditing={this.handleSignup}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              keyboardType="email-address"
              placeholder="Enter your email"
            />
            {!this.state.isValidEmail ? (
              <Text style={styles.errorText}>Enter a valid email</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextField
              secureTextEntry
              labelFontSize={20}
              labelTextStyle={styles.floatingInputLabel}
              label="Password"
              value={this.state.password}
              onChangeText={t => this.handleTextChange(t, 'password')}
              style={styles.input}
              onSubmitEditing={this.handleSignup}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              characterRestriction={20}
              placeholder="Enter your password"
            />
            {!this.state.isValidPassword ? (
              <Text style={styles.errorText}>
                Please enter a valid password
              </Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextField
              style={styles.input}
              labelTextStyle={styles.floatingInputLabel}
              labelFontSize={20}
              label="Mobile Number"
              value={this.state.phone}
              onChangeText={t => this.handleTextChange(t, 'phone')}
              placeholder="Enter your 10 digit mobile number"
              keyboardType="phone-pad"
              onSubmitEditing={this.handleSignup}
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              characterRestriction={10}
            />
            {!this.state.isValidPhoneNumber ? (
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

          <View style={styles.inputContainer}>
            <TextField
              style={styles.input}
              labelTextStyle={styles.floatingInputLabel}
              labelFontSize={20}
              label="Address"
              autoCorrect={false}
              value={this.state.address}
              onChangeText={t => this.handleTextChange(t, 'address')}
              multiline
              onSubmitEditing={this.handleSignup}
              enablesReturnKeyAutomatically={true}
              characterRestriction={150}
              placeholder="Enter your home address"
            />
            {!this.state.isValidAddress ? (
              <Text style={styles.errorText}>
                Please enter your 10 digit mobile number
              </Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={this.handleToggleUseLocation}>
                {this.state.useLocation ? (
                  <CheckedIcon height="20" width="20" />
                ) : (
                  <UncheckedIcon height="20" width="20" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                {' '}
                Use my current location{' '}
              </Text>
            </View>
            <InputField
              style={
                this.state.useLocation ? styles.textInputDisabled : styles.input
              }
              value={this.props.locationStr}
              label="Location"
              labelTextStyle={styles.floatingInputLabel}
              labelFontSize={20}
              onChangeText={t => this.props.updateLocation(t)}
              onSubmitEditing={this.handleSignup}
              returnKeyType="send"
              enablesReturnKeyAutomatically={true}
              placeholder="street address, city, state"
              editable={!this.state.useLocation}
            />
          </View>
        </View>
        <View style={styles.signupBtnContainer}>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={this.handleSignup}>
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
    fontSize: 20,
    fontFamily: 'IBMPlexSans-Medium',
    paddingBottom: 10,
    color: 'rgb(152, 154, 163)',
  },
  floatingInputLabel: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  input: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#ddd',
    color: '#999',
  },
  errorText: {
    marginTop: 5,
    color: 'red',
    fontFamily: 'IBMPlexSans-Medium',
  },
  signupBtnContainer: {
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 5,
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
    // borderColor: '#D0E2FF',
    // borderWidth: 2,
    // padding: 16,
    // marginBottom: 25,
    fontSize: 16,
  },
  selectorAndroid: {
    fontFamily: 'IBMPlexSans-Medium',
    color: 'black',
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
  checkboxContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 16,
  },
  spinnerTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
  },
});

const mapStateToProps = state => {
  return {
    locationStr: state.user.location,
    isLoading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    isError: state.user.error,
    message: state.user.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLocation: () => dispatch(actions.getUserLocation()),
    updateLocation: locationStr =>
      dispatch(actions.updateUserLocation(locationStr)),
    registerUser: userData => dispatch(actions.registerUser(userData)),
    resetErrorState: () => dispatch(actions.resetErrorState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
