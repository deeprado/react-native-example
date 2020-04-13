'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'

//Redux
import { connect } from 'react-redux'

import Nav from './nav'

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    navigationState: state.nav
  }
}

class Index extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <Nav
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}

// 配色有问题
export default connect(mapStateToProps)(Index)
