import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {CheckedIcon, UncheckedIcon} from '../images/svg-icons';
import * as actions from '../store/actions';

class SOS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      useLocation: true,
      selectedService: '',
      firstSection: [
        {
          name: 'doctor',
          label: 'DOCTOR',
          isSelected: false,
        },
        {
          name: 'home-flood',
          label: 'FLOOD',
          isSelected: false,
        },
        {
          name: 'ambulance',
          label: 'AMBULANCE',
          isSelected: false,
        },
      ],
      secondSection: [
        {
          name: 'fire-truck',
          label: 'FIRE',
          isSelected: false,
        },
        {
          name: 'food',
          label: 'FOOD',
          isSelected: false,
        },
        {
          name: 'police-badge',
          label: 'POLICE',
          isSelected: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getLocation();
  }

  handleMyLocationPress = () => {
    this.props.getLocation();
    if (!this.state.useLocation) {
      this.handleToggleUseLocation();
    }
  };

  handleToggleUseLocation = () => {
    this.setState(prevState => {
      return {
        ...this.state,
        useLocation: !prevState.useLocation,
      };
    });
  };

  handleEmergencySelection = name => {
    const newFirstSection = [...this.state.firstSection];
    const newSecondSection = [...this.state.secondSection];

    let newSelectedService = '';
    newFirstSection.forEach(item => {
      if (item.label === name) {
        item.isSelected = !item.isSelected;
        newSelectedService = item.isSelected ? name : '';
      } else {
        item.isSelected = false;
      }
    });

    newSecondSection.forEach(item => {
      if (item.label === name) {
        item.isSelected = !item.isSelected;
        newSelectedService = item.isSelected ? name : '';
      } else {
        item.isSelected = false;
      }
    });

    this.setState({
      ...this.state,
      firstSection: newFirstSection,
      secondSection: newSecondSection,
      selectedService: newSelectedService.toLowerCase(),
    });
  };

  handleRequest = () => {
    if (
      !this.state.selectedService.trim().length ||
      !this.props.locationStr.trim().length
    ) {
      Alert.alert(
        'Error',
        'Please select a service and provide your location.',
        [{text: 'OK'}],
      );
    } else {
      this.props.navigation.navigate('Details', {
        emergencyService: this.state.selectedService,
        emergencyLocation: this.props.locationStr,
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.sosContainer}>
          <Text style={styles.emrgText}>What kind of emergency?</Text>
          <View style={styles.emergencyTilesContainer}>
            {this.state.firstSection.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={Platform.OS === 'ios' ? styles.tile_iOS : styles.tile}
                  onPress={() => this.handleEmergencySelection(item.label)}>
                  <View style={styles.tileIcon}>
                    <Icons name={item.name} size={40} color="white" />
                    {item.isSelected ? (
                      <Icons
                        style={
                          Platform.OS === 'ios'
                            ? styles.checkMarkIcon_iOS
                            : styles.checkMarkIcon
                        }
                        name="check-circle"
                        size={25}
                        color="white"
                      />
                    ) : null}
                  </View>
                  <Text style={styles.tileText}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.emergencyTilesContainer}>
            {this.state.secondSection.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={Platform.OS === 'ios' ? styles.tile_iOS : styles.tile}
                  onPress={() => this.handleEmergencySelection(item.label)}>
                  <View style={styles.tileIcon}>
                    <Icons name={item.name} size={40} color="white" />
                    {item.isSelected ? (
                      <Icons
                        style={
                          Platform.OS === 'ios'
                            ? styles.checkMarkIcon_iOS
                            : styles.checkMarkIcon
                        }
                        name="check-circle"
                        size={25}
                        color="white"
                      />
                    ) : null}
                  </View>
                  <Text style={styles.tileText}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.userLocationContainer}>
            <View style={styles.whereContainer}>
              <Icon
                style={styles.locationIcon}
                name="map-marker"
                size={24}
                color="black"
              />
              <View style={styles.myLocationBtnContainer}>
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.whereText_iOS
                      : styles.whereText
                  }>
                  Where is the emergency?
                </Text>
                <TouchableOpacity
                  style={styles.curLocBtn}
                  onPress={this.handleMyLocationPress}>
                  <Text style={styles.curLocBtnText}>My Location</Text>
                </TouchableOpacity>
              </View>
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
              <TextInput
                style={
                  this.state.useLocation
                    ? Platform.OS === 'ios'
                      ? styles.textInputDisabled_iOS
                      : styles.textInputDisabled
                    : Platform.OS === 'ios'
                    ? styles.input_iOS
                    : styles.input
                }
                value={this.props.locationStr}
                labelFontSize={20}
                onChangeText={t => this.props.updateLocation(t)}
                onSubmitEditing={this.handleSignup}
                returnKeyType="send"
                enablesReturnKeyAutomatically={true}
                placeholder="street address, city, state"
                editable={!this.state.useLocation}
              />

              <View
                style={
                  Platform.OS === 'ios'
                    ? styles.buttonWrapper_iOS
                    : styles.buttonWrapper
                }>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={this.handleRequest}>
                  <Text style={styles.buttonTextStyle}>Send Request</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sosContainer: {
    padding: 20,
  },
  emrgText: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    marginBottom: 20,
  },
  emergencyTilesContainer: {
    flexDirection: 'row',
  },
  tile: {
    paddingVertical: 10,
    marginHorizontal: 4,
    marginVertical: 5,
    borderWidth: 1,
    backgroundColor: 'rgb(26, 72, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    width: 100,
    height: 100,
  },
  tile_iOS: {
    padding: 10,
    marginHorizontal: 3,
    marginVertical: 5,
    borderWidth: 1,
    backgroundColor: 'rgb(26, 72, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    width: 120,
    height: 120,
  },
  tileText: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 14,
    color: 'white',
  },
  tileIcon: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  userLocationContainer: {
    marginVertical: 25,
  },
  whereContainer: {
    flexDirection: 'row',
  },
  locationIcon: {},
  whereText: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
  },
  whereText_iOS: {
    marginBottom: 15,
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
  },
  inputContainer: {
    margin: 5,
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
  input: {
    fontFamily: 'IBMPlexSans-Medium',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input_iOS: {
    fontFamily: 'IBMPlexSans-Medium',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#ddd',
    color: '#999',
  },
  textInputDisabled_iOS: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#ddd',
    color: '#999',
    fontSize: 18,
  },
  buttonWrapper: {
    marginTop: 15,
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 5,
  },
  buttonWrapper_iOS: {
    marginTop: 25,
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  sendButton: {
    padding: 12,
  },
  checkMarkIcon: {
    position: 'absolute',
    top: -15,
    left: -35,
    zIndex: 1,
  },
  checkMarkIcon_iOS: {
    position: 'absolute',
    top: -15,
    left: -45,
    zIndex: 1,
  },
  myLocationBtnContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black',
    justifyContent: 'space-between',
    flex: 1,
  },
  curLocBtn: {
    marginVertical: 5,
    marginRight: 10,
  },
  curLocBtnText: {
    color: 'rgb(26, 72, 255)',
    fontFamily: 'IBMPlexSans-Medium',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

const mapStateToProps = state => {
  return {
    locationStr: state.user.location,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLocation: () => dispatch(actions.getUserLocation()),
    updateLocation: location => dispatch(actions.updateUserLocation(location)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SOS);
