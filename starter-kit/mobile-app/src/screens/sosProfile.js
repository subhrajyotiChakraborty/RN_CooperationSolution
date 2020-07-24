import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';

import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class SosProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {details} = this.props.route.params;
    console.log(details);
  }

  handleEmail = () => {
    const {details} = this.props.route.params;
    Linking.openURL(details.email);
  };

  handleMapView = () => {
    const {details} = this.props.route.params;
    const {userLocation} = this.props.route.params;
    this.props.navigation.navigate('Sos Map', {
      item: {...details, contact: details.phone},
      userLocation,
    });
  };

  handlePhoneCall = () => {
    const {details} = this.props.route.params;
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${details.phone}`;
    } else {
      number = `tel:${details.phone}`;
    }
    Linking.openURL(number);
  };

  render() {
    const {details} = this.props.route.params;
    const {name, phone, location, email, description, address} = details;

    return (
      <View style={styles.profileContainer}>
        <View style={styles.userAvatarContainer}>
          <UserAvatar style={styles.userAvatar} size={70} name={name} />
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.userDetailsContainer}>
          <View style={styles.userInfo}>
            <View style={styles.textPart}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoText}>{email}</Text>
            </View>
            <View style={styles.iconPart}>
              <TouchableOpacity onPress={this.handleEmail}>
                <Icon name="email" size={30} color="rgb(26, 72, 255)" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.textPart}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoText}>{address}</Text>
            </View>
            <View style={styles.iconPart}>
              <TouchableOpacity onPress={this.handleMapView}>
                <Icon name="map" size={30} color="rgb(26, 72, 255)" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.textPart}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoText}>{phone}</Text>
            </View>
            <View style={styles.iconPart}>
              <TouchableOpacity onPress={this.handlePhoneCall}>
                <Icon name="phone" size={30} color="rgb(26, 72, 255)" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    flex: 1,
  },
  userAvatarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    borderRadius: 100,
    fontSize: 70,
    height: 100,
    width: 100,
    padding: 10,
    fontFamily: 'IBMPlexSans-Medium',
    textAlign: 'center',
  },
  userName: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 16,
    textAlign: 'center',
  },
  userDetailsContainer: {
    flex: 2,
    marginTop: 30,
  },
  userInfo: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPart: {},
  iconPart: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    marginBottom: 5,
    color: 'rgb(152, 154, 163)',
  },
  infoText: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 20,
  },
});

export default SosProfile;
