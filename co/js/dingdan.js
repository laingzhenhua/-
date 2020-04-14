
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
var openid = sessionStorage.getItem('openid');
wx.ready(function () {
    console.log("sueess")
    if (openid == null || openid == undefined || openid == "") {
        wx.updateAppMessageShareData({
            title: "66633", // 分享标题
            desc: "测试测试", // 分享描述
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
            title: "6552", // 分享标题
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
            title: "首页测试", // 分享标题
            desc: "测试测试", // 分享描述
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
            title: "首页测试", // 分享标题
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

