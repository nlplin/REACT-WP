import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import SiderMenu from '../SiderMenu'
import { connect } from 'react-redux'
import './index.less'

import logo from '@assets/images/logo.png'
import { user } from '../../components/Authorized/redux'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
@withRouter
@connect(state => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }
  componentDidMount() {
    // console.log(this.props)
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render() {
    let { name, avatar, permissionList } = this.props.user
    const path = this.props.location.pathname
    const reg = /[/][a-z]*/g
    const mat = path.match(reg)
    const fir = mat[0]
    const sec = mat[1]
    const thi = mat[2] || ''
    let firstName
    let secondName
    permissionList.forEach(per => {
      if (per.path === fir) {
        firstName = per.name
        per.children.forEach(second => {
          // console.log(second)
          if (second.path === sec + thi)
            secondName = second.name
        })
      }
    })

    return (
      <Layout className='layout'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo'>
            <img src={logo} alt='' />
            {/* <h1>硅谷教育管理系统</h1> */}
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>
        </Sider>

        <Layout className='site-layout'>
          <Header className='layout-header'>
            <img src={avatar} alt='' />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav'>
              {firstName === undefined ? ('首页') :
                (<Breadcrumb>
                  <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                  <Breadcrumb.Item style={{ fontWeight: 600 }}>{secondName}</Breadcrumb.Item>
                </Breadcrumb>)}

              <h3 className="titl">{secondName}</h3>
            </div>

            <div className='layout-content'>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default PrimaryLayout