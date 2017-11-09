import $ from 'jquery';

// 接口模块，把所有的接口都封装在一起
class Interface { 
	/**
	 * getOmit 获取遗漏数据
	 * issue string 当前期号
	 * return
	 */
	getOmit(issue) {
		let self = this;
		
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/get/omit',
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					self.setOmit(res.data);
					resolve.call(self, res);
				},
				error: function(err) {
					reject.call(err);
				}
			});
		});
	}
	
	/**
	 * getOpenCode 获取开奖号码
	 * issue string 当前期号
	 * return
	 */	
	getOpenCode(issue) {
		let self = this;
		
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/get/opencode',
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					self.setOpenCode(res.data);
					resolve.call(self, res);
				},
				error: function(err) {
					reject.call(err);
				}
			});
		});
	}
	
	/**
	 * getState 获取当前状态
	 * issue string 当前期号
	 * return
	 */	
	getState(issue) {
		let self = this;
		
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/get/state',
				data: {
					issue: issue
				},
				dataType: 'json',
				success: function(res) {
					resolve.call(self, res);
				},
				error: function(err) {
					reject.call(err);
				}
			});
		});		
	}
}

export default Interface;
