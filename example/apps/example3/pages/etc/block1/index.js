import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'

class Block1 extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '消费总金额',
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tabHD}>
          <Image
            source={require('../imgs/touchLeft.png')}
            style={styles.tabHD_img}
            resizeMode='stretch'
          />
          <View style={styles.tabHD_titleWrap}>
            <View style={styles.tabHD_title}>
              <Text style={[styles.tabHD_text, {color: '#fff'}]}>储蓄卡消费明细</Text>
            </View>
            <View style={styles.tabHD_title}>
              <Text style={[styles.tabHD_text, {color: 'rgb(141, 195, 58)'}]}>对账卡消费明细</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabBD}>
          
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabHD: {
    // flex: 1
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: 120,
    // height: 120
    // flex: 2
  },
  tabHD_img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 10,
    alignSelf: 'center'
  },
  tabHD_titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabHD_title: {
    padding: 10,
  },
  tabHD_text: {
    // flex: 1,
    textAlign: 'center',
    // fontSize: 20,
  }

})

export default Block1;