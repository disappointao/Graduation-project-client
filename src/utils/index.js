//modal 顶部Nav相关信息
const infoModalList = {
  companyModal:{
    title:'公司全称',
    rightButton:'确定'
  },
  employerConfirmModal:{
    title:'确定加入',
    rightButton:'加入'
  },
  setCompanyModal:{
    title:"公司信息",
    rightButton:'新建'
  }
};
export const initNav = (modalName)=>{
  let obj = {};
  for(let key in infoModalList){
    if(key === modalName){
      obj = infoModalList[key];
      break;
    }
  }
  return obj;
};

//获取
let locationData = require('./location');

export const getAddress = (areaCode) => {
  let addressArr = areaCode.split(',');
  let addressStr = '';
  let province = locationData[addressArr[0]].name;
  let city = locationData[addressArr[0]].cities[addressArr[1]].name;
  let area =locationData[addressArr[0]].cities[addressArr[1]].districts[addressArr[2]];
  addressStr = province+','+city+','+area;
  return addressStr
};

// 求职者和招聘者默认头像
export const employeeAvatarData = [
  {url:'http://localhost:4000/images/avatar/employee1.png'},
  {url:'http://localhost:4000/images/avatar/employee2.png'},
  {url:'http://localhost:4000/images/avatar/employee3.png'},
  {url:'http://localhost:4000/images/avatar/employee4.png'},
  {url:'http://localhost:4000/images/avatar/employee5.png'},
  {url:'http://localhost:4000/images/avatar/employee6.png'},
  {url:'http://localhost:4000/images/avatar/employee7.png'},
  {url:'http://localhost:4000/images/avatar/employee8.png'},
];
export const employerAvatarData =[
  {url:'http://localhost:4000/images/avatar/employer1.png'},
  {url:'http://localhost:4000/images/avatar/employer2.png'},
  {url:'http://localhost:4000/images/avatar/employer3.png'},
  {url:'http://localhost:4000/images/avatar/employer4.png'},
  {url:'http://localhost:4000/images/avatar/employer5.png'},
  {url:'http://localhost:4000/images/avatar/employer6.png'},
  {url:'http://localhost:4000/images/avatar/employer7.png'},
  {url:'http://localhost:4000/images/avatar/employer8.png'}
];


//生日选择

export const birthData = [
  [
    {
      label: '1996',
      value: '1996',
    },
    {
      label: '1997',
      value: '1997',
    },
    {
      label: '1998',
      value: '1998',
    },
    {
      label: '1999',
      value: '1999',
    },
    {
      label: '2000',
      value: '2000',
    },
    {
      label: '2001',
      value: '2001',
    },
  ],
  [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
  ],
  [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
    {
      label: '13',
      value: '13',
    },
    {
      label: '14',
      value: '14',
    },
    {
      label: '15',
      value: '15',
    },
    {
      label: '16',
      value: '16',
    },
    {
      label: '17',
      value: '17',
    },
    {
      label: '18',
      value: '18',
    },
    {
      label: '19',
      value: '19',
    },
    {
      label: '221',
      value: '221',
    },
    {
      label: '21',
      value: '21',
    },
    {
      label: '22',
      value: '22',
    },
    {
      label: '23',
      value: '23',
    },
    {
      label: '24',
      value: '24',
    },
    {
      label: '25',
      value: '25',
    },
    {
      label: '26',
      value: '26',
    },
    {
      label: '27',
      value: '27',
    },
    {
      label: '28',
      value: '28',
    },
    {
      label: '29',
      value: '29',
    },
    {
      label: '30',
      value: '30',
    },
    {
      label: '31',
      value: '31',
    },
  ]
];

//判断年级
export const getAge = (year,month,day)=>{
  var now = new Date();
  var dec = now.getFullYear() - year;
  //处理闰年
  if(month === 2 && day === 29 && !isLeap(now.getFullYear())){
    day = 28;//没有29号生日为28号
  }
  //得到今年的生日
  var birthdayThisyear = new Date(now.getFullYear(),month - 1,day);//month - 1 是为了处理month数组从0开始
  if(birthdayThisyear > now){
    dec --;
  }
  return dec;
};
//判断润年
function isLeap(year){
  if(year % 100 === 0 && year % 400 === 0 || year % 100 !== 0 && year % 4 === 0){
    return true;
  }else{
    return false;
  }
};

