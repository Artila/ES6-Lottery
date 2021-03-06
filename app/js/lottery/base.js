import $ from 'jquery';

// 基础功能模块
class Base {
	/**
	 * initPlayList 初始化奖金和玩法及说明
	 */	
	initPlayList() {
		// play_list 是一个 Map 数据结构
		this.play_list.set('r2', {
			bonus: 6,
			tip: '从01～11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元',
			name: '任二'
		})
		.set('r3', {
			bonus: 19,
			tip: '从01～11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同，即中奖<em class="red">19</em>元',
			name: '任三'			
		})
		.set('r4', {
			bonus: 78,
			tip: '从01～11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78</em>元',
			name: '任四'					
		})
		.set('r5', {
			bonus: 540,
			tip: '从01～11中任选5个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">540</em>元',
			name: '任五'					
		})
		.set('r6', {
			bonus: 90,
			tip: '从01～11中任选6个或多个号码，所选号码与开奖号码任意五个号码相同，即中奖<em class="red">90</em>元',
			name: '任六'					
		})
		.set('r7', {
			bonus: 26,
			tip: '从01～11中任选7个或多个号码，所选号码与开奖号码任意五个号码相同，即中奖<em class="red">26</em>元',
			name: '任七'					
		})
		.set('r8', {
			bonus: 9,
			tip: '从01～11中任选8个或多个号码，所选号码与开奖号码任意五个号码相同，即中奖<em class="red">9</em>元',
			name: '任八'					
		});
	}

	/**
	 * initNumber 初始化号码 1~11
	 */	
	initNumber() {
		for (let i = 1; i < 12; i++) {
			// Set初始化
			this.number.add(('' + i).padStart(2, '0'));
		}
	}

	/**
	 * setOmit 设置遗漏数据
	 * omit Map 遗漏数据
	 */	
	setOmit() {
		// 先清空，再赋值
		let self = this;
		self.omit.clear();
		
		for (let [index, item] of self.omit.entries()) {
			self.omit.set(index, item);
		}
		
		$(self.omit_el).each(function (index, item) {
			let num = $(item).find('.btn-boll').text();
			
			if (self.omit.has(num)) {
				$(item).find('span').text('1');
			}
			
		});
	}
	
	/**
	 * setOpenCode 设置开奖号码
	 * open_code Set 开奖数据
	 */	
	setOpenCode(code) {
		// 先清空，再赋值
		let self = this;
		self.open_code.clear();
		
		for (let item of code.values()) {
			self.open_code.add(item.padStart(2, '0'));
		}
		
		console.log(self.open_code);
		
		self.updateOpenCode(self.open_code);
		self.updateOpenCodeList(self.issue, self.open_code);
	}
	
	/**
	 * updateOpenCode 更新开奖号码
	 */		
	updateOpenCode(code) {
		let self = this;
		let arr = Array.from(code);
		
		$('#open_code_list li').each(function (i, t) {
			$(t).text(arr[i]);
		});
	}
	
	updateOpenCodeList(issue, code) {

		let open_issue = issue.slice(4);
		let open_code = Array.from(code);
		
		let big = 0; // 大
		let odd = 0; // 奇数
		open_code.forEach( function(value, index, array) {
		  if (value > 5) {
		  	big++;
		  }
		  
		  if (value%2 == 1) {
		  	odd++;
		  }
		});
		
		let c = open_code.join(' ');		
		
		let tpl = `
			<tr issue="${open_issue}">
        <td class="issgray">${open_issue}</td>
        <td>
        	<em class="red">${c}</em>
        </td>
        <td>
        	<span class="gray666">${big}:${5-big}</span>
        	<span class="gray666">${odd}:${5-odd}</span>
        </td>
      </tr>
		`;
		
		$('.kpkjcode tbody').prepend(tpl);		
		
	}
	
	/**
	 * toggleCodeActive 号码选中取消
	 */		
	toggleCodeActive(e) {
		let self = this;
		let $cur = $(e.currentTarget);
		
		$cur.toggleClass('btn-boll-active');
		
		self.getCount();
	}
	
