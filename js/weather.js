// 获取一级城市
var data;
$.ajax({
	url:"http://api.jisuapi.com/weather/city?appkey=15e96f1be5d2eb27",
	dataType:"jsonp",
	success:function(val){
		data = val.result;
		var province = $.grep(data,function(val,index){
			return val.parentid == 0;
		})
		// console.log(province);
		$.each($(".province li"),function(index,val){
			$(val).html(province[index].city);
			$(val).attr("provinceid",province[index].cityid);
		})	
	}
});

// 获取二级地区
$(".province li").each(function(index,ele) {
	$(ele).click(function(){
		$(".province li").removeClass("select");
		$(".area").html("");

		$(ele).addClass("select");
		var city = $.grep(data,function(val,index){
			return val.parentid == $(ele).attr("provinceid");
		})
		$.each(city,function(index,val){
			var li = $("<li></li>");
			li.html(val.city);
			$(".area").append(li);
		})
	})
})

$(".area").on("click","li",function(){
	getFullWeather($(this).html());
})

$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js ",function(){getFullWeather(remote_ip_info.city)
});

var weatherObj;
function getFullWeather(city) {
	$(".now-city").html(city)
	$.ajax({
		url:"http://api.jisuapi.com/weather/query?appkey=15e96f1be5d2eb27&city=" + city,
		dataType:"jsonp",
		success:function(val){
			weatherObj = val.result;
			$(".now-sate span").html(weatherObj.temp+"°");
			$(".now-sate .weather").html(weatherObj.weather);
			$(".now-sate .tmps").html(weatherObj.temphigh+"° ~ "+weatherObj.templow+"°");
			$(".now-sate img").attr("src","img/"+weatherObj.img+".png")

			 //未来几小时
            $(".hourly ul li").each(function (index, ele) {
                $(ele).find("time").html(weatherObj.hourly[index].time);
                $(ele).find("img").attr("src", "img/" + weatherObj.hourly[index].img + ".png");
                $(ele).find("p").html(weatherObj.hourly[index].temp + "°");
            });

            //未来几天
             $(".week li").each(function (index, ele) {
                $(ele).find("time").html(weatherObj.daily[index + 1].date + "&nbsp;" + weatherObj.daily[index + 1].week);
                $(ele).find("img").attr("src", "img/" + weatherObj.daily[index + 1].day.img + ".png");
                $(ele).find("p").html(weatherObj.daily[index + 1].day.temphigh + "°/" + weatherObj.daily[index + 1].night.templow + "°")
            });
		}
	})
}

