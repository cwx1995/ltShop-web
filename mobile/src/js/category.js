$(function(){
    getFirstCategory()
    //下面的函数返回一个promise  相当于带了id值 
    .then(renderCategoryFirst)
    //所以下面代码不需要（id）既可以获取二级分类
    .then(getSecondCategory)
    .then(renderSecondCategory)
    .catch(function(error){
        mui.toast(error);
    })
    $('#categoryFirstBox').on('tap','a',function(){
        var id=$(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        console.log(id);
        getSecondCategory(id)
        .then(renderSecondCategory)
        .catch(function(error){
            if(error==undefined){
                mui.toast('暂无数据');
            }else{
                mui.toast(error);
            }
            
        })
    });

});



function getFirstCategory(){
    return axios.get('/category/queryTopCategory');
}
function renderCategoryFirst(data){
    return new Promise(function(resolve,reject){
    console.log(data);
        var html = template('categoryFirst',data);
        $('#categoryFirstBox').html(html);
        if(data.rows.length>0){
            var id=data.rows[0].id;
            resolve(id);
        }
    })
   

}
function getSecondCategory(id){
    return axios.get('/category/querySecondCategory',{
        params:{
            id:id
        }
    })
}
function renderSecondCategory(data){
    return new Promise(function(resolve,reject){
 console.log(data);
    var html = template('categorySecond',{
        list:data,
        url:axios.defaults.baseURL
    });
    $('#categorySecondBox').html(html);
    if(data.rows.length==0){
        reject();
    }else{
        resolve();
    }
    })
   

}