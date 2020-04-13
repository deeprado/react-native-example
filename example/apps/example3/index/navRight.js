import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'


class NavRight extends Component {

  _handleRightIconClick() {
    const icon = this.props.navRightIcon
    if (!this.props.hasMessage) {
      this.props.navigation.navigate('Login', {navRightIcon: null})
    } else if (icon === 'message') {
      this.props.navigation.navigate('Message', {navRightIcon: null})
    }
  }
  
  render() {
    const icon = this.props.navRightIcon
    let element = null

    if (icon === 'message') {
      element =  <Icon name="commenting-o" size={27} color="#333" />
    } else if (icon === null) {
      element = <View></View>
    } else {
      element = <Icon name="search" size={27} color="#333" />
    }
    
    return (
        <View style={styles.headerRightContainer}>
          { this.props.hasMessage && icon === 'message' ?
            <View style={styles.newMessage}></View>
            :
            <View />
          }
          <TouchableWithoutFeedback
            onPress={this._handleRightIconClick.bind(this)}
          >
            {/*{ icon==='message' ? 
              <Icon name="commenting-o" size={27} color="#333" />
              :
              <Icon name="search" size={27} color="#333" />
            }*/}
            { element }
          </TouchableWithoutFeedback>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    marginRight: 10,
  },
  newMessage: {
    width: 7,
    height: 7,
    backgroundColor: 'red',
    borderRadius:  50,
    position: 'absolute',
    left: 0,
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    hasMessage: state.FetchMessage.hasMessage
  }
}

export default connect(mapStateToProps)(NavRight);