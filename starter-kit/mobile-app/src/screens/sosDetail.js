import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('Detail Screen');
  }

  render() {
    return (
      <View style={styles.detailContainer}>
        <Text>SOS page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    padding: 10,
  },
});

export default Detail;
