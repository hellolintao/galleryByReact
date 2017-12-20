import React from 'react';
// ImageFigure组件，每一张图片单元
class ImgFigure extends React.Component {
   
  // imageFigure点击处理函数
  handleClick = function (e) {
    if(this.props.arrange.isCenter){
      // 调用父组件传递进来的参数
      this.props.inverse();
    }else{
      this.props.center();
    }
    // 阻止事件冒泡
    e.stopPropagation();
    e.preventDefault();
  }

   render() {
    // 因为这些图片是随机排列的，这里得到的是每个图片的位置
    var styleObj = {};
    // 如果props属性中指定了这个图片的位置，则使用
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    // 如果图片的旋转角度有值并且不为0，添加旋转角度，同时对于浏览器兼容器进行了处理
    if(this.props.arrange.rotate){
      ['MozTransform','msTransform','WebkitTransform',''].forEach(value=>{
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      });

    }
    // 设置最上层的图片位于最上面
    if(this.props.arrange.isCenter){
      styleObj.zIndex = 11;
    }
    // 给figure标签添加类
    var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse':'';

    // 需要传递的参数有 data中的imggeUrl，title，desc，arrange中的pos和rotate
    return (
      // 这个标签标示自包含的内容，放在哪里都有意义
      <figure className={imgFigureClassName} style={styleObj} onClick={(e) => {this.handleClick(e)}}>
          <img src={this.props.data.imggeURL}
                alt={this.props.data.title}
          />
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
            <div className="img-back" >
              <p>
                {this.props.data.desc}
              </p>
          </div>
          </figcaption>
      </figure>
      
    );
  }
}
export default ImgFigure;