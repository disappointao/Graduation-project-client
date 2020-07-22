import React, { Component } from 'react'
import { TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item
class NavBottom extends Component {

	static propTypes = {
		navList: PropTypes.array.isRequired,
		unReadCount: PropTypes.number.isRequired
	}

	render () {
		const navList = this.props.navList.filter(nav => !nav.hide)
		const { pathname } = this.props.location
		return (
			<div style={{ position: 'fixed', width: '100%', bottom:'-1px',zIndex:'20'}}>
				<TabBar
					unselectedTintColor="#949494"
					tintColor="#33A3F4"
					barTintColor="white"
					noRenderContent={true}
					hidden={false}
				>
					{
						navList.map((nav, index) => (
							<Item
								key={index}
								badge={nav.path === '/home/message' ? this.props.unReadCount: 0}
								title={nav.title}
								icon={{ uri: require(`../../assets/img/nav/${nav.icon}.svg`) }}
								selectedIcon={{ uri: require(`../../assets/img/nav/${nav.icon}_select.svg`) }}
								selected={pathname === nav.path}
								onPress={() => {
									this.props.history.replace(nav.path)
								}
								}

							/>
						))
					}
				</TabBar>
				</div>
		)
	}
}

export default withRouter(NavBottom)