	/**
	 * changePlayNav 切换玩法
	 */		
	changePlayNav(e) {
		let self = this;
		let $cur = $(e.currentTarget);
		//选中的 +active，其他 -active
		$cur.addClass('active').siblings().removeClass('active');
		// 获取玩法，并转为小写，例如 R3 => r3
		self.cur_play = $cur.attr('desc').toLocaleLowerCase();
		// 更新玩法提示
		$('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
		// 切换玩法后，把已选中的号码清空
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		
		self.getCount();
	}	
	
	/**
	 * assistHandle 操作区
	 * 操作区：全  大  小  奇  偶  清空
	 */			
	assistHandle(e) {
		e.preventDefault(); // 阻止默认操作
		
		let self = this;
		let $cur = $(e.currentTarget);
		let index = $cur.index();
		// 先清空已选中的小球
		$('.boll-list .btn-boll').removeClass('btn-boll-active');
		// 全选
		if (index === 0) {
			$('.boll-list .btn-boll').addClass('btn-boll-active');
		}
		// 大的号码
		if (index === 1) {
			$('.boll-list .btn-boll').each(function (i, t) {
				if (t.textContent - 5 > 0) {
					$(t).addClass('btn-boll-active');
				}
			});
		}	
		// 小的号码
		if (index === 2) {
			$('.boll-list .btn-boll').each(function (i, t) {
				if (t.textContent - 6 < 0) {
					$(t).addClass('btn-boll-active');
				}
			});
		}			
		// 奇数号码
		if (index === 3) {
			$('.boll-list .btn-boll').each(function (i, t) {
				if (t.textContent%2 == 1) {
					$(t).addClass('btn-boll-active');
				}
			});
		}			
		// 偶数号码
		if (index === 4) {
			$('.boll-list .btn-boll').each(function (i, t) {
				if (t.textContent%2 == 0) {
					$(t).addClass('btn-boll-active');
				}
			});
		}	
		
		self.getCount();
	}

	/**
	 * getName 获取当前彩票名称
	 */	
	getName() {
		return this.name;
	}
	
	/**
	 * addCode 添加号码到购物车
	 */		
	addCode() {
		let self = this;
		// 选中的号码
		let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g);
		let active = $active ? $active.length : 0;
		let count = self.computeCount(active, self.cur_play);
		
		if (count) {
			self.addCodeItem($active.join(' '), self.cur_play, self.play_list.get(self.cur_play).name, count);
		}
	}
	
	/**
	 * addCodeItem 添加单次号码
	 */		
	addCodeItem(code, type, typeName, count) {
		let self = this;
		
		const tpl = `
		<li codes = "${type}|${code}" bonus = "${count*2}" count = "${count}">
			<div class = "code">
				<b>${typeName}${count > 1 ? "复式" : "单式"}</b>
				<b class = "em">${code}</b>
				[${count}注, <em class = "code-list-money">${count*2}</em>元]
			</div>
		</li>
		`;
		
		$(self.cart_el).append(tpl);
		
		self.getTotal();
	}
	
	/**
	 * getCount 金额和奖金计算
	 */		
	getCount() {
		let self = this;
		let active = $('.boll-list .btn-boll-active').length;
		let count = self.computeCount(active, self.cur_play);
		let range = self.computeBonus(active, self.cur_play);
		let money = count*2;

		let win1 = range[0] - money;
		let win2 = range[1] - money;
		let tpl;
		let c1 = (win1 < 0 && win2 < 0) ? Math.abs(win1) : win1;
		let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2;
		
		if (count === 0) {
			
			tpl = `您选了 <b class = "red">${count}</b>注， 共  <b class = "red">${count*2}</b> 元`;
			
		} else if (range[0] === range[1]) {
			
			tpl = `
			您选了 <b>${count}</b>注， 共  <b>${count*2}</b> 元，
			<em>若中奖, 奖金: <strong class = "red">${range[0]}</strong> 元， 
			您将${win1 >= 0 ? '盈利' : '亏损'}
			<strong class = "${win1 >=0 ? 'red' : 'green'}">${Math.abs(win1)}</strong> 元</em>`;
			
		} else {
			
			tpl = `
			您选了 <b>${count}</b>注， 共  <b>${count*2}</b> 元，
			<em>若中奖, 奖金: <strong class = "red">${range[0]}</strong> 至 <strong class = "red">${range[1]}</strong> 元，
			您将${win1 < 0 && win2 < 0 ? '亏损' : '盈利'}
			<strong class = "${win1 >=0 ? 'red' : 'green'}">${c1}</strong> 
			至 <strong class = "${win2 >=0 ? 'red' : 'green'}">${c2}</strong> 元</em>`;
			
		}
		
		$('.sel_info').html(tpl);
	}
	
	/**
	 * getTotal 计算购物车所有金额
	 */		
	getTotal() {
		let count = 0;
		
		$('.codelist li').each(function (index, item) {
			count += $(item).attr('count')*1;
		});
		
		$('#count').text(count);
		$('#money').text(count*2);
	}
	
	/**
	 * getRandom 生成随机数
	 * num number 随机数的个数
	 */		
	getRandom(num) {
		let arr = [], index;
		// 将 Set 转为 Array
		let number = Array.from(this.number);
		
		while(num--) {
			index = Number.parseInt(Math.random()*number.length);
			arr.push(number[index]);
			// 保证每次号码都不重复
			number.splice(index, 1);
		}
		return arr.join(' ');
	}
	
	/**
	 * getRandomCode 随机选号
	 */		
	getRandomCode(e) {
		e.preventDefault();
		let self = this;
		// 获取注数
		let num = e.currentTarget.getAttribute('count');
		// 获取玩法的数字
		let play = this.cur_play.match(/\d+/g)[0];
		
		if (num === '0') {
			
			$(self.cart_el).html('');
			
		} else {
			
			for (let i = 0; i < num; i++) {
				
				self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1);
			}
			
		}
	}
}

export default Base;