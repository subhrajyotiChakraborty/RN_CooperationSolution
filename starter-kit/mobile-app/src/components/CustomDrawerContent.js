import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {
  DrawerContentScrollView,
  //   DrawerItemList,
} from '@react-navigation/drawer';
import UserAvatar from 'react-native-user-avatar';

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerWrapper}>
        <UserAvatar
          style={styles.avatar}
          size={100}
          name="Subhrajyoti Chakraborty"
        />
        <Text>This is dummy view</Text>
      </View>
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerWrapper: {},
  avatar: {},
});

export default CustomDrawerContent;
