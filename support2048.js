documentWidth=window.document.body.offsetWidth;
if(documentWidth>500){
	documentWidth=500;
}
console.log(documentWidth);
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellspace=0.04*documentWidth;
function gettop(i,j){
	return (cellSideLength+cellspace)*i+cellspace;
}
function getleft(i,j){
	return (cellspace+cellSideLength)*j+cellspace;
}
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da"; break;
		case 4:return "#ede0c8"; break;
		case 8:return "#f2b179"; break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72"; break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}
function getNumberColor(number){
	if(number<=4){
		return "#776e65";
	}
	return "white";
}
//判断bord中是不是还有位置用来生成数字
function noSpace(array){
	for(var i=0;i<array.length;i++){
		for(var j=0;j<array[0].length;j++){
			if(array[i][j]==0){
				return true;
			}			
		}
	}
	return false;
}
//用于随机生成一个位置来放生成的随机数
function generatePlace(array){
	var a=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(array[i][j]==0){
				var o={
					x:i,
					y:j
				}
				a.push(o);
			}
		}
	}
	var b=GetRandomNum(0,a.length-1);
	return a[b];
	
}
function GetRandomNum(Min,Max)
{   
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
} 
//生成一个2或4的随机数
function generateNewNumber(){
	var rand=Math.random();
	return rand>0.5?2:4;
}  
function clearOne(){

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(bord[i][j]==1){
				bord[i][j]=0;
			}
		}
	}
	
}
function rightAdd(){
	var addscore=0;
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){			
			var current=bord[i][j];
			if(current!=0){
				var right=bord[i][j+1],
				a=j+1;
				//找到右边第一个非零值或者最右边的零值
				while(right==0){
					if(a==3){
						break;
					}
					a++;
					right=bord[i][a];
				}
				if(current==right){
						addscore++;
						bord[i][a]=right*2;
						bord[i][j]=1;
				}					
			}				
		}
	}
	return addscore;
}
function rightMove(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			var current=bord[i][j];
			if(current!=0){
				var right=bord[i][j+1],
				a=j+1;
				while(right==0){
					if(a==3){
						break;
					}
					a++;
					right=bord[i][a];
				}
				if(right==0&&a==3){
					bord[i][j]=0;
					bord[i][a]=current;
				}else{
					bord[i][j]=0;
					bord[i][a-1]=current;
				}								
			}		
		}
	}
}
function leftAdd(){
	var addscore=0;
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){			
			var current=bord[i][j];
			if(current!=0){
				var left=bord[i][j-1],
				a=j-1;
				//找到左边第一个非零值或者最左边的零值
				while(left==0){
					if(a==0){
						break;
					}
					a--;
					left=bord[i][a];
				}
				if(current==left){
						addscore++;
						bord[i][a]=left*2;
						bord[i][j]=1;
				}					
			}		
		}
	}
	return addscore;
}
function leftMove(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			var current=bord[i][j];
			if(current!=0){
				var left=bord[i][j-1],
				a=j-1;
				while(left==0){
					if(a==0){
						break;
					}
					a--;
					left=bord[i][a];
				}
				if(left==0&&a==0){
					bord[i][j]=0;
					bord[i][a]=current;
				}else{
					bord[i][j]=0;
					bord[i][a+1]=current;
				}								
			}		
		}
	}
}
function change(){
	var returnarray=new Array();
	for(var i=0;i<4;i++){
		returnarray[i]=new Array();		
	}
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			returnarray[j][i]=bord[i][j];
		}
	}
	return returnarray;
}
//返回角度
function GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
}
 
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
 
    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }
 
    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }
 
    return result;
}
