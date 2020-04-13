'use strict';

// React
import React from 'react';

import { View, Button, TouchableWithoutFeedback, StyleSheet, Image, Text } from 'react-native';

import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = <Icon name="rocket" size={30} color="#900" />;

class MyHomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '易路通达',
    };
  }

  constructor(props) {
    super(props);
    this._fetchMessages = this._fetchMessages.bind(this);
  }

  
  _fetchMessages() {
    this.props.dispatch({type: 'FETCH_MESSAGE_REQUEST'})
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isLogin } = this.props;
    
    // 避免重复调用
    if (isLogin && !this.props.messages) {
      
    // 抓取通知消息
      this._fetchMessages();
    }
    
    return (
      <View style={styles.body}>
        {/*{myIcon}*/}
        {/*<Button
          onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}
          title="Go to Lucy's profile"
        />*/}
        <View style={styles.top}>
          <Image
              source={require('./imgs/top.png')}
              resizeMode='stretch'
              style={styles.topImg}
          />
        </View>
        <View style={styles.bottom}>
          <Image
              source={require('./imgs/bottom.png')}
              resizeMode='stretch'
              style={styles.bottomImg}
          />
          <TouchableWithoutFeedback
            onPress = { isLogin ? (() => navigate('ETC', {pageTitle: 'ETC'})) : (() => navigate('Login', {pageTitle: '登录', navRightIcon: null})) }
          >
            <View
              style={styles.etc}
            >
              <Text style={{display: 'none'}}>ETC</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  top: {
    flex: 1
  },
  bottom: {
    flex: 2
  },
  topImg: {
    flex: 1,
    width: '100%'
  },
  bottomImg: {
    flex: 1,
    width: '100%'
  },
  etc: {
    width: '40%',
    height: '25%',
    left: '30%',
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: 'red',
  }
});

const mapStateToProps = (state) => {
  return {
    isLogin: state.LoginAuth.isLogin,
    messages: state.FetchMessage.data,
    hasMessage: state.FetchMessage.hasMessage
  };
};

export default connect(mapStateToProps)(MyHomeScreen)