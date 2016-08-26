function toRed() {
	$('.box').css('border-left', '1px solid #E71D36');
	$('.box').css('border-bottom', '1px solid #E71D36');
	$('#input1').attr('placeholder', 'RGB');
	$('#input2').attr('placeholder', 'HEX');
}

function toGreen() {
	$('.box').css('border-left', '1px solid #2EC4B6');
	$('.box').css('border-bottom', '1px solid #2EC4B6');
	$('#input1').attr('placeholder', 'HEX');
	$('#input2').attr('placeholder', 'RGB');
}

//十六进制颜色值域RGB格式颜色值之间的相互转换  
  
//-------------------------------------  
//十六进制颜色值的正则表达式  
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;  
/*RGB颜色转换为16进制*/  
String.prototype.colorHex = function(){
	var that = this;
	if(/^(rgb|RGB)/.test(that)){
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
		var strHex = "#";
		for(var i=0; i<aColor.length; i++){
			var hex = Number(aColor[i]).toString(16);
			if(hex === "0"){
				hex += hex;	
			}
			strHex += hex;
		}
		if(strHex.length !== 7){
			strHex = that;	
		}
		return strHex;
	}else if(reg.test(that)){
		var aNum = that.replace(/#/,"").split("");
		if(aNum.length === 6){
			return that;	
		}else if(aNum.length === 3){
			var numHex = "#";
			for(var i=0; i<aNum.length; i+=1){
				numHex += (aNum[i]+aNum[i]);
			}
			return numHex;
		}
	}else{
		return that;	
	}
}; 
  
//-------------------------------------------------  
  
/*16进制颜色转为RGB格式*/  
String.prototype.colorRgb = function(){  
    var sColor = this.toLowerCase();  
    if(sColor && reg.test(sColor)){  
        if(sColor.length === 4){  
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1){  
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }  
        //处理六位的颜色值  
        var sColorChange = [];  
        for(var i=1; i<7; i+=2){  
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        }  
        return "rgb(" + sColorChange.join(",") + ")";  
    }else{  
        return sColor;    
    }  
};  

var color = '';

$('.btn1').click(function() {
	toRed();
	color = 'red';
	console.log(color);
});

$('.btn2').click(function() {
	toGreen();
	color = 'green';
	console.log(color);
});

$('.btn').children('button').click(function() {
	if(color == 'red'){
		var num = $('#input1').val();
		$('#input2').val(num.colorHex());
	}else if(color == ''){
		var num = $('#input1').val();
		$('#input2').val(num.colorHex());
	}else if(color == 'green'){
		var num = $('#input1').val();
		$('#input2').val(num.colorRgb());
	}else{
		var num = $('#input1').val();
		alert('請輸入正確的值！');
	}
	
	$('.bgc').css('background-color',num);
});

