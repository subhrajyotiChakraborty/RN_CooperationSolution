import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import UserAvatar from 'react-native-user-avatar';
import Feather from 'react-native-vector-icons/Feather';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.userAvatarContainer}>
          <UserAvatar
            style={styles.userAvatar}
            size={100}
            name={this.props.name}
          />
          <Text style={styles.userName}>{this.props.name}</Text>
          <Text style={styles.userRole}>{this.props.role}</Text>
        </View>
        <View style={styles.userDetailsContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoText}>{this.props.email}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoText}>{this.props.address}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoText}>{this.props.phone}</Text>
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
  },
  userName: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 20,
  },
  userRole: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 20,
  },
  userDetailsContainer: {
    flex: 2,
    marginTop: 30,
  },
  userInfo: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
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

const mapStateToProps = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    phone: state.user.phone,
    address: state.user.address,
    role: state.user.role,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Profile);
