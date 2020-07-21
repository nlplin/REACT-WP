import React, { Component } from 'react'
import { connect } from 'react-redux'
import SubMenu from 'antd/lib/menu/SubMenu'
import MenuItem from 'antd/lib/menu/MenuItem'
import { Link, withRouter, Route } from 'react-router-dom'
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
import Icons from '@conf/icons'
import { defaultRoutes } from '../../config/routes'


@withRouter
@connect(state => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  componentDidMount() {
    // console.log(this.props)


  }

  renderMenu = menus => {
    const path = this.props.location.pathname
    const reg = /[/][a-z]*/
    const res = path.match(reg)[0]

    return menus.map(menu => {
      if (menu.hidden) return
      const Icon = Icons[menu.icon]
      if (menu.children && menu.children.length) {
        return (<SubMenu key={menu.path} icon={<Icon />} title={menu.name}>
          {menu.children.map(anoMenu => {
            if (anoMenu.hidden) return
            return <MenuItem key={menu.path + anoMenu.path} title={anoMenu.name}>
              {<><Link to={menu.path + anoMenu.path}>{anoMenu.name}</Link>
                <Route path='menu.path + anoMenu.path'  component={this.props.permissionList.forEach(per => {
                  // console.log(path);
                  // console.log(per);
                  if (per.path === res) {
                    console.log(11111111)
                    per.children.forEach(childre => {
                      console.log(childre);
                      if (menu.path + anoMenu.path === childre.path) {
                        return childre.component
                      }
                    })
                  }
                })}></Route></>
              }

            </MenuItem>
          })}
        </SubMenu>)
      } else {
        return (<MenuItem key={menu.path} icon={<Icon />}>
          {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.name}
        </MenuItem>)
      }
    })
  }

  render() {
    let { permissionList } = this.props
    // console.log(permissionList)
    const path = this.props.location.pathname
    console.log(path)
    const reg = /[/][a-z]*/
    const res = path.match(reg)[0]
    // console.log(res);
    return (
      <>
        <Menu theme='dark' defaultSelectedKeys={[path]} mode='inline' defaultOpenKeys={[res]}>
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}

          {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
            Option 1
            </Menu.Item>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            Option 2
            </Menu.Item>
          <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<FileOutlined />} /> */}
        </Menu>
      </>
    )
  }
}
export default SiderMenu
