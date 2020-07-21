import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo, getUserMenu } from './redux'
import Loading from './Loading'


@connect(null, { getUserMenu, getUserInfo })
class Authorized extends Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    let { getUserInfo, getUserMenu } = this.props
    await Promise.all([getUserInfo(), getUserMenu()])
    this.setState({
      loading: false
    })
    // this.props.getUserInfo()
    // this.props.getUserMenu()
  }
  render() {
    return this.state.loading ? <Loading></Loading> : this.props.render()
  }
}
export default Authorized
