$(function () {
    //点击事件获取  登录按钮
    $("#loginBtn").on('tap', function () {
        //获取表单数据
        var result = $('#formArr').serializeToJson();
        //如果用户名为空 提醒错误  跳出

        //用户输入合法  调用接口  实现登录验证
        // axios.post('/user/login',{
        //     username:result.username,
        //     password:result.password
        // })
        //与上面的代码一致  post可以直接传递对象
        //验证表单函数
        validateForm(result)
            //发送请求函数
            .then(loginAjax)
            //处理登录信息函数
            .then(readerLogin)
            //错误反馈函数
            .catch(errorHandle)



    });

})
//验证表单
function validateForm(result) {
    //返回一个Promise用于then
    return new Promise(function (resolve, reject) {
        //去空格判断用户名是否为空
        if (!$.trim(result.username)) {
            //阻止代码向下继续运行
            reject('请填写用户名');

        }
        //如果用户没有写密码 或者密码长度小于6位  不符合规则 
        if (!$.trim(result.password) || result.password.length < 6) {
            //给出提示 并阻止向下运行
            reject('密码不正确');


        }
        //验证成功 将数据传给下一个then继续执行
        resolve(result);
    });
}
//发送登录请求
function loginAjax(result) {
    //返回ajax请求  使用axios
    return axios.post('/user/login', result);
}
//处理登录发送的数据
function readerLogin(data) {
    //返回promise
    return new Promise(function (resolve, reject) {
        //data包含两个属性，输出可以看到 ，为success或者 message
        if (data.success) {
            //提醒框插件
            mui.toast('登录成功');
            //2s跳转
            setTimeout(function () {
                location.href = 'user.html';
            }, 2000)

        } else {
            //失败并阻止向下运行
            reject(data.message)
        }
        //成功
        resolve();
    });
}
//失败的反馈函数

