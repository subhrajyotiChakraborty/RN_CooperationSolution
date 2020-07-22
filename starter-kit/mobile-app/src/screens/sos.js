import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class SOS extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.sosContainer}>
        <Text>SOS page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sosContainer: {
    padding: 10,
  },
});

export default SOS;
