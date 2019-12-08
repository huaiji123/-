 // 注册--------------------------
 $('#userForm').on('submit', function() {
         //获取到表单的数据并格式化成字符串
         var formData = $(this).serialize()
         $.ajax({
             type: "post",
             url: "/users",
             data: formData,
             success: function() {
                 location.reload()
             },
             error: function() {
                 alert('用户添加失败')
             }
         });
         //阻止表单提交的默认行为，因为我们不想刷新界面
         return false
     })
     //添加头像--------------------------    要事件委托！！！！找准父元素
 $('#huaji').on('change', '#avatar', function() {
     //创建formData对象
     var formData = new FormData();
     //将文件添加到formData对象里面
     formData.append('avatar', this.files[0]);
     //发送ajax请求，传递到服务器
     $.ajax({
         type: "post",
         url: "/upload",
         data: formData,
         contentType: false,
         processData: false,
         success: function(response) {
             console.log(response);
             //给隐藏域设置val属性存放图片路径
             $('#hiddenAvatar').val(response[0].avatar);
             //给img设置src属性为该路径
             $("#preview").prop('src', response[0].avatar)
         }
     });
 });
 //user里面的列表，渲染用户列表-----
 $.ajax({
     type: "get",
     url: "/users",
     success: function(response) {
         console.log(response);
         var html = template('userTpl', {
             data: response
         })
         $("#userBox").html(html)
     }
 });
 //给编辑按钮添加点击事件，因为这是动态生成的，所以要用事件委托
 $("#userBox").on('click', '.edit', function() {
         //它的id在自定义的属性里面，获取用attr方法
         var id = $(this).attr('data-id');
         console.log(id);
         //发送ajax，获取用户信息
         $.ajax({
             type: "PUT",
             url: "/users/" + id,
             success: function(response) {
                 console.log(response);
                 var html = template('modifyTPL', response)
                 $("#huaji").html(html)
             }
         });
     })
     //为修改表单添加提交事件
 $('#huaji').on('submit', '#modifyForm', function() {
         var formData = $(this).serialize();
         var id = $(this).attr('data-id')
         $.ajax({
             type: "PUT",
             url: "/users/" + id,
             data: formData,
             success: function(response) {
                 console.log(response);
                 location.reload()
             }
         });
         return false;
     })
     // ------------------------------2019年12月8日上午-------------------------------------------------------------------------------------------------------------
     // 删除用户的操作。。。。。。。。。。。。。。。。。。
 $('#userBox').on('click', '.delete', function() {
     if (confirm('确定要删除吗')) {
         var id = $(this).attr('data-id')
         console.log(id);
     }
     $.ajax({
         type: "delete",
         url: "/users/" + id,
         success: function(response) {
             location.reload()
         }
     });
 })

 // 获取全选按钮，批量删除，状态改变事件
 // 全选，反选
 var selectAll = $('#selectAll');
 selectAll.on('change', function() {
     //获取当前框的选中状态
     var status = selectAll.prop('checked')
         //这有一个隐藏的删除按钮
     if (status) {
         $('#shanchu').show()
     } else {
         $('#shanchu').hide()
     }
     $('#userBox').find('input').prop('checked', status)

 })

 $('#userBox').on('change', '.checkboxStatus', function() {
     //全部的单选框
     var inputs = $('#userBox').find('input')
         //全部选中的复选框
     var inputsAll = $('#userBox').find('input:checked')
     if (inputsAll.length == inputs.length) {
         selectAll.prop('checked', true)
     } else {

         selectAll.prop('checked', false)
     }
     if (inputsAll.length > 0) {
         $('#shanchu').show()
     } else {
         $('#shanchu').hide()
     }
 })

 //给批量删除按钮注册点击事件
 $('#shanchu').on('click', function() {
     var ids = [];
     //获取选中的input框
     var inputchecked = $('.checkboxStatus:checked');
     //获取id，并添加到数组
     inputchecked.each(function(indexInArray, valueOfElement) {
         ids.push($(valueOfElement).attr('data-id'))
     });
     console.log(ids);

     if (confirm('你确定要批量删除这些内容吗？')) {
         $.ajax({
             type: "delete",
             //join把数组元素变成字符串，逗号连接
             url: "/users/" + ids.join('-'),
             success: function() {
                 location.reload()
             }
         });
     }
 })