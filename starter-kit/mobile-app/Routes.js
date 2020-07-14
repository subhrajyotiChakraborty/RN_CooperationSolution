import 'react-native-gesture-handler';
import * as React from 'react';
import {Button} from 'react-native';
import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoadingScreen from './src/screens/loading';
import Home from './src/screens/home';
import Chat from './src/screens/chat';
import SearchResources from './src/screens/resources-search';
import AddResource from './src/screens/resource-add';
import EditResource from './src/screens/resource-edit';
import MyResources from './src/screens/resources-my';
import Map from './src/screens/map';
import Onboarding from './src/screens/onboarding';
import SignIn from './src/screens/signin';
import Signup from './src/screens/signup';
import * as actions from './src/store/actions';

import {HomeIcon, DonateIcon, SearchIcon} from './src/images/svg-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ResourcesStackOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <Button onPress={() => navigation.navigate('Chat')} title="Chat " />
    ),
  };
};

const DonationsStackOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Add Donation')}
        title="Add "
      />
    ),
  };
};

const tabBarOptions = {
  activeTintColor: 'white',
  inactiveTintColor: 'black',
  tabStyle: {
    backgroundColor: 'rgb(26, 72, 255)',
    paddingTop: 5,
  },
};

const TabLayout = () => (
  <Tab.Navigator
    style={{paddingTop: 50}}
    initialRouteName="Home"
    tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({color}) => <HomeIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Donate"
      component={DonateStackLayout}
      options={{
        tabBarIcon: ({color}) => <DonateIcon fill={color} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackLayout}
      options={{
        tabBarIcon: ({color}) => <SearchIcon fill={color} />,
      }}
    />
  </Tab.Navigator>
);

const DonateStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="My Donations"
      component={MyResources}
      options={DonationsStackOptions}
    />
    <Stack.Screen name="Add Donation" component={AddResource} />
    <Stack.Screen name="Edit Donation" component={EditResource} />
  </Stack.Navigator>
);

const SearchStackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search Resources"
      component={SearchResources}
      options={ResourcesStackOptions}
    />
    <Stack.Screen name="Chat" component={Chat} />
    <Stack.Screen name="Map" component={Map} />
  </Stack.Navigator>
);

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.showSplashLoader();
  }

  render() {
    return (
      <NavigationContainer>
        {this.props.isLoading ? (
          <LoadingScreen />
        ) : (
          <Stack.Navigator initialRouteName="Onboarding">
            {!this.props.isLoggedIn ? (
              <React.Fragment>
                <Stack.Screen
                  name="Onboarding"
                  component={Onboarding}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Signup"
                  component={Signup}
                  options={{
                    headerTitle: '',
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: 'rgb(26, 72, 255)',
                    },
                  }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{
                    headerTitle: '',
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: 'rgb(26, 72, 255)',
                    },
                  }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Stack.Screen
                  name="Tabs"
                  component={TabLayout}
                  options={{
                    headerShown: false,
                  }}
                />
              </React.Fragment>
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.splashLoader.isLoading,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showSplashLoader: () => dispatch(actions.splashLoader()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
