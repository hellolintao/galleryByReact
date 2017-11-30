// 导入初始化CSS，和主要的main.less布局文件
require('normalize.css/normalize.css');
require('styles/main.less');
require('styles/style.css');
// 导入两个基础包
import React from 'react';
import ReactDOM from 'react-dom';
import ControllerUnit from './ControllerUnit.js';
import ImgFigure from './ImgFigure.js';

// 获取图片相关的数据，存储在一个JSON文件中
var imageDatas = require('../data/imageDatas.json');

// 利用自执行函数，将图片名信息转化成图片URL路径信息，并存储到原变量中
imageDatas = ( function  genImageURL(imageDatasArr) {
  for(var i=0,j=imageDatasArr.length;i<j;i++){
    var singleImageDate = imageDatasArr[i];
    singleImageDate.imggeURL=require('../images/'+singleImageDate.fileName);
    singleImageDate[i] = singleImageDate;
  }
  return imageDatasArr;
})(imageDatas);

// 获取区间内的随机值
function getRangeRandom(low,high) {
  return Math.ceil(Math.random()*(high-low)+low)
}

// 获取0-30度之间的一个任意正负值
function get30DegRandom() {
  var result = (Math.random()>0.5?'':'-')+Math.ceil(Math.random()*30);
  if(result!=0){
    return result;
  }else{
    get30DegRandom();
  }
  
}


// 管理者模式：由一个类管理所有的数据和组件
class AppComponent extends React.Component {
  Constant={
    centerPos:{
      left: 0,
      right: 0
    },
    hPosRange:{//水平方向的取值范围
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{//垂直方向的取值范围
      x:[0,0],
      topY:[0,0]
    }
  };

  /*反转图片
  *@param index 输入当前被执行inverse操作的图片对应的图片信息数组的
  *return{Function} 这是一个闭包函数，其内部return一个真正待被执行的函数
  */
  inverse = function(index) {
    return function(){
      // 刚开始的时候会遍历数据数组，然后为每一个元素绑定这个函数，然后调用的时候，调用的时候就是每个元素自有的函数了。
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  };

  /**重新布局所有图片
  *@param centerIndex指定居中排布哪个图片
  */
  rearrange = function (centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr;
    var Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,
        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),//取出来一个或者不取
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
    // 首先居中centerIndex的图片,居中的照片不需要旋转
    imgsArrangeCenterArr[0]={
      pos:centerPos,
      isCenter:true,
      rotate:0
    }
        
    // 取出要布局在上册的图片的状态信息
    topImgSpliceIndex =  Math.ceil(Math.random() * (imgsArrangeArr.length-topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
    
    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((value,index)=>{
        imgsArrangeTopArr[index]={
          pos:{
            top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          },
          rotate:get30DegRandom(),
          isCenter:false
        };
      });

      for(var i = 0,j=imgsArrangeArr.length,k = j / 2;i<j;i++){
        var hPosRangeLORX = null;
        
        // 前半部分布局左面，右半部分布局右边
        if(i < k){
          hPosRangeLORX = hPosRangeLeftSecX;
        }else{
          hPosRangeLORX = hPosRangeRightSecX;
        }

        // 布局前半部分布局左边，右半部分布局右边
        imgsArrangeArr[i]={
          pos:{
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          },
          rotate:get30DegRandom(),
          isCenter:false
        };
      }

      if(imgsArrangeArr && imgsArrangeTopArr[0]){
        imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
      }

      imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
          
      this.setState({imgsArrangeArr:imgsArrangeArr});
    };
  constructor(props){
    super(props);
    this.state={
      imgsArrangeArr:[]
    }
  }

/*
  * 利用rearrange函数，居中对应的index的图片
  * @param index,需要被居中的图片对应的图片信息数组的index值
  * @return{Funtion}
*/
center=function(index){
  return function(){
    this.rearrange(index);
  }.bind(this);
}

  getInitialState(){
     /*  return imgArrangeArr=[
           {
            pos:{
              left:'0',
              top:'0'
            },
             rotate:0,旋转角度
             isInverse:false, //图片正反面
             isCenter:false,
          }
      ] */
  }

  // 组件加载以后，为每张图片计算其位置的范围
  componentDidMount(){
    // 首先拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

        // 拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageH - halfImgH
    }

    // 计算左侧和右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上面区域图片区域取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    
    this.rearrange(0);
  }


  render() {
    var ControllerUnits = [];
    var ImgFigures = [];
    imageDatas.forEach((value,index) => {
      // 初始化状态对象
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          },
          rotate:-5,
          isInverse:null,
          isCenter:false
        }
      }
      ImgFigures.push(<ImgFigure key={index} ref={'imgFigure'+index} data={value}
      arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
      center={this.center(index)}/>);

      ControllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
      center={this.center(index)}/>);
    });
    // 返回标签内容
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {ImgFigures}
        </section>
        <nav className="controller-nav">
          {ControllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
