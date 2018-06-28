$(function(){
    $('#getCodeBtn').on('tap',function(){
        getCheckCode()
        .then(printCode);
    });
    $('#confirmModify').on('tap',function(){
        validateForm ()
			.then(sendModifyRequest)
			.then(renderModify)
			.catch(errorHandle)
    })
})
function getCheckCode(){
    return axios.get('/user/vCodeForUpdatePassword');
}
function printCode(data){
    console.log(data);
}
function validateForm(){
   return new Promise(function(resolve,reject){
       var result = $('#formlist').serializeToJson();
       if(!$.trim(result.oldPassword)){
        reject('请输入原密码');
       }
       if(result.newPassword!=result.agPassword){
        reject('请输入相同密码');
       }
       resolve(result);
   })
}
function sendModifyRequest(result){
    return axios.post('/user/updatePassword',result);
}
function renderModify(data){
    return new Promise(function(resolve,reject){
        if(data.success){
            mui.toast('密码修改成功, 2秒后跳转到登录页面');
			setTimeout(function () {
				location.href = 'login.html';
			}, 2000)
			resolve(data);
        }else{
            reject(data.message);
        }
    })
}
