class Timer {
	countdown(end, update, handle) {
		// 需要后端的时间戳
		const now = new Date().getTime();
		const self = this;
		
		if(now - end > 0) {
			// 倒计时结束
			handle.call(self);
			
		} else {
			
			let last_time = end - now;
			
			const day = 24*60*60*1000;
			const hour = 60*60*1000;
			const min = 60*1000;
			const sec = 1000;
			
			let rest_d = Math.floor(last_time/day);
			
			let last_h = last_time - rest_d*day;			
			let rest_h = Math.floor(last_h/hour);
			
			let last_m = last_h - rest_h*hour;
			let rest_m = Math.floor(last_m/min);
			
			let last_s = last_m - rest_m*min;
			let rest_s = Math.floor(last_s/sec);
			
			let r = [];
			
			if (rest_d > 0) {
				r.push(`<em>${rest_d}</em> 天 `);
			}
			// 判断有没有天数和小时数
			if (r.length || (rest_h > 0)) {
				r.push(`<em>${rest_h}</em> 时 `);
			}
			if (r.length || (rest_m > 0)) {
				r.push(`<em>${rest_m}</em> 分 `);
			}			
			if (r.length || (rest_s > 0)) {
				r.push(`<em>${rest_s}</em> 秒`);
			}					
			
			self.last_time = r.join('');
			
			update.call(self, r.join(''));
			
			setTimeout(function(){
				self.countdown(end, update, handle);
			}, 1000);
		}
	}
}

export default Timer;