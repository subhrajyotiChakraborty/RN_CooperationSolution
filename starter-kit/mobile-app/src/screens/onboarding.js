import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;

const slides = [
  {
    key: '1',
    title: 'Community',
    text: 'This is some dummy text',
    image: {
      uri:
        'https://image.shutterstock.com/image-vector/community-vector-icon-600w-623001206.jpg',
    },
  },
  {
    key: '2',
    title: 'Donate',
    text: 'This is some dummy text.',
    image: {
      uri:
        'https://image.shutterstock.com/image-vector/three-hands-support-each-other-600w-1043518303.jpg',
    },
  },
  {
    key: '3',
    title: 'SOS',
    text: 'This is some dummy text.',
    image: {
      uri:
        'https://image.shutterstock.com/image-vector/sos-vector-icon-warning-bell-600w-1081165856.jpg',
    },
  },
];

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  onIndexChangedHandler = index => {
    this.setState({
      currentIndex: index,
    });
  };

  render() {
    const getFooterStyle = () => {
      if (this.state.currentIndex === 1) {
        return {
          ...styles.footerContainer,
          backgroundColor: 'rgb(103, 98, 255)',
        };
      } else if (this.state.currentIndex === 2) {
        return {
          ...styles.footerContainer,
          backgroundColor: 'rgb(103, 98, 255)',
        };
      } else {
        return {
          ...styles.footerContainer,
          backgroundColor: 'rgb(103, 98, 255)',
        };
      }
    };

    const renderSlides = () => {
      return slides.map(item => {
        return (
          <View style={styles.slide} key={item.key}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      });
    };

    return (
      <View style={styles.container}>
        <View style={styles.slideContainer}>
          <Swiper
            onIndexChanged={this.onIndexChangedHandler}
            dotColor="#ccc"
            activeDotColor="#333"
            style={styles.wrapper}
            loop={false}
            bounces={true}>
            {renderSlides()}
          </Swiper>
        </View>
        <View style={{...getFooterStyle()}}>
          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.getStartedTextStyle}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={styles.loginTextStyle}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT,
  },
  slideContainer: {
    height: SCREEN_HEIGHT * 0.7,
  },
  wrapper: {},
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 300,
    height: 280,
    resizeMode: 'contain',
  },
  text: {
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
  },
  footerContainer: {
    flex: 1,
  },
  getStartedBtn: {
    padding: 15,
    marginHorizontal: 30,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 9,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  getStartedTextStyle: {
    fontSize: 18,
  },
  loginBtn: {
    padding: 20,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  loginTextStyle: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Onboarding;
