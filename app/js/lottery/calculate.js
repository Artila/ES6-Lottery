class Calculate {
	/**
	 * computeCount 计算注数
	 * active    number 当前选中的号码
	 * play_name string 当前的玩法标识
	 * return    number 注数
	 */	
	computeCount(active, play_name) {
		// 注数设为0
		let count = 0;
		// 玩法是否存在
		const exist = this.play_list.has(play_name);
		
		const arr = new Array(active).fill('0');
		// 玩法是否存在以及是否是"任二~任八"的玩法，标识名为"r2~r8"
		if (exist && play_name.at(0) === 'r') {
			// 直接通过类来调用，这就是“静态方法”。
			count = Calculate.combine(arr, play_name.split('')[1]).length;
		}
		
		return count;
	}
	
	/**
	 * computeBonus 奖金范围预测
	 * active    number 当前选中的号码
	 * play_name string 当前的玩法标识
	 * return    array  奖金范围
	 */	
	computeBonus(active, play_name) {
		const play = play_name.split('');
		const play_num = play[1]*1; // 当前的玩法数字
		const self = this;
		
		let arr = new Array(play_num).fill(0);
		let min, max;
		
		if (play[0] === 'r') {
			// 最小命中数 
			let min_active = 5 - (11 - active);
			// 最小命中数1~5，选中的号码数7~11
			if (min_active > 0) {
				// 任一~任五
				if (min_active - play_num >= 0) {

					arr = new Array(min_active).fill(0);
					min = Calculate.combine(arr, play_num).length;
					
				} else {
					// 任六，七，八，且选中的号码超过play_num
					if (play_num - 5 > 0 && active - play_num >= 0) {
						
						arr = new Array(active - 5).fill(0);
						min = Calculate.combine(arr, play_num - 5).length;
						
					} else {						
						min = active - play_num > -1 ? 1 : 0;
					}
					
				}
			} else {				
				min = active - play_num > -1 ? 1 : 0;
			}
			
			let max_active = Math.min(active, 5);
			
			if (play_num - 5 > 0) {
				if (active - play_num >= 0) {
					
					arr = new Array(active - 5).fill(0);
					max = Calculate.combine(arr, play_num - 5).length;
					
				} else{
					max = 0;
				}
			} else if(play_num - 5 < 0) {
				
				arr = new Array(Math.min(active, 5)).fill(0);
				max = Calculate.combine(arr, play_num).length;
				
			} else {
				max = 1;
			}
			
		}
		
		return [min, max].map(item => item*self.play_list.get(play_name).bonus);
		
	}
	
	
	/**
	 * combine 组合运算，递归
	 * arr    array  参与组合运算的数组
	 * size   number 组合运算的基数,多少个数字为一组
	 * return number 计算注数
	 */		
	static combine(arr, size) {
		let allResult = [];
		
		(function f(arr, size, result){
			let arrLen = arr.length;
			
			if (size > arrLen) {
				return;
			}
			// 这里是判断，千万不要只写一个“=”
			if (size === arrLen) {
				
				allResult.push([].concat(result, arr));
			
			}	else {
				for (let i = 0; i < arrLen; i++) {
					let newResult = [].concat(result);
					
					newResult.push(arr[i]);
					
					if (size === 1) {
						
						allResult.push(newResult);
					
					} else {
						
						let newArr = [].concat(arr);
						
						newArr.splice(0, i+1);
						
						f(newArr, size-1, newResult);
					}
				}
			}
			
		})(arr, size, []);
		
		return allResult;
	}
}

export default Calculate;
