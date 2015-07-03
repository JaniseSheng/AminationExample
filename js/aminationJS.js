/**
 * Created by wester on 15-6-29.
 */
$(document).ready(function(){
    Enevt.loadPic(); //加载图片
    Enevt.picAutoRoll();
    Enevt.picManualRoll();
});

var Enevt = (function(){
    var autoPlay ;
    var leftWidth =0;
    var frameWidth ;//设置图片每次滚动的宽度
    var ulPic_width ;

    loadPic = function(){
        picArry=$("#picAutoRoll li").toArray();
        frameWidth = $("#picAutoRoll div").width();//设置图片每次滚动的宽度
        $.each(picArry, function (i){
            $("#picAutoRoll li").eq(i).css({
                "background-image":"url('images/"+(i+1)+".jpg')",
                "left":""+(frameWidth*i)+"px"
            })
        });

        ulPic_width  =  $("#picAutoRoll li:last-of-type").css('left').replace("px",""); //获取当前最后一张图片的lefe值
        console.log(frameWidth);
    }

    //照片自动滚动
    picAutoRoll = function (){
        autoPlay = setInterval('PlayPic("left")',2000);
    }

    //照片手动滚动
    picManualRoll = function (){
        //先获取最后一张图片的left值
        $("#picAutoRoll .buttonRight,#picAutoRoll .buttonLeft").hover(function(){
            clearInterval(autoPlay);
        },function(){
            picAutoRoll();
        });

       $("#picAutoRoll .buttonRight").click(function(){
            PlayPic("right");
        });
        $("#picAutoRoll .buttonLeft").click(function(){
            PlayPic("left");
        });
    }

    //自动滚动
     PlayPic= function (leftState){
        if(leftState=="left"){
            leftWidth-=frameWidth;
            if(leftWidth<-ulPic_width)leftWidth=0;
        }
        if(leftState=="right"){
            leftWidth+=frameWidth;
            if(leftWidth>0)leftWidth=-ulPic_width;
        }
        $("#picAutoRoll ul").css("left",""+leftWidth+"px");
        console.log(leftWidth);
    }

    return{
        loadPic:loadPic,//初始加载图片
        PlayPic:PlayPic,
        picAutoRoll:picAutoRoll,   //自动播放
        picManualRoll:picManualRoll   //手动播放
    }
})();

