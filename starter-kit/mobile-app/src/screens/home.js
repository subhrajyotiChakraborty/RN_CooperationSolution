import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import * as actions from '../store/actions';
import {session} from '../lib/utils';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 18,
  },
  newsContainer: {
    marginBottom: 50,
  },
  newsWrapper: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  newsText: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
  },
  spinnerTextStyle: {
    fontFamily: 'IBMPlexSans-Medium',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };
  }

  async componentDidMount() {
    const sessionId = await session();
    this.props.fetchNews_1(sessionId);
    this.props.fetchNews_2(sessionId);
    this.props.fetchNews_5(sessionId);
    this.props.fetchNews_4(sessionId);
    this.props.fetchNews_3(sessionId);
  }

  render() {
    return (
      <ScrollView style={styles.center}>
        <Spinner
          visible={this.props.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.newsContainer}>
          {this.props.news.map((text, i) => {
            return (
              <View key={i} style={styles.newsWrapper}>
                <Text style={styles.newsText}>{text}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.news.loading,
    error: state.news.error,
    news: state.news.news,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNews_1: sessionId => dispatch(actions.fetchNews(sessionId, 'news')),
    fetchNews_2: sessionId =>
      dispatch(actions.fetchNews(sessionId, 'what is coronavirus')),
    fetchNews_3: sessionId =>
      dispatch(actions.fetchNews(sessionId, 'coronavirus reduce risk')),
    fetchNews_4: sessionId =>
      dispatch(actions.fetchNews(sessionId, 'coronavirus risk')),
    fetchNews_5: sessionId =>
      dispatch(actions.fetchNews(sessionId, 'symptoms')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
