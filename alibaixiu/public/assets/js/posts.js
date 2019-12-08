//渲染出列表并加载出页码
$.ajax({
    type: "get",
    url: "/posts",
    success: function(response) {
        var html = template('postsTpl', response)
        $('#biaoge').html(html)
        var page = template('pageTpl', response)
        $('#page').html(page)
    }
});
//页码处理函数
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function(response) {
            var html = template('postsTpl', response)
            $('#biaoge').html(html)
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    });
}

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//索要分类数据

$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        console.log(response);
        var html = template('xialaTpl', {
            data: response
        })
        $('#huaji').html(html)
    }
});


// 筛选  并重新渲染界面
$("#fileForm").on('submit', function() {
    //as we all know 这是提交表单的必备
    var formData = $(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function(response) {
            var html = template('postsTpl', response)
            $('#biaoge').html(html)
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    });
    return false
})











// 根据id删除文章
$("#biaoge").on('click', '.delete', function() {
    var id = $(this).attr('data-id')
    if (confirm('你真的真的要删除吗')) {
        $.ajax({
            type: "DELETE",
            url: "/posts/" + id,
            success: function(response) {
                location.reload()
            }
        });
    }
})