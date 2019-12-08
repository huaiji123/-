//修改密码
$('#mimaTpl').on('submit', function() {
    //提交表单都要有的
    var formData = $(this).serialize();

    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function() {
            location.href = '/admin/login.html'
        }
    });
    return false
})