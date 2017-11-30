import React from 'react';
class ControllerUnit extends React.Component{
	// 处理点击函数
	handleClick = function(e){
		// 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中显示
		if(this.props.arrange.isCenter){
	      this.props.inverse();
	    }else{
	      this.props.center();
	    }
		e.stopPropagation();
    	e.preventDefault();
	};
	// 控制组件
	render(){
		var ControllerUnitClassName = 'control-unit';

		// 如果对应的是居中的图片，显示控制阿牛的居中态
		if(this.props.arrange.isCenter){
			ControllerUnitClassName += ' is-center';

			// 如果同时对应的是翻转图片，显示控制按钮的翻转态
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