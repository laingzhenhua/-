
var urlconfig = "http://175.24.76.180:8080/mp?inquiry=vxconfig&url="
function urlconfigs() {
    var url6 = encodeURIComponent(location.href.split('#')[0]); //分享的文章地址
    $.ajax({
        type: 'GET',
        url: urlconfig + url6,
        // data:{url:url6},
        dataType: 'json',
        success: function (data) {
            console.log(data)
            // var url = location.href.split('#')[0]; //分享的文章地址
            var appId = data.appId;
            var timestamp = data.Timestamp;
            var nonceStr = data.nonceStr;
            var signature = data.signature;
            console.log(url6, appId, timestamp, nonceStr, signature)
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
var openid = localStorage.getItem('openid');
wx.ready(function () {
    console.log("sueess")
    if (openid == null || openid == undefined || openid == "") {
        wx.updateAppMessageShareData({
  	title: "Fridaysalon 秒杀！！！", // 分享标题
                        desc: "机不可失失不再来，速速抢购吧", // 分享描述
            link: "http://www.fridaysalon.top", // 分享链接,链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://www.fridaysalon.top/image/33.jpg", // 分享图标
            success: function (data) {
                // 用户确认分享后执行的回调函数

                console.log(data)

            },
            cancel: function (data) {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.updateTimelineShareData({
            title: "Fridaysalon 秒杀！！！", // 分享标题
            link: "http://www.fridaysalon.top", // 分享链接,链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://www.fridaysalon.top/image/33.jpg", // 分享图标
            success: function (data) {
                // 用户确认分享后执行的回调函数

                console.log(data)
            },
            cancel: function (data) {
                // 用户取消分享后执行的回调函数

            }
        });
    } else {
        wx.updateAppMessageShareData({
            title: "Fridaysalon 秒杀！！！", // 分享标题
                        desc: "机不可失失不再来，速速抢购吧", // 分享描述
            link: "http://www.fridaysalon.top?openid=" + openid, // 分享链接,链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://www.fridaysalon.top/image/33.jpg", // 分享图标
            success: function (data) {
                // 用户确认分享后执行的回调函数

                console.log(data)

            },
            cancel: function (data) {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.updateTimelineShareData({
              title: "Fridaysalon 秒杀！！！", // 分享标题
            link: "http://www.fridaysalon.top?openid=" + openid, // 分享链接,链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "http://www.fridaysalon.top/image/33.jpg", // 分享图标
            success: function (data) {
                // 用户确认分享后执行的回调函数

                console.log(data)
            },
            cancel: function (data) {
                // 用户取消分享后执行的回调函数

            }
        });
    }

})
//时间轴

var d = new Date();
var date = String((d.getFullYear()))  + (d.getMonth() + 1) + (d.getDate()) + (d.getHours())  + (d.getMinutes())  + (d.getSeconds());
console.log(date)
//微信支付
var bodyname  = "199元秒杀套餐";
//var total_fee =  Number($("#totel").text()+"00");
$("#pay").click(function () {
    var data = {
        "body": bodyname,
        "out_trade_no": date,
        "total_fee": 10,
        "spbill_create_ip": ip,
        "notify_url": "http://www.fridaysalon.top/mch/notify",
        "trade_type": "JSAPI",
        "openid": openid
    }
    console.log(data);
    if (openid == null || openid == undefined || openid == "") {

        window.location.href="canyu.html"  
    }else{
        $.ajax({
            url: "http://175.24.76.180:8080/mch",
            data: JSON.stringify(data),
            type: "POST",
            dataType: "json", 
            success: function (data) {
                $.ajax({
                    url: "http://175.24.76.180:8080/mch/sign",
                    data: { "prepayid": data.PrepayId },
                    type: "POST",
                    dataType: "json",
                    success: function (msg) {
                        console.log(msg)
                        function onBridgeReady() {
                            //var nonceStr =randomWord(true, 10, 32);
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                "appId": msg.appId,     //公众号名称，由商户传入     
                                "timeStamp": msg.Timestamp,         //时间戳，自1970年以来的秒数     
                                "nonceStr": msg.nonceStr, //随机串     
                                "package": msg.package,
                                "signType": msg.SignType,         //微信签名方式：     
                                "paySign": msg.paySign //微信签名 
                            },
                                function (res) {
                                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                                        // 使用以上方式判断前端返回,微信团队郑重提示：
                                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                        alert("支付成功")
                                    }
                                });
                        }
                        if (typeof WeixinJSBridge == "undefined") {
                            if (document.addEventListener) {
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            } else if (document.attachEvent) {
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        } else {
                            onBridgeReady();
                        };
                    }, error: function (err) {
                        console.log(err);
                    }
                })
            }, error: function (err) {
                console.log(err);
                alert(err)
            }
        })
         localStorage.setItem("OutTradeNo",date);

    }
  
    // create ADO-stream Objec
})
