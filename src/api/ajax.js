import axios from 'axios';

export default function ajax(url = '',data={},type = 'GET') {
  if(type === 'GET'){
    let dataStr = '';
    Object.keys(data).forEach(key => function() {
      dataStr += key + '=' +data[key] + '&';
    })
    if(dataStr !== ''){
      dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  return axios.get(url);
  }else{
    return axios.post(url,data);
  }
}
