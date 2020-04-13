import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native'

import * as types from '../../actions/actionTypes'

import { connect } from 'react-redux'


class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '登陆',
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      account: null,
      password: null,
    }
  }
  

  _login() {
    
    const { dispatch } = this.props;

    const loginData = {
      method: 'POST',
      body: {
        account: this.state.account,
        password: this.state.password
      },
      // 将导航传入以便登录成功后返回调用
      navigation: this.props.navigation
    }

    
    // this.props.isLogin ? this.props.navigation.goBack() : null
    dispatch({type: types.LOGIN_AUTH_REQUEST, loginData})
    
  }
  
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image
            source={require('./imgs/login.png')}
            style={styles.bgImg}
          />
        <View style={styles.loginWrap}>
          <Text>账号：123    密码：qwe</Text>
          <TextInput
            placeholder='输入账号'
            onChangeText={(text) => this.setState({ account: text })}
            value={this.state.account}
            underlineColorAndroid="transparent"
            style={styles.input}
          />
          <TextInput
            placeholder='输入密码'
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            style={styles.input}
          />
          <Button
            title={this.props.loginStatus}
            onPress={ this._login.bind(this) }
          >
          </Button>
          <TouchableOpacity
            onPress={() => navigate('Signup', {pageTitle: '注册', navRightIcon: null})}
          >
            <Text style={styles.littleTip}>没有账号？</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgb(73, 111, 130)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginWrap: {
    width: '70%',
  },
  bgImg: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
    // width: '100%',
    // height: '100%'
    // flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 25,
    height: 40,
    lineHeight: 40,
    // 不要使用padding
    paddingLeft: 7,
    // paddingBottom: 10
  },
  littleTip: {
    color: '#ddd',
    alignSelf: 'flex-end',
    marginTop: 10,
  }
})

const mapStateToProps = (state) => {
  return {
    isLogin: state.LoginAuth.isLogin,
    loginStatus: state.LoginAuth.loginStatus
  };
};

// 只用redux的dispatch
export default connect(mapStateToProps)(Login);