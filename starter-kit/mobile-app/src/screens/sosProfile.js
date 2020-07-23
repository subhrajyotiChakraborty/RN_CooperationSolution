import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class SosProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const {details} = this.props.route.params;
    console.log(details);
  }

  render() {
    return (
      <View>
        <Text>This is details page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default SosProfile;
