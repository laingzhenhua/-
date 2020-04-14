var url3 = 'https://www.qdshengqian.com/toupiao/'
var diyi = ''
var dier = ''
var disan = ''
// 获得123名次图
function mct() {
    $.ajax({
        url: url3 + '123.php',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            // console.log(data)
            diyi: data[0].image
            dier: data[1].image
            disan: data[2].image
        }
    })
}
mct()
// 获得轮播图渲染
function huode() {
    $.ajax({
        type: 'get',
        url: url3 + 'post.php',
        dataType: 'json',
        success: function (data) {
            // console.log(data[0])
            var diyiming =data[0].image
            $.ajax({
                type: 'get',
                url: url3 + '45.php',
                dataType: 'json',
                success: function (data) {
                    // console.log(data)
                    var s= data
                    s.push({"image":diyiming})
                    var data =s
                    for (var o = 0; o < data.length; ++o) {
                        $('.swiper-wrapper').append('<div class="swiper-slide" data-swiper-autoplay="2000"><img src="" class="image3"></img></div>')
                        $('.image3').attr("class", 'img' + o)
                        $('.' + 'img' + o).attr("src", data[o].image)
                        $('.' + 'img' + o).css({
                            "width": "100vw",
                            "height": "50vw",
                            // "margin": "10vw auto"
                        })
                    }
                    var mySwiper = new Swiper('.swiper-container', {
                        effect : 'cube',
                        cube: {
                          slideShadows: true,
                          shadow: true,
                          shadowOffset: 20,
                          shadowScale: 0
                        },
                        
                        centeredSlides: true,
                        autoplay: 4000,
                        loop:true,
                        zoom : true,
                        speed:1000
                        // 如果需要分页器
                        // pagination: '.swiper-pagination',

                        // 如果需要前进后退按钮
                        // nextButton: '.swiper-button-next',
                        // prevButton: '.swiper-button-prev',

                        // 如果需要滚动条
                        // scrollbar: '.swiper-scrollbar',

                    })
                }
            })
        }
    })

        }
