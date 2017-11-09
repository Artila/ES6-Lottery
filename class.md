base.js

- initPlayList 初始化奖金和玩法及说明
- initNumber 初始化号码 1~11
- setOmit 设置遗漏数据
- setOpenCode 设置开奖号码
- toggleCodeActive 号码选中取消
- changePlayNav 切换玩法
- assistHandle 操作区
- getName 获取当前彩票名称
- addCode 添加号码到购物车
- addCodeItem 添加单次号码
- getCount 金额和奖金计算
- getTotal 计算购物车所有金额
- getRandom 生成随机数
- getRandomCode 随机选号



calculate.js

- computeCount 计算注数
- computeBonus 奖金范围预测
- combine 组合运算，递归



interface.js

- getOmit 获取遗漏数据
- getOpenCode 获取开奖号码
- getState 获取当前状态



timer.js

- countdown 倒计时



lottery.js

- constructor 初始化
-  updateState 状态更新
- initEvent 初始化事件



server/routes/index.js

- makeIssue 输出当前期号(原是后端)，状态，截止时间
- get omit 获取遗漏
- get opencode 获取开奖号码
- get state 获取状态

