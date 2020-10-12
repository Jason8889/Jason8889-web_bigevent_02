$(function () {
    var layer = layui.layer

    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码不一致"
            }
        }

    })

    // 注册功能开发
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功请登录")
                $("#link_login").click()
                // 重置form表单
                $("#form_reg")[0].reset()
            }
        })
    })

    // 登录功能给（form标签绑定事件，button按钮触发提交事件
    $("#form_login").submit(
        function (e) {
            e.preventDefault()

            $.ajax({
                method: "POST",
                url: "/api/login",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("恭喜登陆成功")
                    localStorage.setItem("token", res.token)
                    location.href = '/index.html'
                }
            })
        })



})