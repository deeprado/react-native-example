import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, PanResponder, Animated, TouchableWithoutFeedback } from 'react-native'


const touchColor = [
  {
    bc: 'rgb(229, 80, 122)',
    cc: 'rgb(174, 44, 81)'
  },
  {
    bc: 'rgb(241, 109, 94)',
    cc: 'rgb(165, 33, 18)'
  },
  {
    bc: 'rgb(90, 180, 215)',
    cc: 'rgb(37, 108, 136)'
  },
  {
    bc: 'rgb(52, 184, 126)',
    cc: 'rgb(38, 136, 93)'
  }
]

// touchBlockWidth
/**
 * 滑块宽度
 */
const tbw = 120;

class CardBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouch: false,
      blockInLeft: true,
    }

    this._containerWidth = null;
    this._touchBlockWidth = null;
    // 不允许双击事件发生
    this._touchTimeStamp = null;

    this._startAnimation = this._startAnimation.bind(this)

    this._animatedDivisionValue = new Animated.Value(0);
  }

  componentWillMount() {
    this._animatedValue = new Animated.ValueXY()
    this._value = {x: 0}
    this._animatedValue.addListener((value) => this._value = value);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      });
  }

  _handleStartShouldSetPanResponder(e, gestureState){
    // 与上次点击在500ms以内时不处理点击事件
    const tick = new Date().getTime();
    if (tick - this._touchTimeStamp < 500) {
      return false;
    }
    this._touchTimeStamp = tick;
    return true;
  }
  _handleMoveShouldSetPanResponder(e, gestureState){
    return true;
  }
  _handlePanResponderGrant(e, gestureState){
    this.setState({
      isTouch: true
    })
    this._animatedValue.setOffset({x: this._value.x});
    this._animatedValue.setValue({x: 0});
  }

  _handlePanResponderMove(e, gestureState) {
    // console.log(this._animatedValue.x);
    
    let canTouchLength = this._containerWidth - this._touchBlockWidth
    
    // 在边界处不可向己边滑动
    if ( (this.state.blockInLeft && gestureState.dx > 0 && gestureState.dx < canTouchLength) || (!this.state.blockInLeft && gestureState.dx < 0 && gestureState.dx > -canTouchLength) ) {

      // 动画跟随触摸移动的关键
      this._animatedValue.setValue({x: gestureState.dx})
    }
    
    // Animated.event([
    //     null, {dx: this._animatedValue.x}
    // ])
  }

  _handlePanResponderEnd(e, gestureState){

    let canTouchLength = this._containerWidth - this._touchBlockWidth

    // 偏移
    // gestureState.moveX有移动才会有值，点击的话值为0
    let moveDistance = gestureState.moveX !== 0 ? gestureState.moveX - gestureState.x0 : 0;
    
    
    // 确定移动方向
    const toRight = moveDistance>0 ? true : false;

    // 取移动距离
    moveDistance = Math.abs(moveDistance)
    
    // 设定个中间值决定滑块最终移向哪边
    const middleValue = canTouchLength / 2

    // endValue是有累加性的，即新动画始终从当前位置计算
    // 所以，向右移动时，中点以前为0，过了中点为最大值
    // 再向左移动时，中点以前为0（即不移动），过了中点为最大值的反向
    let endValue = 0

    // 防止还是能拖出边界，给第二个条件加上 this.state.blockInLeft 的判断      
    if ( (this.state.blockInLeft && moveDistance === 0) || (toRight && this.state.blockInLeft && (moveDistance > middleValue)) ) {
      endValue = canTouchLength
      this.setState({
        blockInLeft: false
      })
    } else if ( (!this.state.blockInLeft && moveDistance === 0) || (!toRight && !this.state.blockInLeft && (moveDistance > middleValue)) ) {
      endValue = -canTouchLength
      this.setState({
        blockInLeft: true
      })
    }
    
    this._startAnimation(endValue);

    this.setState({
      isTouch:  false
    })

  }

  _startAnimation(endValue) {
    Animated.spring(this._animatedValue, {
      toValue: endValue,
      tension: 80
    }).start(
      () => {
        // 回调没有用
      }
    );
  }

  componentDidMount() {
    // dash分割线由小View组成，太多导致初次未渲染出来，因此100ms后强制再次渲染
    this._timeout = setTimeout(function() {
      this.forceUpdate();
      this._animatedDivisionValue.setValue(this._containerWidth - this._touchBlockWidth)
      Animated.spring(this._animatedDivisionValue, {
        toValue: 0,
        tension: 0
      }).start();
    }.bind(this), 100);
  }
  
  componentWillUnmount() {
    clearTimeout(this._timeout)
  }
  

  render() {
    

    const data = this.props.data;
    const { idx } = this.props;

    const ds = this.state.blockInLeft ? data.tab1 : data.tab2

    
    let dashContainer = [];

    // 数字可以调节dashed宽度
    let dashCounts = (this._containerWidth - tbw)/10
    for (var i = 0; i < dashCounts; i++) {
      dashContainer.push(
        i%2 === 0 ? <View style={styles.dashBlock} key={i} /> : <View style={[styles.dashBlock, styles.o_dashBlock]} key={i} />
      )
      // i%2 === 0 ? dashContainer.push(<View style={styles.dashBlock} />) : dashContainer.push(<View />)
    }


    let touchElement = (
      <Animated.View
        style={[
          styles.touchContainer,
          {
            transform: [
              {translateX: this._animatedValue.x}
            ],
            backgroundColor: touchColor[idx].bc,
            opacity: this.state.isTouch ? 0.7 : 1
          }
          ]}
        onLayout={ (e) => {this._touchBlockWidth = e.nativeEvent.layout.width} }
        {...this._panResponder.panHandlers}
      >
        <Image
          source={require('./imgs/car.png')}
          style={styles.car}
        />
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.summary_all}>{data.summary_all}元</Text>
        </View>
        {/*touchContainer end*/}
      </Animated.View>
    )

    let cardElement = (
      <View style={[styles.cardInfo, {opacity: this.state.isTouch ? 0 : 1, marginLeft: this.state.blockInLeft ? 0 : '-30%'}]}>
        <TouchableWithoutFeedback
          onPress={this.props.handleCardInfo}
        >
          <View>
            <View style={styles.cardInfoTop}>
              <View style={styles.descTitlewrap}>
                <Text style={styles.descTitle}>{ds.desc}</Text>
              </View>
              <View style={styles.cardSummaryWrap}>
                <Text style={styles.cardSummary}>共{ds.cards.length}张</Text>
                <Text style={[styles.cardSummary, styles.cardSummaryMoney]}>共消费{ds.summary_each}元</Text>
              </View>
              {/*cardInfoTop end*/}
            </View>
            <View style={styles.cardInfoDivision}>
              {
                dashContainer
              }
              <Animated.View style={{ width: this._animatedDivisionValue}}></Animated.View>
              {/*cardInfoDivision end*/}
            </View>
            <View style={styles.cardInfoBottom}>
              <Text>{ds.cards[0].card1}</Text>
              {/*cardInfoBottom end*/}
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/*cardInfo end*/}
      </View>
  )
    
    return (
      <View
        style={[styles.container, {backgroundColor: touchColor[idx].cc}]}
        onLayout={ (e) => {this._containerWidth = e.nativeEvent.layout.width} }
      >

        {/*<TouchableOpacity
          onPressIn={this._touchIn.bind(this)}
          onPressOut={this._touchOut.bind(this)}
        >*/}
          
        {/*</TouchableOpacity>*/}
        {/*{ this.state.blockInLeft ?
          <View style={styles.elementWrap}>{touchElement}{cardElement}</View>
          :
          <View style={styles.elementWrap}>{cardElement}{touchElement}</View>
        }*/}

        {touchElement}
        {cardElement}

        
        {/*container end*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    marginBottom: 20,
    borderRadius: 50,
    flexDirection: 'row',
  },
  elementWrap: {
  },
  touchContainer: {
    // flex: 1.3,
    width: '30%',
    position: 'relative',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2,
    zIndex: 100,
    // shadowColor: 'black',
    // shadowRadius: 2,
    // shadowOpacity: 1,

  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  summary_all: {
    color: '#fff',
    fontSize: 11,
  },
  car: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    // borderColor: 'blue'
  },
  titleWrap: {
    alignItems: 'center',
  },
  cardInfo: {
    // flex: 3,
    width: '70%',
  },
  cardInfoTop: {
    flexDirection: 'row',
    height: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descTitleWrap: {
    // flex: 1,
  },
  descTitle: {
    color: '#fff',
  },
  cardSummaryWrap: {
    // flex: 1,
    flexDirection: 'row',
    marginRight: 15,
  },
  cardSummary: {
    color:  '#fff',
    fontSize: 11,
    
  },
  cardSummaryMoney: {
    marginLeft: 10,
  },
  cardInfoDivision: {
    // borderTopWidth: 2,
    // borderColor: '#fff',
    // borderStyle: 'dotted',
    flexDirection: 'row',
  },
  dashBlock: {
    flex: 1,
    // width: 5,
    height: 2,
    backgroundColor: '#fff',
  },
  o_dashBlock: {
    backgroundColor: 'transparent',
  },
  zhezhao: {
    height: 2,
    width: 100,
    // position: 'absolute',
    backgroundColor: 'yellow',
  }

})

export default CardBlock;