import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch, FlatList} from 'react-native';

const itemsArray = [
  {
    id: '1',
    name: 'notification',
    label: 'Send auto SOS message',
  },
];
const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const ListItems = props => (
    <View style={styles.itemTouchable}>
      <View style={styles.itemView}>
        <Text style={styles.itemName}>{props.label}</Text>
        <Switch
          trackColor={{false: 'white', true: 'rgb(26, 72, 255)'}}
          thumbColor={isEnabled ? '#ccc' : '#ccc'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
  return (
    <View style={styles.settingsContainer}>
      <FlatList
        style={styles.flatListView}
        data={itemsArray}
        renderItem={({item}) => <ListItems {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    // padding: 10,
  },
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'IBMPlexSans-Medium',
    alignSelf: 'center',
  },
});

export default Settings;
