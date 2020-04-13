import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'


export default class NavLeft extends Component {

  
  _handleLeftIconClick() {
    const { navigation } = this.props;
    if (navigation.state.routeName === 'Home') {
      navigation.navigate('DrawerOpen')
    } else {
      navigation.goBack()
    }
  }

  
  render() {
    return (
        <View>
          <TouchableWithoutFeedback
            onPress={this._handleLeftIconClick.bind(this)}
          >
          { this.props.navigation.state.routeName === 'Home' ?
            <View><Text>打开抽屉</Text></View>
            :
            <View><Text>返回</Text></View>
          }
            
          </TouchableWithoutFeedback>
        </View>
    );
  }
}
