var url3 = 'https://www.qdshengqian.com/fangxinshifu/'
function jiangpin(){
    $.ajax({
        type: 'get',
        url: url3 + 'O_postimage2.php',
        dataType: 'json',
        success:function(data){
            // console.log(data)
            $('.imgg').attr("src",data[0].image)
        }
    })
}
jiangpin()