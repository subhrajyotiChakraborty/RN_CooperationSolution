import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import {CheckedIcon, UncheckedIcon} from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import {update, remove, userID} from '../lib/utils';
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
  updateButtonWrapper: {
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 5,
  },
  deleteButtonWrapper: {
    marginTop: 10,
    backgroundColor: '#da1e28',
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  updateButton: {
    padding: 12,
  },
  deleteButton: {
    padding: 12,
  },
});

const EditResource = props => {
  const clearItem = {
    userID: userID(),
    e: 'Food',
    name: '',
    description: '',
    location: '',
    contact: '',
    quantity: '1',
  };
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(false);
  const [position, setPosition] = React.useState({});

  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      const item = props.route.params.item;
      console.log(item);
      setItem({
        ...item,
        quantity: item.quantity.toString(),
      });

      Geolocation.getCurrentPosition(pos => {
        setPosition(pos);
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

  const updateItem = () => {
    const payload = {
      ...item,
      quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity),
      id: item.id || item['_id'],
    };

    update(payload)
      .then(() => {
        Alert.alert('Done', 'Your item has been updated.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
      });
  };

  const confirmDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      {text: 'Cancel'},
      {text: 'Delete', onPress: () => deleteItem()},
    ]);
  };

  const deleteItem = () => {
    const payload = {
      ...item,
      id: item.id || item['_id'],
    };

    remove(payload)
      .then(() => {
        Alert.alert('Done', 'Your item has been deleted.', [{text: 'OK'}]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{text: 'OK'}]);
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
            label="Quantity"
            labelTextStyle={styles.textLabel}
            labelFontSize={20}
            value={item.quantity}
            onChangeText={t => setItem({...item, quantity: t})}
            onSubmitEditing={updateItem}
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
        labelFontSize={20}
        label="Name"
        labelTextStyle={styles.textLabel}
        onChangeText={t => setItem({...item, name: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        characterRestriction={50}
        enablesReturnKeyAutomatically={true}
        placeholder="e.g., Tomotatoes"
        blurOnSubmit={false}
      />

      <InputField
        style={styles.textInput}
        label="Contact"
        labelFontSize={20}
        labelTextStyle={styles.textLabel}
        value={item.contact}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={t => setItem({...item, contact: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="user@domain.com"
      />

      <InputField
        style={styles.textInput}
        labelTextStyle={styles.textLabel}
        label="Description"
        labelFontSize={20}
        value={item.description}
        multiline
        characterRestriction={300}
        onChangeText={t => setItem({...item, description: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="e.g., small baskets of cherry tomatoes"
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
        label="Location"
        labelFontSize={20}
        style={useLocation ? styles.textInputDisabled : styles.textInput}
        labelTextStyle={styles.textLabel}
        value={item.location}
        disabled={useLocation}
        onChangeText={t => setItem({...item, location: t})}
        onSubmitEditing={updateItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="street address, city, state"
      />

      <View style={styles.buttonContainer}>
        {item.type !== '' &&
          item.name.trim() !== '' &&
          item.contact.trim() !== '' && (
            <View style={styles.updateButtonWrapper}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={updateItem}>
                <Text style={styles.buttonTextStyle}>Update</Text>
              </TouchableOpacity>
            </View>
          )}

        <View style={styles.deleteButtonWrapper}>
          <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.buttonTextStyle}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditResource;
