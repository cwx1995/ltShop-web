$(function () {
    sjfl();
    
    var id = getUrlParams('id');
    if(id!= -1){
        $('#addAddrBtn').html('修改收货地址');

        axios.get('/address/queryAddress')
        .then(function(data){
            console.log(data);
            for(var i =0;i<data.length;i++){
                if(data[i].id==id){
                    console.log(data[i]);
                    var html = template('modifyAddr',data[i]);
                    $('#addrForm').html(html);
                    sjfl();
                }
            }
        })
    }



    $('#addAddrBtn').on('tap', function () {
        var result = $('#addrForm').serializeToJson();


        console.log(result);

        if(id!=-1){
            result.id=id;
            addAd('/address/updateAddress',result)
            .then(renderAddr)
            .catch(function (error) {
				mui.toast(error);
			});

        }else{
 addAd('/address/addAddress',result)
            .then(renderAddr)
            .catch(function (error) {
				mui.toast(error);
			});
        }
       
    });
});
function addAd(url,result) {
    return axios.post(url, result);
}
function renderAddr(data) {
    return new Promise(function (resolve, reject) {
        if (data.success) {
            mui.toast('成功');
            setTimeout(function () {
                location.href = 'address.html';
            }, 2000)
            resolve(data);
        } else {
            reject(data.message);
        }
    });

}
function sjfl(){
    // 创建拥有三级分类的选择框
	var cityPicker = new mui.PopPicker({ layer: 3 });
	// 为选择框添加数据
	cityPicker.setData(cityData);
	// 获取触发选择框的input元素
	var showCityPickerButton = document.getElementById('showCityPicker');
	// 当轻敲input元素的似乎后
	showCityPickerButton.addEventListener('tap', function (event) {
		// 让选择框弹出
		cityPicker.show(function (items) {
			console.log("你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);

			// 将数据添加到页面中
			$(showCityPickerButton).val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text)
		});
    }, false);

}