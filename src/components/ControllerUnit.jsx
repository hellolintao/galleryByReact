// 这个组件是下面的控制条
import React from 'react';
class ControllerUnit extends React.Component{
	
	// 处理点击函数
	handleClick = function(e){
		// 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中显示
		if(this.props.arrange.isCenter){
			// 调用的是父组件传递进来的方法
	    	this.props.inverse();
	    }else{
	      this.props.center();
	    }
	    // 阻止事件冒泡
		e.stopPropagation();
    	e.preventDefault();
	};

	// 控制组件
	render(){
		var ControllerUnitClassName = 'control-unit';
		// 根据父组件的传递的arrange参数中的iscenter判断，组件是否处于中间状态，是的话添加新的类
		if(this.props.arrange.isCenter){
			ControllerUnitClassName += ' is-center';
			// 同上，添加is-inverse类
			if(this.props.arrange.isInverse){
				ControllerUnitClassName += ' is-inverse';
			}
		}
		return (
			<span className={ControllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
		);
	}
}

export default ControllerUnit;