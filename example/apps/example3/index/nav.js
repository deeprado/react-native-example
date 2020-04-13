'use strict'

import React from 'react'

import { StackNavigator, DrawerNavigator } from 'react-navigation'

import { Text } from 'react-native'

import ETCScreen from '../pages/etc/index'
  import ETCBlock1 from '../pages/etc/block1/index'
import HomeScreen from '../pages/home/index'
import LoginScreen from '../pages/login/index'
import SignupScreen from '../pages/signup/index'
import MessageScreen from '../pages/message/index'


import NavRight from './navRight'
import NavLeft from './navLeft'
import DrawerContent from './drawerContent'

const IndexNavigator =  StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    ETC: {
      screen: ETCScreen,
    },
    Login: {
      screen: LoginScreen
    },
    Signup: {
      screen: SignupScreen
    },
    Message: {
      screen: MessageScreen
    },
    ETCBlock1: {
      screen: ETCBlock1
    },
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'none',
    navigationOptions: (navigation) => {
      // const { pageTitle } = navigation.navigation.state.params || null
      const { params } = navigation.navigation.state;
      // console.log(navigation.navigation.state.params);
      

      // 没有对应属性时访问会报错
      // try {
      //   if (params.pageTitle !== undefined) {
      //     // empty
      //   }
      // } catch (error) {
      //   params.pageTitle === '易路通达'
      // }
      // try {
      //   if (params.navRightIcon) {
      //     // empty
      //   }
      // } catch (error) {
      //   params.navRightIcon === 'message'
      // }
      
      // console.log(params)
      return {
        title: (params !== undefined && params.pageTitle !== undefined) ? params.pageTitle : '易路通达',
        headerLeft: <NavLeft navigation={navigation.navigation} />,
        headerRight: <NavRight navigation={navigation.navigation} navRightIcon={(params !== undefined && params.navRightIcon !== undefined) ? params.navRightIcon : 'message'} />,
        // title: params.pageTitle,
        // headerRight: <NavRight navRightIcon={params.navRightIcon} />,
        headerTitleStyle: {
          alignSelf: 'center'
        }
      }
    }
  }
);  

export default DrawerNavigator({
  Index: {
    screen: IndexNavigator
  },
  Other: {
    screen: MessageScreen
  }
}, {
  contentComponent: (props) => <DrawerContent {...props} />
})