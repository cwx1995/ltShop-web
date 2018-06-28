$(function(){
$('#checkcode').on('tap',function(){
    vaMobile()
    .then(getCode)
    .then(printCode)
    .catch(errorHandle)
})

$('#zsCode').on('tap',function(){
    YZform()
    .then(zcRequset)
    .then(zcRequsetEnd)
    .catch(errorHandle)
})
});

function vaMobile(){
    return new Promise(function(resolve,reject){
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        var result = $('#formList').serializeToJson();
        if(!reg.test(result.mobile)){
            reject('请输入正确的手机号');
        }
        resolve();
    });
}
function getCode(){
    return axios.get('/user/vCode');
}
function printCode(data){
console.log(data);
}
function YZform(){
    return new Promise(function(resolve,reject){
        var result= $('#formList').serializeToJson();
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if(!reg.test(result.mobile)){
            reject('请输入正确的手机号');
        }
        if(!$.trim(result.username)){
            reject('请输入正确的用户名');
        }
        if($.trim(result.password).length<6){
            reject('请输入正确的密码');
        }
        if(result.password!=result.tpassword){
            reject('请输入正确二次密码');
        }
        if($.trim(result.vCode).length!=6){
            reject('请输入正确的验证码');
        }
        resolve(result);
    })
}
function zcRequset(result){
    return axios.post('/user/register',result);
}
function zcRequsetEnd(data){
    return new Promise(function(resolve,reject){
        if(data.success){
            mui.toast('注册成功');
            setTimeout(function(){
                location.href='login.html';
            },2000)
            resolve();
        }else{
            reject(data.message);
        }
    });
}
