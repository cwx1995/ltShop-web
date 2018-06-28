$(function(){
    requestAddr()
    .then(renderAddr)
    .catch(errorHandle)

    $('#addrBox').on('tap','.deletBtn',function(){
        // alert(1)
        var id=$(this).attr('data-id');
        window.elem = $(this).parents('li');
        mui.confirm('确定删除吗',function(data){
            if(data.index==0){
                
            }else{
                removeAddrRequest (id)
                .then(renderDelAddr)
                .catch(errorHandle)
            }
        })
    })
    
});
function requestAddr(){
    return axios.get('/address/queryAddress');
}
function renderAddr (data){
 return new Promise(function(resolve,reject){
    if(data.length>0){
        var html = template('addrTpl',{
            list:data
        });
        $('#addrBox').html(html);
    }
 });
}
function removeAddrRequest (id){
return axios.post('/address/deleteAddress',{id:id});
}
function renderDelAddr(data){
    return new Promise(function(resolve,reject){
        if(data.success){
        mui.toast('删除成功');
        window.elem.remove();
        resolve();
    }else{
        reject(data.message);
    }
    })
    
}
