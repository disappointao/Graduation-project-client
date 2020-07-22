import React, {Component} from 'react';
import Nav from '../../components/nav/nav';
import {abilityData} from '../../utils';
import {Modal,Toast,Tag} from 'antd-mobile';
const alert = Modal.alert;
let dataArr = [];
class Ability extends Component {
  saveData = ()=>{
    if(dataArr.length!==0){
	    let data = dataArr.filter(function (s) {
		    return s && s.trim();
	    });
      this.props.setAbility(data.join(','));
      this.props.setModal();
    }else{
      Toast.fail('请选择能力',1);
    }
  };
  change = (val)=>{
    if(dataArr.indexOf(val)!==-1){
      let index = dataArr.indexOf(val);
      dataArr.splice(index,1)
    }else{
      dataArr.push(val);
    }
  };
  componentWillMount() {
    dataArr = this.props.value.split(',');
  }

  render() {
    return (
      <div id='ability'>
        <Nav click={
          () =>
            alert('返回', '未保存，确定返回吗', [
              { text: '取消', onPress: () => console.log('取消') },
              { text: '返回', onPress: () => this.props.setModal() },
            ])
        } right={<span onClick={this.saveData}>保存</span>}/>
        <div className='ability-head'>
          <p>综合能力</p>
          <span>请选择最符合你能力的标签，标签会在简历中至关的展示给招聘官,建议3个</span>
        </div>
        <div className='ability-content'>
          {
            abilityData.map((item,index)=>{
              return <Tag key={index} selected={dataArr.indexOf(item) !==-1}  onChange={()=>this.change(item)}>{item}</Tag>
            })
          }
        </div>
      </div>
    );
  }
}

export default Ability;
