import React, { Component } from 'react'
import './companyItem.css'
import {getAddress} from '../../utils'
import {withRouter} from 'react-router-dom';
class CompanyItem extends Component {
	render () {
		const data = this.props.data;
		return (
			<div id='companyItem' onClick={()=>this.props.history.push(`/companyDetail/${data._id}`)}>
				<div className='item-head'>
					<img src={data.logo} alt="公司"/>
					<div>
						<p>{data.name}</p>
						<span>{getAddress(data.address).split(',').join('·')}</span>
					</div>
				</div>
				<div className="item-body">
					<div className='item-ability'>
						<span>{data.stage}</span>
						<span>{data.scale}</span>
						<span>{data.shortName}</span>
					</div>
					<div className='item-line'></div>
					<span className='item-foot'>
						{data.brief}
					</span>
				</div>
			</div>
		)
	}
}

export default withRouter(CompanyItem)