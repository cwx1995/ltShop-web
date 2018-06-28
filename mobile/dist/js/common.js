$(function () {
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	//恢复页面中a的跳转行为
	mui('body').on('tap', 'a', function () {
		var flag = $(this).attr('nd');
		var that = $(this);
		if (flag == 1) {
			axios.get('/user/queryUserMessage')
				.then(function (data) {
					if (data.error) {
						location.href = 'login.html';
					} else {
						location.href = that.attr('href');
					}
				})
		} else {
			location.href = $(this).attr('href');
		}

	})
})

axios.defaults.baseURL = 'http://fullstack.net.cn:3000';
axios.defaults.withCredentials = true;
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	return response.data;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

$.fn.serializeToJson = function () {
	var formAry = this.serializeArray();
	var result = {};
	formAry.forEach(function (item) {
		result[item.name] = item.value;
	});
	console.log(result);
	return result;
}
 function errorHandle  (error) {
    //弹框并输出错误信息内容
    mui.toast(error);
}

function getUrlParams(name){
	var search = location.search.slice(1);
	console.log(search);
	var arr1 = search.split('&');
	console.log(arr1);
	for(var i =0;i<arr1.length;i++){
		var arr2 = arr1[i].split('=');
		
		if(arr2[0]==name){
			return arr2[1];
		}
	}
	return -1;
}