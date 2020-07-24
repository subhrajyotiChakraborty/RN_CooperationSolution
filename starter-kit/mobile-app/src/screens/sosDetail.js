import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';

import * as actions from '../store/actions';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // availableServiceProvider: [
      //   {
      //     id: '1',
      //     name: 'Hospital A',
      //     phone: '1234567892',
      //     email: 'aa@aa.com',
      //     address: 'Kolkata, India',
      //     location: '22.8481108,88.3715879',
      //     description: 'We provide emergency service',
      //   },
      //   {
      //     id: '2',
      //     name: 'Hospital B',
      //     phone: '2334567892',
      //     email: 'bb@bb.com',
      //     address: 'Bandel, India',
      //     location: '22.8481108,88.3715879',
      //     description: 'We provide emergency service, with ICU facilities',
      //   },
      // ],
    };
  }

  componentDidMount() {
    const {emergencyService} = this.props.route.params;
    const {emergencyLocation} = this.props.route.params;

    console.log('Detail Screen =>', emergencyService);
    this.props.fetchEmergencyServices(emergencyService);
  }

  render() {
    const ListItems = props => (
      <TouchableOpacity
        style={styles.itemTouchable}
        onPress={() =>
          this.props.navigation.navigate('Sos Profile', {
            details: props,
            userLocation: this.props.route.params.emergencyLocation,
          })
        }>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          {/* <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text> */}
        </View>
        <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.detailContainer}>
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          style={styles.flatListView}
          data={this.props.availableServiceProvider}
          renderItem={({item}) => <ListItems {...item} />}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
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
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
  emptyListView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontFamily: 'IBMPlexSans-Bold',
    color: '#999999',
    fontSize: 16,
  },
  spinnerTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
  },
});

const mapStateToProps = state => {
  return {
    isLoading: state.services.loading,
    availableServiceProvider: state.services.services,
    error: state.services.error,
    message: state.services.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEmergencyServices: serviceName =>
      dispatch(actions.fetchEmergencyServices(serviceName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
