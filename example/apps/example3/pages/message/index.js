import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'

class Message extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '消息',
    };
  }

  constructor(props) {
    super(props);
    this.state={
      maskOn: false,
      moveUp: new Animated.Value(205),
      bodyHeight: new Animated.Value(0)
    }
    this._startAnimation = this._startAnimation.bind(this)
  }
  

  _touch() {
    this.setState({
      maskOn: true
    })

    this._startAnimation();
  }

  _startAnimation(){
    // 每次动画运行时初始化动画参数
    this.state.moveUp.setValue(205);
    this.state.bodyHeight.setValue(0);
    Animated.stagger(100, [
      Animated.timing(this.state.moveUp, {
        toValue: 150,
        duration: 350,
      }),
      Animated.timing(this.state.bodyHeight, {
        toValue: 170,
        duration: 400
      })
    ]).start();
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}></View>
        <View style={styles.bottomConatiner}>
          <TouchableOpacity
            onPress={this._touch.bind(this)}
          >
            <View style={styles.touch}></View>
          </TouchableOpacity>
          <View style={styles.touch}></View>
        </View>
        { this.state.maskOn ?
          <View style={styles.mask}>
            <TouchableOpacity
              onPress={()=>{this.setState({maskOn: false})}}
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <Animated.View style={[styles.maskOn_block,
                {
                  top: this.state.moveUp
                }
              ]}>
                <View style={styles.maskOn_touch}></View>
                <Animated.View style={[styles.maskOn_body, {
                  height: this.state.bodyHeight
                }]}></Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </View>
          :
          <View />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    // height: 100,
    backgroundColor: '#eee'
  },
  bottomConatiner: {
    flex: 1.5,
    // height: 200,
    alignItems: 'center',
  },
  touch: {
    width: 300,
    height: 70,
    backgroundColor: 'rgb(0, 122, 104)',
    marginBottom: 7
  },
  mask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
  maskOn_block: {
    width: 300,
  },  
  maskOn_touch: {
    width: 300,
    height: 70,
    backgroundColor: 'rgb(0, 122, 204)',
  },
  maskOn_body: {
    width: 300,
    backgroundColor: '#fff',
  }
})

export default Message;