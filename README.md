###angular-circle-slider

-------
####[Demo](http://w3cin.com/demo/angular-circle-slider/index.html)
一个基于angularJS的圆形slider(a circular slider based on angularJS)，目前具备一下功能：
- **基本功能** 滑动圆环修改数据
- **键盘事件** 支持键盘事件
- **自定义你的样式** 采用sass编译

####Requirements
- **jquery**
- **angular**

####Install
> bower install angular-circle-slider

> npm install angular-circle-slider

####Basic Usage
```html
<div circle-slider value="transofrmValue" max="360"></div>
var app = angular.module('app',['ui.circleSlider']);
```

#### Options
- **value**  初始化的数据
- **max** 最大值
- **readonly** 只读
- **onSliderStart** 开始滑动事件
- **onSliderEnd** 结束滑动事件
- **onSliderChange** 滑动事件

#### Support
`ie9+`  `chrome` `firefox` `safari`

####License
--------
This plugin is licensed under the MIT license.

Copyright (c) 2016 linjinying