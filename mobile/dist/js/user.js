$(function(){
    getUserInfo()
    .then(userTpl);
   
    $('#logoutBtn').on('tap',function(){
        loginout()
        .then(lg)
        .catch(errorHandle)
    })

})

function getUserInfo(){
    return axios.get('/user/queryUserMessage');
}
function userTpl (data){
    return new Promise(function(resolve,reject){
        console.log(data);
    var html=template('userTpl',data);
    $('#userBox').html(html);
    resolve(data);
    })
    
}
function loginout(){
    return axios.get('/user/logout')
}
function lg(data){
    return new Promise(function(resolve,reject){
        if(data.success){
            mui.toast('退出成功');
            setTimeout(function(){
                location.href='login.html';
            },2000);
            resolve();

        }else{
            reject('退出失败'); 
        }
    });
}