import React, { Component } from 'react'
import { Tabs, Badge, Carousel, WingBlank, SearchBar } from 'antd-mobile'
import CompanyItem from '../../components/companyItem/companyItem'
import SpaceItem from '../../components/spaceItem/spaceItem'
import { reqGetAllCompany, reqGetSpace } from '../../api'
import './company.css'
import QueueAnim from 'rc-queue-anim'
const tabs = [
	{ title: <Badge text={'3'}>公司库</Badge> },
	{ title: <Badge text={'今日(20)'}>动态</Badge> },
];
class Company extends Component {
	state={
		height:'',
		data: ['1', '2', '3'],
		imgHeight: 176,
		listData:[],
		spaceList:[]
	}
	componentWillMount () {
		this.setState({
			height:window.innerHeight-43.5-50
		})
	}
	async componentDidMount() {
		let response = await reqGetAllCompany();
		let result  = response.data.data;
		let spaceResponse = await reqGetSpace({});
		let spaceResult = spaceResponse.data.data;
		this.setState({
			listData:result,
			spaceList:spaceResult,
		})
		setTimeout(() => {
			this.setState({
				data: ['1', '2', '3'],
			});
		}, 100);
	}
	render () {
		const {listData} = this.state
		return (
			<div id='company'>
				<Tabs tabs={tabs }
				      initialPage={0}
				      onChange={(tab, index) => { console.log('onChange', index, tab); }}
				      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
				      tabBarActiveTextColor='white'
				      tabBarInactiveTextColor='#A4E5E0'
				      tabBarBackgroundColor = '#37C2BB'
				      tabBarUnderlineStyle={{border:'1px solid #37C2BB'}}
				      swipeable={false}
				>
					<div style={{ height:'auto',padding:'0 0 50px 0'}}>
						<SearchBar placeholder="搜索公司" maxLength={8} />
						<div className='company-content'>
							<QueueAnim type={'scale'}>
								{listData.map((item,index) => (
									<div key={index}>
										<WingBlank>
										<CompanyItem data={item}/>
										</WingBlank>
									</div>
								))}
							</QueueAnim>
						</div>
					</div>
					<div style={{ height:'auto', padding:'10px 0 50px 0'}}>
						<WingBlank>
							<Carousel
								autoplay={false}
								infinite
								beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
								afterChange={index => console.log('slide to', index)}
							>
								{this.state.data.map(val => (
									<a
										key={val}
										style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
									>
										<img
											src={require(`../../assets/img/space/space_${val}.png`)}
											alt=""
											style={{ width: '100%', verticalAlign: 'top' }}
											onLoad={() => {
												// fire window resize event to change height
												window.dispatchEvent(new Event('resize'));
												this.setState({ imgHeight: 'auto' });
											}}
										/>
									</a>
								))}
							</Carousel>
						</WingBlank>
						<WingBlank>
							<QueueAnim>
							{
								this.state.spaceList.map((item,index)=>
									<SpaceItem key={index} data={item}/>
								)
							}
							</QueueAnim>
						</WingBlank>
					</div>
				</Tabs>
			</div>
		)
	}
}

export default Company