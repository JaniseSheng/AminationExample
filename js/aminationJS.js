/**
 * Created by wester on 15-6-29.
 */
$(document).ready(function(){
    Enevt.loadPic(); //加载图片
    Enevt.picAutoRoll();
    Enevt.picManualRoll();

    //ajax加载图片
    Enevt.ajaxaddpic();
});

var Enevt = (function(){
    var autoPlay ;
    var leftWidth =0;
    var frameWidth ;//设置图片每次滚动的宽度
    var ulPic_width ;

    loadPic = function(){
        picArry=$("#picAutoRoll li").toArray();
        console.log(picArry);
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


    //ajax jason加载图片

    ajaxaddpic = function(){
        var num =queryData.length;
        for(var i=0;i<num;i++){
            $('#ajaxgitpic>ul>li:eq('+i+')>img').attr('src','images/'+(i+1)+'.jpg');
        }

    }
    return{
        loadPic:loadPic,//初始加载图片
        PlayPic:PlayPic,
        picAutoRoll:picAutoRoll,   //自动播放
        picManualRoll:picManualRoll,   //手动播放
        ajaxaddpic:ajaxaddpic
    }
})();



var queryData = {};
//异步请求数据
queryData.ajax = function() {
    $.ajax({
        url: 'jason/imgInfo.json',
        type: 'post',
        dataType: 'json',
        success: function(data) {
            $('#ajaxgitpic>ul>li:eq(1)>p').html(data.imgname[0].pagetext);
            console.log(data);
        },
        complate: function(data) {
            console.log(data);
        },
        error: function(e) {
            console.log(e);
        }
    });
};

