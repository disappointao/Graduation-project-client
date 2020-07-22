import React, {Component} from 'react';
import CompanyModal from '../../containers/userInfoModal/companyModal';
import EmployerConfirmModal from '../userInfoModal/employerConfirmModal';
import SetCompanyModal from '../userInfoModal/setCompanyModal';

class InfoModal extends Component {
  state = {
    title:'',
    rightButton: '',
    isClick:true,
  };
  render() {
    const modalName = this.props.modalName;
    return (
      <div id='info_modal' style={{height:'100%  '}}>
        {
          (()=>{
            switch (modalName) {
              case 'companyModal':
                return <CompanyModal  isShow={this.props.isShow} modalName={this.props.modalName} data={this.props.data}/>;
              case 'employerConfirmModal':
                return <EmployerConfirmModal modified={this.props.modified} setModal = {this.props.setModal} isShow={this.props.isShow} modalName={this.props.modalName}  data={this.props.data}/>;
              case 'setCompanyModal':
                return <SetCompanyModal isShow={this.props.isShow} modalName={this.props.modalName} data={this.props.data} setModal = {this.props.setModal}/>;
              default:
                return null;
            }
          })()
        }
      </div>
    );
  }
}

export default InfoModal;
