let Mock  = require('mockjs');
const consoleInfo =  require ('../utils/info.js');
const api = function () {
		var successData = Mock.mock({
			//数据模拟区start
			

		    'data': {
		      'objArr|10': [
		        'AMD'
		      ],
		      'isBusiness|1-2': true, // 是否可以因公开票
		      'lastApplyTime': '@datetime("yyyy-MM-dd HH:mm:ss")', // 上次申请时间
		      'popupMessage': { // 弹框提示
		        'display|1-2': true, // 是否显示
		        'content': '@sentence(5, 15)' // 显示内容
		      },
		      'isReimbursement|1-2': true // 是否具有企业报销权限
		    }


		   //数据模拟区end
		  })

	  this.body = successData;
	}
exports.get = consoleInfo(api)
