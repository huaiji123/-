$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        console.log(response);
        var html = template('fenleiTpl', {
            data: response
        })
        console.log(html);
        $('#category').html(html)
    }
});


// 添加封面图片
$("#feature").on('change', function() {
    var formaDate = new FormData();
    //这个呢， 可以将图片以二进制渲染，由于返回值是数组形式，必须，像下面这么写
    formaDate.append('cover', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formaDate,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            $("#thumbnail").val(response[0].cover)
            $('#cnm').prop('src', response[0].cover)
            $('#cnm').prop("style", '')
        }
    });
})


//添加文章
$('#addForm').on('submit', function() {
    var formaDate = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/posts",
        data: formaDate,
        success: function(response) {

            location.href = '/admin/posts.html'
        }
    });
    return false;
})