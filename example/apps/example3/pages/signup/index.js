import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native'

import * as types from '../../actions/actionTypes'

import { connect } from 'react-redux'


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      password: null,
      identCode: null,
      canNotGetIdentCode: false,
      tickOut: 60,
    }
  }
  

  _signup() {
    
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
    // dispatch({type: types.LOGIN_AUTH_REQUEST, loginData})
    
  }

  _getIdentCode() {
    this.setState({
      canNotGetIdentCode: true
    })
    let tick = this.state.tickOut;
    this._timeout = setInterval(function() {
      if (tick <= 0) {
        this.setState({
          canNotGetIdentCode: false,
          tickOut: 60
        })
        clearInterval(this._timeout)
        tick = this.state.tickOut
      }
      this.setState({
        tickOut: tick
      })
      tick--
    }.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this._timeout)
  }
  
  
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Image
            source={require('../login/imgs/login.png')}
            style={styles.bgImg}
          />
        <View style={styles.loginWrap}>
          <TextInput
            placeholder='输入手机号码'
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
          <View style={styles.identCode}>
            <TextInput
              style={[styles.input, styles.identCodeInput]}
              placeholder='输入验证码'
              value={this.state.identCode}
              onChangeText={(text) => this.setState({ identCode: text })}
              underlineColorAndroid="transparent"
              keyboardType='numeric'
            />

            <View
              style={styles.identCodeBtnWrap}
            >
              <Button
                style={styles.identCodeBtn}
                title={this.state.canNotGetIdentCode ? `${this.state.tickOut}秒` : '获取验证码'}
                disabled={this.state.canNotGetIdentCode}
                onPress={this._getIdentCode.bind(this)}
              />
            </View>

          </View>
          <Button
            title='注册'
            onPress={ this._signup.bind(this) }
          >
          </Button>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.littleTip}>返回登陆</Text>
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
  },
  identCode: {
    // flex: 1,
    flexDirection: 'row',
    marginBottom: 25,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  identCodeInput: {
    marginBottom: 0,
    flex: 2,
  },
  identCodeBtnWrap: {
    flex: 1,
    // height: 40,
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center'
  },  
  identCodeBtn: {
    flex: 1,
  }

})

const mapStateToProps = (state) => {
  return {
  };
};

// 只用redux的dispatch
export default connect(mapStateToProps)(Signup);