huode()
// 获得投票名次渲染
function mingci(){
            $.ajax({
                type: 'get',
                url: url3 + 'post.php',
                dataType: 'json',
                success: function (data) {
                    // console.log(data)

                    for (var o = 0; o < 1; ++o) {
                        $('.diyi').append('<div class="div1" ><div><img src="" class="image3"></img></div><div><img class="div3"></img><div class="div2"></div><div class="div4"></div><div class="div5"></div></div></div>')
                        $('.image3').attr("class", 'img1' + o)
                        $('.' + 'img1' + o).attr("src", data[o].image)
                        $('.' + 'img1' + o).css({
                            "width": "45vw",
                            "height": "45vw",
                            // "margin":"10vw auto"
                        })
                        $('.div2').attr("class", 'div' + data[o].yonghuid)
                        $('.' + 'div' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div' + data[o].yonghuid).html(function (i, old) {
                            return '公司:' + data[o].biaoti
                        })
                        $('.div3').attr("class", 'div3' + data[o].yonghuid)
                        $('.' + 'div3' + data[o].yonghuid).css({
                            "width": '15vw',
                            "height": '15vw',
                            "margin": '2vw 15vw 0 15vw'
                        })
                        $('.' + 'div3' + data[o].yonghuid).attr("src", 'image/diyi.png')
                        $('.div4').attr("class", 'div4' + data[o].yonghuid)
                        $('.' + 'div4' + data[o].yonghuid).css({
                            "width": '45vw',
                            "overflow": "hidden",
                            "text-overflow": "ellipsis",
                            "white-space": "nowrap",
                        })
                        $('.' + 'div4' + data[o].yonghuid).html(function (i, old) {
                            return '地址:' + data[o].dizhi
                        })
                        $('.div5').attr("class", 'div5' + data[o].yonghuid)
                        $('.' + 'div5' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div5' + data[o].yonghuid).html(function (i, old) {
                            return '票数:' + data[o].piaoshu + '票'
                        })
                    }
                    for (var o = 1; o < 3; ++o) {
                        $('.diyi').append('<div class="div1" ><div><img src="" class="image3"></img></div><div><img class="div3"></img><div class="div2"></div><div class="div4"></div><div class="div5"></div></div></div>')
                        $('.image3').attr("class", 'img1' + o)
                        $('.' + 'img1' + o).attr("src", data[o].image)
                        $('.' + 'img1' + o).css({
                            "width": "45vw",
                            "height": "45vw",
                            // "margin":"10vw auto"
                        })
                        $('.div2').attr("class", 'div' + data[o].yonghuid)
                        $('.' + 'div' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div' + data[o].yonghuid).html(function (i, old) {
                            return '公司:' + data[o].biaoti
                        })
                        $('.div3').attr("class", 'div3' + data[o].yonghuid)
                        $('.' + 'div3' + data[o].yonghuid).css({
                            "width": '15vw',
                            "height": '15vw',
                            "margin": '2vw 15vw 0 15vw'
                        })
                        $('.' + 'div3' + data[o].yonghuid).attr("src", 'image/dier.png')
                        $('.div4').attr("class", 'div4' + data[o].yonghuid)
                        $('.' + 'div4' + data[o].yonghuid).css({
                            "width": '45vw',
                            "overflow": "hidden",
                            "text-overflow": "ellipsis",
                            "white-space": "nowrap",
                        })
                        $('.' + 'div4' + data[o].yonghuid).html(function (i, old) {
                            return '地址:' + data[o].dizhi
                        })
                        $('.div5').attr("class", 'div5' + data[o].yonghuid)
                        $('.' + 'div5' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div5' + data[o].yonghuid).html(function (i, old) {
                            return '票数:' + data[o].piaoshu + '票'
                        })
                    }
                    for (var o = 3; o < 6; ++o) {
                        $('.diyi').append('<div class="div1" ><div><img src="" class="image3"></img></div><div><img class="div3"></img><div class="div2"></div><div class="div4"></div><div class="div5"></div></div></div>')
                        $('.image3').attr("class", 'img1' + o)
                        $('.' + 'img1' + o).attr("src", data[o].image)
                        $('.' + 'img1' + o).css({
                            "width": "45vw",
                            "height": "45vw",
                            // "margin":"10vw auto"
                        })
                        $('.div2').attr("class", 'div' + data[o].yonghuid)
                        $('.' + 'div' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div' + data[o].yonghuid).html(function (i, old) {
                            return '公司:' + data[o].biaoti
                        })
                        $('.div3').attr("class", 'div3' + data[o].yonghuid)
                        $('.' + 'div3' + data[o].yonghuid).css({
                            "width": '15vw',
                            "height": '15vw',
                            "margin": '2vw 15vw 0 15vw'
                        })
                        $('.' + 'div3' + data[o].yonghuid).attr("src", 'image/disan.png')
                        $('.div4').attr("class", 'div4' + data[o].yonghuid)
                        $('.' + 'div4' + data[o].yonghuid).css({
                            "width": '45vw',
                            "overflow": "hidden",
                            "text-overflow": "ellipsis",
                            "white-space": "nowrap",
                        })
                        $('.' + 'div4' + data[o].yonghuid).html(function (i, old) {
                            return '地址:' + data[o].dizhi
                        })
                        $('.div5').attr("class", 'div5' + data[o].yonghuid)
                        $('.' + 'div5' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div5' + data[o].yonghuid).html(function (i, old) {
                            return '票数:' + data[o].piaoshu + '票'
                        })
                    }
                    for (var o = 6; o < data.length; ++o) {
                        $('.s').append('<div class="div1" ><div><img src="" class="image3"></img></div><div class="div33"><div class="div3"></div><div class="div2"></div><div class="div4"></div><div class="div5"></div></div></div>')
                        $('.image3').attr("class", 'img1' + o)
                        $('.' + 'img1' + o).attr("src", data[o].image)
                        $('.' + 'img1' + o).css({
                            "width": "45vw",
                            "height": "45vw",
                            // "margin":"10vw auto"
                        })
                        $('.div2').attr("class", 'div' + data[o].yonghuid)
                        $('.' + 'div' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div' + data[o].yonghuid).html(function (i, old) {
                            return '公司:' + data[o].biaoti
                        })
                        $('.div3').attr("class", 'div3' + data[o].yonghuid)
                        $('.' + 'div3' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div3' + data[o].yonghuid).html(function (i, old) {
                            var p = o - 2
                            return '第' + p + '名'
                        })
                        $('.div4').attr("class", 'div4' + data[o].yonghuid)
                        $('.' + 'div4' + data[o].yonghuid).css({
                            "width": '45vw',
                            "overflow": "hidden",
                            "text-overflow": "ellipsis",
                            "white-space": "nowrap",
                        })
                        $('.' + 'div4' + data[o].yonghuid).html(function (i, old) {
                            return '地址:' + data[o].dizhi
                        })
                        $('.div5').attr("class", 'div5' + data[o].yonghuid)
                        $('.' + 'div5' + data[o].yonghuid).css({
                            "width": '45vw'
                        })
                        $('.' + 'div5' + data[o].yonghuid).html(function (i, old) {
                            return '票数:' + data[o].piaoshu + '票'
                        })
                    }
                }
            })
        }
mingci()
