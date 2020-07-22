import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import {withRouter,Link} from 'react-router-dom';
import './employerItem.css'
import defaultImg from '../../assets/img/cdut.jpg'
const Header = Card.Header
const Body = Card.Body
const Footer=Card.Footer
class EmployerItem extends Component {
	render () {
		const {data} = this.props;
		const user = data.userData[0];
		const job = data.jobInfo[0];
		const company = data.companyInfo[0];
		return (
			<div id='employerItem' onClick={()=>{this.props.history.push(`/employerDetail/${data._id}`)}}>
				<WingBlank>
					<WhiteSpace/>
					<Card>
						<Header title={
							<div>
								<img src={user.avatar} alt="头像"/>
								<span>{user.gender===0?user.name.substr(0,1)+'女士':user.name.substr(0,1)+'先生'} · {user.job}</span>
							</div>
						} extra={
							<p>
								{job.name}
								<span>{data.jobType}</span>
							</p>
						}/>
						<Body>
							<p className='item-brief'>{data.brief}</p>
						</Body>
						<Footer content={
							<div className='item-footer'>
								<img src={company.logo} alt="头像" onError={(e) => {e.target.onerror = null;e.target.src={defaultImg}}} style={{borderRadius:'8px'}}/>
								<div className='text-content'>
									<span className='company-title'>{company.name}</span>
									<div>
										<span>{company.scale}</span>
										<span>{company.stage}</span>
										<div>{company.brief}</div>
									</div>
								</div>
							</div>
						}
						        extra={<span>{data.salary.split(',').length===0?data.salary.split(',')[0]:data.salary.split(',').join('-')}</span>}
						>
						</Footer>
					</Card>
				</WingBlank>
			</div>
		)
	}
}

export default withRouter(EmployerItem);