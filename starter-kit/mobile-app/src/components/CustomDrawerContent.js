import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem,
  //   DrawerItemList,
} from '@react-navigation/drawer';
import UserAvatar from 'react-native-user-avatar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerWrapper}>
          <View style={styles.avatarContainer}>
            <UserAvatar
              size={70}
              style={styles.avatar}
              name="Subhrajyoti Chakraborty"
            />
            <View style={styles.userDetailsView}>
              <Text style={styles.userName}>Subhrajyoti Chakraborty</Text>
              <Text style={styles.userEmail}>ss@ss.com</Text>
            </View>
          </View>
          <View style={styles.routeContainer}>
            <DrawerItem
              icon={({color, size}) => (
                <Feather name="plus" color={color} size={size} />
              )}
              label="Add Donation"
              onPress={() => {
                props.navigation.navigate('Tabs', {
                  screen: 'Donate',
                  params: {
                    screen: 'Add Donation',
                    initial: false,
                  },
                  initial: false,
                });
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Feather name="user" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                console.log('go to Profile page');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Feather name="message-square" size={size} color={color} />
              )}
              label="Chat"
              onPress={() => {
                props.navigation.navigate('Tabs', {
                  screen: 'Search',
                  params: {
                    screen: 'Chat',
                    initial: false,
                  },
                  initial: false,
                });
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Feather name="settings" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                console.log('go to Settings page');
              }}
            />
          </View>
        </View>
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Feather name="log-out" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            console.log('Sign Out');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerWrapper: {
    padding: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 100,
    fontSize: 70,
    height: 60,
    width: 60,
    padding: 10,
    fontFamily: 'IBMPlexSans-Medium',
  },
  userDetailsView: {
    paddingLeft: 10,
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'center',
  },
  userName: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'rgb(152, 154, 163)',
  },
  routeContainer: {
    marginTop: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default CustomDrawerContent;
