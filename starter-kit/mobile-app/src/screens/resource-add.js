import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import {CheckedIcon, UncheckedIcon} from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import {add, userID} from '../lib/utils';
import InputField from '../components/InputField';

const styles = StyleSheet.create({
  outerView: {
    padding: 22,
    backgroundColor: '#FFF',
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeArea: {
    width: '40%',
  },

  selectorLabel: {
    paddingTop: 10,
    color: 'rgb(152, 154, 163)',
    fontSize: 20,
    fontFamily: 'IBMPlexSans-Medium',
    marginBottom: 13,
  },

  inputContainer: {
    marginBottom: 25,
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
  quantityArea: {
    width: '40%',
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

  textLabel: {
    fontFamily: 'IBMPlexSans-Medium',
  },

  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
  },
  buttonContainer: {
    marginTop: 15,
    paddingBottom: 50,
  },
  addButtonWrapper: {
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  addButton: {
    padding: 12,
  },
});

const AddResource = function({navigation}) {
  const clearItem = {
    userID: userID(),
    type: 'Food',
    name: '',
    description: '',
    location: '',
    contact: '',
    quantity: '1',
  };
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(true);
  const [position, setPosition] = React.useState({});

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition(pos => {
        setPosition(pos);
        if (useLocation) {
          setItem({
            ...item,
            location: `${pos.coords.latitude},${pos.coords.longitude}`,
          });
        }
      });
    });
  }, []);

  const toggleUseLocation = () => {
    if (!useLocation && position) {
      setItem({
        ...item,
        location: `${position.coords.latitude},${position.coords.longitude}`,
      });
    }
    setUseLocation(!useLocation);
  };

  const sendItem = () => {
    const payload = {
      ...item,
      quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity),
    };

    add(payload)
      .then(() => {
        Alert.alert('Thank you!', 'Your item has been added.', [{text: 'OK'}]);
        setItem({...clearItem, location: payload.location});
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          'ERROR',
          'Please try again. If the problem persists contact an administrator.',
          [{text: 'OK'}],
        );
      });
  };

  return (
    <ScrollView style={styles.outerView}>
      <View style={styles.splitView}>
        <View style={styles.typeArea}>
          <Text style={styles.selectorLabel}>Type</Text>
          <PickerSelect
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: styles.selector,
              inputAndroid: styles.selectorAndroid,
            }}
            value={item.type}
            onValueChange={t => setItem({...item, type: t})}
            items={[
              {label: 'Food', value: 'Food'},
              {label: 'Help', value: 'Help'},
              {label: 'Other', value: 'Other'},
            ]}
          />
        </View>
        <View style={styles.quantityArea}>
          <InputField
            style={styles.textInput}
            value={item.quantity}
            label="Quantity"
            labelTextStyle={styles.textLabel}
            labelFontSize={20}
            onChangeText={t => setItem({...item, quantity: t})}
            onSubmitEditing={sendItem}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            placeholder="e.g., 10"
            keyboardType="numeric"
          />
        </View>
      </View>

      <InputField
        style={styles.textInput}
        value={item.name}
        label="Name"
        labelTextStyle={styles.textLabel}
        labelFontSize={20}
        onChangeText={t => setItem({...item, name: t})}
        onSubmitEditing={sendItem}
        returnKeyType="send"
        characterRestriction={50}
        enablesReturnKeyAutomatically={true}
        placeholder="e.g., Tomotatoes"
        blurOnSubmit={false}
      />

      <InputField
        style={styles.textInput}
        value={item.contact}
        label="Contact"
        labelTextStyle={styles.textLabel}
        labelFontSize={20}
        onChangeText={t => setItem({...item, contact: t})}
        onSubmitEditing={sendItem}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="user@domain.com"
      />

      <InputField
        style={styles.textInput}
        value={item.description}
        label="Description"
        labelTextStyle={styles.textLabel}
        labelFontSize={20}
        onChangeText={t => setItem({...item, description: t})}
        onSubmitEditing={sendItem}
        returnKeyType="send"
        multiline
        characterRestriction={300}
        enablesReturnKeyAutomatically={true}
        placeholder="e.g., cans of tomatoes"
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleUseLocation}>
          {useLocation ? (
            <CheckedIcon height="20" width="20" />
          ) : (
            <UncheckedIcon height="20" width="20" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}> Use my current location </Text>
      </View>
      <InputField
        style={useLocation ? styles.textInputDisabled : styles.textInput}
        value={item.location}
        label="Location"
        labelTextStyle={styles.textLabel}
        labelFontSize={20}
        onChangeText={t => setItem({...item, location: t})}
        onSubmitEditing={sendItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="street address, city, state"
        editable={!useLocation}
      />

      <View style={styles.buttonContainer}>
        {item.type !== '' &&
          item.name.trim() !== '' &&
          item.contact.trim() !== '' && (
            <View style={styles.addButtonWrapper}>
              <TouchableOpacity style={styles.addButton} onPress={sendItem}>
                <Text style={styles.buttonTextStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

export default AddResource;
