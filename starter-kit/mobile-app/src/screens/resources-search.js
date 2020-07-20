import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PickerSelect from 'react-native-picker-select';

import {search} from '../lib/utils';
import InputField from '../components/InputField';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
  },
  inputsView: {
    backgroundColor: '#F1F0EE',
    padding: 16,
    padding: 22,
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5,
  },

  selectorLabel: {
    color: 'rgb(152, 154, 163)',
    fontSize: 20,
    fontFamily: 'IBMPlexSans-Medium',
    marginBottom: 7,
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

  textLabel: {
    fontFamily: 'IBMPlexSans-Medium',
  },

  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    backgroundColor: 'rgb(26, 72, 255)',
    borderRadius: 5,
  },
  button: {
    padding: 12,
  },
  buttonTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    padding: 10,
    color: '#1062FE',
  },
  flatListView: {
    backgroundColor: '#FFF',
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
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
});

const SearchResources = function({route, navigation}) {
  const [query, setQuery] = React.useState({type: 'Food', name: ''});
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  const Item = props => {
    return (
      <TouchableOpacity
        style={styles.itemTouchable}
        onPress={() => {
          navigation.navigate('Map', {item: props});
        }}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };

  const searchItem = () => {
    const payload = {
      ...query,
    };

    search(payload)
      .then(results => {
        setInfo(`${results.length} result(s)`);
        setItems(results);
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
    <View style={styles.outerView}>
      <View style={styles.inputsView}>
        <Text style={styles.selectorLabel}>Type</Text>
        <PickerSelect
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: styles.selector,
            inputAndroid: styles.selectorAndroid,
          }}
          value={query.type}
          onValueChange={t => setQuery({...query, type: t})}
          items={[
            {label: 'Food', value: 'Food'},
            {label: 'Help', value: 'Help'},
            {label: 'Other', value: 'Other'},
          ]}
        />

        <InputField
          label="Name"
          labelFontSize={20}
          labelTextStyle={styles.textLabel}
          style={styles.textInput}
          value={query.name}
          onChangeText={t => setQuery({...query, name: t})}
          onSubmitEditing={searchItem}
          characterRestriction={50}
          returnKeyType="send"
          enablesReturnKeyAutomatically={true}
          placeholder="e.g., Tomotatoes"
          blurOnSubmit={false}
        />
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={searchItem}>
            <Text style={styles.buttonTextStyle}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.searchResultText}>{info}</Text>

      <FlatList
        style={styles.flatListView}
        data={items}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id']}
      />
    </View>
  );
};

export default SearchResources;
