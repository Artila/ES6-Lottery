import 'babel-polyfill';
import Base from './lottery/base.js';
import Timer from './lottery/timer.js';
import Calculate from './lottery/calculate.js';
import Interface from './lottery/interface.js';
import $ from 'jquery';

// 深度拷贝
const copyProperties = function(target, source) {	
	// Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
	for (let key of Reflect.ownKeys(source)) {		
		if (key !== 'constructor' && key !== 'prototype' && key!== 'name') {	
			// 为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor() 和 Object.defineProperty()。
			let desc = Object.getOwnPropertyDescriptor(source, key);
			Object.defineProperty(target, key, desc);			
		}		
	}	
}

// 类的多重继承
const mix = function(...mixins) {
	class Mix{}
	
	for (let mixin of mixins) {
		copyProperties(Mix, mixin);
		copyProperties(Mix.prototype, mixin.prototype); 
		// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
	}
	
	return Mix;
}

// 继承四个类的综合类
class Lottery extends mix(Base, Calculate, Interface, Timer) {
	constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
		super();
		this.name = name;   // 区分多个彩种
		this.cname = cname; // 中文名称
		this.issue = issue; // 当前期号
		this.state = state; // 当前状态
		
		this.omit = new Map();            //遗漏， Map
		this.open_code = new Set();       //开奖号码， Set
		this.open_code_list = new Set();  //开奖记录， Set
		this.play_list = new Map();       // 玩法列表
		this.number =  new Set();         // 选号，1-11		
		
		this.el = '';                     // 当前选择器
		this.issue_el = '#curr_issue';    // 当前期号选择器
		this.countdown_el = '#countdown'; // 倒计时选择器
		this.state_el = 'state_el';       // 状态选择器
		this.cart_el = '.codelist';       // 购物车选择器
		this.omit_el = '.boll-list li';      // 遗漏选择器
		this.cur_play = 'r5';             // 当前默认玩法
		
		
		this.initPlayList();  // 初始化各玩法
		this.initNumber();    // 初始化号码
		this.updateState();   // 更新状态
		this.initEvent();     // 事件初始化
	}
	
	/**
	 * updateState 状态更新
	 */
	updateState() {
		let self = this;
		
		this.getState().then(function (res) {
			self.issue = res.issue;
			self.end_time = res.end_time;
			self.state = res.state;
			
			let open_issue = self.issue.slice(4);
			let today_issue = self.issue.slice(-2);
			let rest = 78 - today_issue *1;
			
			let tpl = `
				今天已售${today_issue}期，还剩<strong class = "red">${rest}</strong>期
			`;
			
			// 更新当前期号
			$(self.issue_el).text(res.issue);
			$('#open_issue').text(open_issue);
			$('.kj-date').html(tpl);
			
			// 更新倒计时
			self.countdown(res.end_time, function(time) {
				$(self.countdown_el).html(time);
			},function(){
				// 倒计时结束，开奖完毕，更新状态，获取开奖号码，获取遗漏数据
				setTimeout(function() {
					self.updateState();
					self.getOmit(self.issue).then(function(res){});
					self.getOpenCode(self.issue).then(function(res){});
				}, 500);
			})
		})
	}
	
	/**
	 * initEvent 初始化事件
	 */
	initEvent() {
		let self = this;
		// 选中玩法
		$('#plays').on('click', 'li', self.changePlayNav.bind(self));
		// 选中号码
		$('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self));
		// 添加号码
		$('#confirm_sel_code').on('click', self.addCode.bind(self));
		// 操作区：大 小 奇 偶
		$('.dxjo').on('click', 'li', self.assistHandle.bind(self));
		// 随机号码
		$('.qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self));
	}
}

export default Lottery;