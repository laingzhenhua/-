//获得轮播图

var url3 = 'http://175.24.76.180:8080/score'
var quanjuid = ''
var url ="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb99655f636e1dd8b&secret=adf9b2972fbb2c71073e7bbe780a59fb"
var urlconfig = "http://175.24.76.180:8080/mp?inquiry=vxconfig&url="
var urlaccess_token ="http://175.24.76.180:8080/mp?inquiry=access_token"
var openid ;
var qrcode;
function huode() {
    // //console.log("123")
    $.ajax({
        type: 'GET',
        url: "" ,
        // data:{name:"ddd",score:"222"},
        dataType: 'json',
        success: function (data) {
            ////console.log(data)
         
        }
    })
}
huode()
function randomWord(randomFlag, min, max){
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if(randomFlag){
    range = Math.round(Math.random() * (max-min)) + min;
  }
  for(var i=0; i<range; i++){
    pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos];
  }
  return str;
}

function urlconfigs() {
  
    var url6 = encodeURIComponent(location.href.split('#')[0]) ; //分享的文章地址
    
    $.ajax({
        type: 'GET',
        url: urlconfig+url6,
        // data:{url:url6},
        dataType: 'json',
        success: function (data) {
            ////console.log(data)
            // var url = location.href.split('#')[0]; //分享的文章地址
            var appId = data.appId;
            var timestamp = data.Timestamp;
            var nonceStr = data.nonceStr;
            var signature = data.signature;
            //console.log(url6, appId, timestamp, nonceStr, signature)
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名，见附录1
                        jsApiList: [
				"updateAppMessageShareData",//分享到微博
				"updateTimelineShareData",//分享到facebook
				"onMenuShareTimeline",//分享到朋友
				"onMenuShareAppMessage",//分享到朋友圈
				"onMenuShareQQ",//分享到qq
				"onMenuShareWeibo",//分享到微博
				"onMenuShareQZone",//分享到空间
                
            ]
            })

        }
    })
}
urlconfigs()
 
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}
function mes() {
    ////console.log("location.href")
    var s = location.href
    var code = GetQueryString("code");
    var state = GetQueryString("state");
    var openids =GetQueryString("openid")
    if (code == null || code == undefined || code == "") {
        //步骤1：第一次进入本页面，先获取微信的授权code，然后再跳转会本页面，这时候微信会自动加上code参数
        ////console.log("111")
        var REDIRECT_URI = encodeURIComponent(location.href);
        //console.log(REDIRECT_URI)
        var url2 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a4e25d303f27349&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_userinfo&state=" + state + "&connect_redirect=1#wechat_redirect";
        location.href = url2;
        // window.location.href = location.href;
    } else {
        ////console.log(code)
        //步骤1会重新返回到本页面，并携带code参数，然后进入步骤2：服务器端获取openid
        
    $.ajax({
            type: "POST",
            url: "http://175.24.76.180:8080/mp?inquiry=exchange_token&code=",
            data: { code: code },
            dataType: 'json',
            success: function (msg) {
                    ////console.log(msg);
	         openid=msg.openid;
                   msgg = msg.nickname;
                   headimgurl=msg.headimgurl;
                 localStorage.setItem('msg_name', msgg) ;
                 localStorage.setItem('headimgurl', headimgurl) ;
           localStorage.setItem('openid', openid) ;
             qrcode = new QRCode("qrcode", {
                text: "http://www.fridaysalon.top?openid="+openid,
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
wx.ready(function () {
//console.log(openid)
              wx.updateAppMessageShareData({
                        title: "Fridaysalon 秒杀！！！", // 分享标题
                        desc: "机不可失失不再来，速速抢购吧", // 分享描述
                        link:"http://www.fridaysalon.top?openid="+openid, // 分享链接,链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: "http://www.fridaysalon.top/image/index9.jpg", // 分享图标
                        success: function (data) {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function (data) {
                        // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.updateTimelineShareData({
                        title: "Fridaysalon 秒杀！！！", // 分享标题
                        link: "http://www.fridaysalon.top?openid="+openid, // 分享链接,链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: "http://www.fridaysalon.top/image/index9.jpg", // 分享图标
                        success: function (data) {
                            // 用户确认分享后执行的回调函数
                            //console.log(data)
                        },
                        cancel: function (data) {
                        // 用户取消分享后执行的回调函数
                        }
                    });
                    })
            $(".tuiguang").click(function(){
                window.location.href="tuiguang.html"
            });
            if(openids==null || openids == undefined || openids == ""){
                //console.log({name:" ",new:openid})
                        $.ajax({
                            type:"POST",
                            url:"http://175.24.76.180:8080/user",
                            data:{name:" ",new:openid},
                            dataType:"json",
                            success:function(data){
                                //console.log(data)
                            }
                        })
                    }
                    else{
                        $.ajax({
                            type:"POST",
                            url:"http://175.24.76.180:8080/user",
                            data:{name:openids,newname:openid},
                            dataType:"json",
                            success:function(data){
                                //console.log(data)
                            }
                        })
            
                    }
            },error:function(err){
                //console.log(err)
            }
        });
        openid =localStorage.getItem('openid')
    
      
    }

}
mes()

setTimeout(function(){
    var mss =  localStorage.getItem('msg_name')
    //console.log(mss)
    var headimgurl =localStorage.getItem("headimgurl")
    //console.log(headimgurl)
    function add(){
        var parent = document.getElementById("touxiang");
　　　　//添加 div
　　　　var img = document.createElement("img");
        img.src=String(headimgurl) 
        $(img).css({"width":"20vw","height":"20vw","border-radius":"50%"})
        parent.append(img)
        var nameparent =document.getElementById("name");
        nameparent.innerHTML=mss;
    }
add()
$.ajax({
     url:"http://www.fridaysalon.top:8080/user?user="+openid,
     type:"GET",
  dataType:"json",        
success:function(data){
console.log(data)
},error:function(err){
console.log(err)
}
})
},300)
console.log("http://www.fridaysalon.top:8080/user?user="+openid)


//   $.ajax({
//                 type:"POST",
//                 url:"http://www.fridaysalon.top/mp",
//                 data:{sceneId:132535,expireSeconds:3535},
//                 dataType:"json",
//                 success:function(data){
//                     ticket =encodeURIComponent(data.ticket) ;
//                     //console.log(ticket);
                    
                 
                   
//                 }
//             })  

      $('#onMenuShareAppMessage').click ( function () {
	$("#qrcode").css({"display":"block"})
  });

  $("#pay").click(function(){
var data ={
 "body": "wx5555347" ,
"out_trade_no":"m2134558",
"total_fee":10,
"spbill_create_ip":ip,
"notify_url":"http://www.fridaysalon.top/mch/notify",
"trade_type":"JSAPI",
"openid":openid
}
//console.log(data)
$.ajax({
     url:"http://175.24.76.180:8080/mch",
     data:JSON.stringify(data),
     type:"POST",
  dataType:"json",
             
success:function(data){
//console.log(data);
alert(data.PrepayId);
$.ajax({
     url:"http://175.24.76.180:8080/mch/sign",
     data:{"prepayid":data.PrepayId},
     type:"POST",
  dataType:"json",        
success:function(msg){
//console.log(msg)
function onBridgeReady(){
//var nonceStr =randomWord(true, 10, 32);
   WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
         "appId":msg.appId,     //公众号名称，由商户传入     
         "timeStamp":msg.Timestamp,         //时间戳，自1970年以来的秒数     
         "nonceStr":msg.nonceStr, //随机串     
         "package":msg.package,     
         "signType":msg.SignType,         //微信签名方式：     
         "paySign":msg.paySign //微信签名 
      },
      function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok" ){
      // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
	alert("支付成功")
      } 
   }); 
}
if (typeof WeixinJSBridge == "undefined"){
   if( document.addEventListener ){
       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
   }else if (document.attachEvent){
       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
   }
}else{
   onBridgeReady();
};
},error:function(err){
//console.log(err);
}
})
},error:function(err){
//console.log(err);
alert(err)
}
})
  // create ADO-stream Objec
  })
var OutTradeNo =  localStorage.getItem('OutTradeNo')
$.ajax({
     url:'http://175.24.76.180:8080/mch/oderQuery?transaction="transaction id"&tradeno='+OutTradeNo,
     type:"GET",
  dataType:"json",        
success:function(data){
console.log(data)
},error:function(err){
console.log(err)
}
})
// var loc = location.href;
// var n1 = loc.length;
// var n2 = loc.indexOf('=');
// var code = decodeURI(loc.substr(n2 + 1, 32));
// var box = document.getElementById('box');
// box.innerHTML = 
// //console.log(location.href.substr(n2 + 1, 13))
// var txt = location.href.substr(n2 + 1, 13)
// var code = location.href.substr(71, 32)
// //console.log(code)

// //console.log(loc, txt)