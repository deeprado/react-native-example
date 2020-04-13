'use strict';

// React
import React from 'react';
// import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { View, Button, TouchableWithoutFeedback, StyleSheet, Image, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import CardBlock from './cardBlock'

class ETCScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ETC',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 注意dispatch的格式，参数为对象而不是字符串
    dispatch({type: 'FETCH_ETC_DATA_REQUEST'})
    // console.log(this.props);
    
  }

  _handleCardInfo(idx) {
    const { navigate } = this.props.navigation;
    navigate('ETCBlock'+(idx+1), {navRightIcon: 'search'})
  }

  render() {
    const { hasData, data } = this.props;
    

    return (
        <View style={styles.body}>
          <View style={styles.userInfo}>
            { hasData ?
              <View style={styles.dataContainer}>
                <Image
                  source={{
                    uri: data.avatar_url
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.phone}>{data.phone_number}</Text>
              </View>
                :
              <View />
            }
          </View>
          <View style={styles.cardInfo}>
            { hasData ?
              <View style={styles.cardConatiner}>
                {data.card_summary.map((item, idx) => 
                  <CardBlock
                    data={item}
                    key={idx}
                    idx={idx}
                    handleCardInfo={this._handleCardInfo.bind(this, idx)}
                    style={styles.card}
                  />
                )}
              </View>
              :
              <View>
              </View>
            }
          </View>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ETCDataState.loading,
    hasData: state.ETCDataState.hasData,
    error: state.ETCDataState.error,
    data: state.ETCDataState.data,
    fetchTime: state.ETCDataState.fetchTime
  };
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  userInfo: {
    flex: 1,
    backgroundColor: 'rgb(214, 246, 166)',
  },
  cardInfo: {
    flex: 2.2,
  },
  dataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  phone: {
    color: '#222',
    fontSize: 22,
    marginTop: 7,
  },
  cardConatiner: {
    overflow: 'hidden',
    flex: 1,
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    flex: 1,
  }
});

// 不传递mapDispatchToProps则默认会传递一个dispatch参数，用来手动触发action
export default connect(mapStateToProps)(ETCScreen)