//男女选择
export const genderData =[
  [{
    label: '女',
    value: 0,
  },
    {
      label: '男',
      value: 1,
    }
  ]
];
//当前身份
export const identityData = [
  [{
    label: '职场人士',
    value: '职场人士',
  },
    {
      label: '学生',
      value: '学生',
    }
  ]
];
//学历
export const educationData =
  [
    {
      label:'大专',
      value:'大专'
    },
    {
      label:'本科',
      value:'本科',
      children:[
        {
          label:'统招',
          value:'统招'
        },
        {
          label:'非统招',
          value:'非统招'
        },
      ]
    },
    {
      label:'硕士',
      value:'硕士'
    },
    {
      label:'博士',
      value:'博士'
    }

];

//入学时间
export const enrollmentData = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
    {
      label: '2015',
      value: '2015',
    },
    {
      label: '2016',
      value: '2016',
    },
    {
      label: '2017',
      value: '2017',
    },
    {
      label: '2018',
      value: '2018',
    },
  ],
  [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
  ],
];

//毕业时间

export const graduationData = [
  [
    {
      label: '2017',
      value: '2017',
    },
    {
      label: '2018',
      value: '2018',
    },
    {
      label: '2019',
      value: '2019',
    },
    {
      label: '2020',
      value: '2020',
    },
    {
      label: '2021',
      value: '2021',
    },
    {
      label: '2022',
      value: '2022',
    },
  ],  [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
  ],

];

//公司规模和公司发展阶段picker数据


export const companyScale = [
  [{
    label: '少于15人',
    value: '少于15人',
  },
    {
      label: '15-50人',
      value: '15-50人',
    },
    {
      label: '50-150人',
      value: '50-150人',
    },
    {
      label: '150-500人',
      value: '150-500人',
    },
    {
      label: '500-2000人',
      value: '500-2000人',
    },
    {
      label: '2000人以上',
      value: '2000人以上',
    }
  ]
];

export const companyStage = [
  [
    {
      label: '未融资',
      value: '未融资',
    },
    {
      label: '天使轮',
      value: '天使轮',
    },
    {
      label: 'A轮',
      value: 'A轮',
    },
    {
      label: 'B轮',
      value: 'B轮',
    },
    {
      label: 'C轮',
      value: 'C轮',
    },
    {
      label: 'D轮及以上',
      value: 'D轮及以上'
    },
    {
      label: '上市公司',
      value: '上市公司'
    },
    {
      label:'不需要融资',
      value: '不需要融资'
    }
  ]
];
export const abilityData =[
  '个人能力',
  '团队能力',
  '时间管理',
  '责任心',
  '适应能力',
  '编程能力',
  '逻辑能力',
  '决策能力',
  '领导能力',
  '团队精神',
  '想象力',
  '语言能力',
  '外语能力',
  '数据库软件',
  '前端',
  '后端',
  '全栈'
];
export const salaryData =[
	{
		label:'4k',
		value:'4k',
		children:[
			{
				label:'5k',
				value:'5k'
			},
			{
				label:'6k',
				value:'6k'
			},
			{
				label:'7k',
				value:'7k'
			}
		]
	},
	{
		label:'5k',
		value:'5k',
		children:[
			{
				label:'6k',
				value:'6k'
			},
			{
				label:'7k',
				value:'7k'
			},
			{
				label:'8k',
				value:'8k'
			}
		]
	},
	{
		label:'6k',
		value:'6k',
		children:[
			{
				label:'7k',
				value:'7k'
			},
			{
				label:'8k',
				value:'8k'
			},
			{
				label:'9k',
				value:'9k'
			}
		]
	},
	{
		label:'7k',
		value:'7k',
		children:[
			{
				label:'8k',
				value:'8k'
			},
			{
				label:'9k',
				value:'9k'
			},
			{
				label:'10k',
				value:'10k'
			}
		]
	},
	{
		label:'10k以上',
		value:'10K以上',
	}
];


//底部导航数据
export const navListData = [
  {
    icon:'info',
    title:'大神',
    path:'/home/employeeList'
  },
  {
    icon:'info',
    title:'老板',
    path:'/home/employerList',
  },
  {
    icon:'company',
    title:'公司',
    path:'/home/company',
  },
	{
		icon:'message',
		title:'消息',
		path:'/home/message',
	},
  {
    icon:'my',
    title:'我的',
    path:'/home/myInfoEmployee'
  },
	{
		icon:'my',
		title:'我的',
		path:'/home/myInfoEmployer'
	}
]

