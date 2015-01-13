var bord=new Array(),//各个格子的东西
	score=0;//分数
$(document).ready(function(){
	forMobile();
	newgame();
	document.addEventListener("keydown",function(event){
		if(event.keyCode=="37"){
			//定义一个相加函数
			var addscore=leftAdd();
			//定义移动函数
			clearOne();
			leftMove();
			//生成随机数
			generateNumber();			
			updataboardview();
		}else if(event.keyCode=="38"){
			//先把bord转置一下
			bord=change();
			//定义一个相加函数
			var addscore=leftAdd();
			//定义移动函数
			clearOne();
			leftMove();
			//最后转置回来
			bord=change();
				//生成随机数
				generateNumber();			
				updataboardview();	
		}else if(event.keyCode=="39"){
			//定义一个相加函数
			var addscore=rightAdd();
			//定义移动函数
			clearOne();
			rightMove();
				//生成随机数
				generateNumber();
				updataboardview();
		}else if(event.keyCode=="40"){
			//先把bord转置一下
			bord=change();

			//定义一个相加函数
			var addscore=rightAdd();
			//定义移动函数
			clearOne();
			rightMove();
			//最后转置回来
			bord=change();
				//生成随机数
			generateNumber();
			updataboardview();		
		}
		score+=addscore*2;
		$("#score").text(score);
	},false);
	//滑动处理
		var startX, startY;
		document.addEventListener('touchstart', function (ev) {
    		startX = ev.touches[0].pageX;
    		startY = ev.touches[0].pageY;   
		}, false);
		document.addEventListener('touchend', function (ev) {
    		var endX, endY;
    		endX = ev.changedTouches[0].pageX;
    		endY = ev.changedTouches[0].pageY;
    		var direction = GetSlideDirection(startX, startY, endX, endY);
    			switch (direction) {
        		case 0:
        			var addscore=0;
            		break;
        		case 1:
            		//先把bord转置一下
			bord=change();
			//定义一个相加函数
			var addscore=leftAdd();
			//定义移动函数
			clearOne();
			leftMove();
			//最后转置回来
			bord=change();
				//生成随机数
				generateNumber();			
				updataboardview();	
            		break;
        		case 2:
            		//先把bord转置一下
			bord=change();

			//定义一个相加函数
			var addscore=rightAdd();
			//定义移动函数
			clearOne();
			rightMove();
			//最后转置回来
			bord=change();
				//生成随机数
			generateNumber();
			updataboardview();	
            		break;
        		case 3:
            		//定义一个相加函数
					var addscore=leftAdd();
					//定义移动函数
					clearOne();
					leftMove();
					//生成随机数
					generateNumber();			
					updataboardview();
            		break;
        			case 4:
            			//定义一个相加函数
						var addscore=rightAdd();
						//定义移动函数
						clearOne();
						rightMove();
						//生成随机数
						generateNumber();
						updataboardview();
            		break;
        		default:            
    		} 
    		score+=addscore*2;
			$("#score").text(score);  
		}, false);
});
function forMobile(){
	$("#grid-container").css("width",gridContainerWidth-2*cellspace);
	$("#grid-container").css("height",gridContainerWidth-2*cellspace);
	$("#grid-container").css("padding",cellspace);

	$("#grid-container .grid-cell").css("width",cellSideLength);
	$("#grid-container .grid-cell").css("height",cellSideLength);

	
}
function newgame(){
	score=0;
	$("#score").text(score);
	//初始化棋盘格
	init();
	//初始化生成两个随机数
	generateNumber();
	generateNumber();
	updataboardview();
}
function init(){
	for(var i=0;i<4;i++){
		bord[i]=new Array();
		for(var j=0;j<4;j++){
			var gridcell= $("#grid-cell-"+i+"-"+j);
			gridcell.css("top",gettop(i,j));
			gridcell.css("left",getleft(i,j));
			bord[i][j]=0;
		}
	}
	
}
//用户每操作一次，就会调用一下这个
function updataboardview(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumbercell=$("#number-cell-"+i+"-"+j);
			if(bord[i][j]==0){
				theNumbercell.css("width","0px");
				theNumbercell.css("height","0px");
				theNumbercell.css("top",gettop(i,j)+cellSideLength/2);
				theNumbercell.css("left",getleft(i,j)+cellSideLength/2);
			}else{
				theNumbercell.css("width",cellSideLength);
				theNumbercell.css("height",cellSideLength);
				theNumbercell.css("top",gettop(i,j));
				theNumbercell.css("left",getleft(i,j));
				theNumbercell.css("background-color",getNumberBackgroundColor(bord[i][j]));
				theNumbercell.css("color",getNumberColor(bord[i][j]));
				theNumbercell.text(bord[i][j]);
				
			}
		}
	}
	$(".number-cell").css("line-height",cellSideLength+"px");
	$(".number-cell").css("font-size",0.6*cellSideLength+"px");
}
function generateNumber(){
	if(!noSpace(bord)){
		return false;
	}else{
		//生成位置
		var place=generatePlace(bord);
		//生成数字
		var number=generateNewNumber();
		//给bord赋值
		bord[place.x][place.y]=number;
	}
}



