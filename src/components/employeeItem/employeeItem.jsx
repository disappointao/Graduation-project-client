import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace, Badge } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './employeeItem.css'
const Header = Card.Header
const Body = Card.Body
const Footer = Card.Footer;
function identity (time) {
	var date=new Date;
	var y = date.getFullYear();
	if(time<y){
		return '往届'
	}else if(time == y){
		return '应届'
	}else{
		return '在校学生'
	}
}
class EmployeeItem extends Component {
	componentDidMount () {

	}
	render () {
		const {data} = this.props;
		return (
			<div id='employeeItem' onClick={()=>this.props.history.push({pathname:`/resume/${data.userData[0]._id}`,query:{chat:true}})}>
				<WingBlank>
						<WhiteSpace/>
					<Card>
						<Header title={data.jobInfo[0].name} extra={data.salary.split(',').length===0?data.salary.split(',')[0]:data.salary.split(',').join('-')}/>
						<Body>
							<div className='item-ability'>
								{
									data.userData[0].ability.split(',').map((item,index)=>
										<span key={index}>
											{item}
										</span>
									)
								}
							</div>
							<p className='item-brief'>{data.brief}</p>
					</Body>
						<Footer content={
							<div className='item-footer'>
							<img src={data.userData[0].avatar} alt=""/>
							<span>{data.userData[0].name}</span>
						  </div>
						}
						extra={<span>{identity(data.userData[0].graduation.split(',')[0])}</span>}
						>
						</Footer>
					</Card>
				</WingBlank>
			</div>
		)
	}
}

export default withRouter(EmployeeItem);