// 添加分类
$("#addCategory").on('submit', function() {
        var formData = $(this).serialize()
        $.ajax({
            type: "post",
            url: "/categories",
            data: formData,
            success: function(response) {
                location.reload()
            }
        });
        return false
    })
    // 查询展示分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // console.log(response);
        var html = template('wowoTpl', {
            data: response
        })
        $('#categroyBox').html(html)
    }
});
//添加编辑功能   利用事件委托的原理给其父亲添加事件
$("#categroyBox").on('click', '.edit', function() {

    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response) {
            // console.log(response);
            var html = template('zouceTpl', response)
            $("#formBox").html(html)
        }
    });
})


//编辑过后的提交功能。。。。。。。
$("#formBox").on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    //attr是读取自定义属性   ，  prop是读取官方属性 ， 并可以设置。
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function(response) {
            console.log(response);
            location.reload()
        }
    });

})

// 利用事件委托的原理进行删除 ,不可以乱删，删了相对那个文章也就没有了
$("#categroyBox").on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    if (confirm('你真的要删除吗')) {
        $.ajax({
            type: "DELETE",
            url: "/categories/" + id,
            success: function(response) {
                location.reload()
            }
        });
    }
})