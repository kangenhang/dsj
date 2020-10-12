$(function(){
    getUserInfo()
    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
      // 提示用户是否确认退出
      layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
  
        // 关闭 confirm 询问框
        layer.close(index)
      })
    })
   });

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
       
        success : function(res){
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
              }
        randerAvatar(res.data)
          },

        // 不论成功还是失败，最终都会调用 complete 回调函数

    })
}
//渲染  
function randerAvatar(user) {
   var name = user.nickname || user.username
   $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
   if(user.user_pic !==null) {
     $(".layui-nav-img").attr('scr',user.user_pic).show()
     $(".text-avatar").hide()
   }else {
    $(".layui-nav-img").hide()
    var one = name[0].toUpperCase()
    $(".text-avatar").html(one).show()
   }
}
