function httpAjax(options) {
	var timeout=false;//是否超时
    /**
     * 传入方式默认为对象
     * */
    options = options || {};
    /**
     * 默认为GET请求
     * */
    options.type = (options.type || "GET").toUpperCase();
    /**
     * 返回值类型默认为json
     * */
    options.dataType = options.dataType || 'json';
        /**
     * url
     * */
    options.url = options.url || '';
    /**
     * 设置超时时间，默认6000
     * */
    options.timeout = options.timeout || 6000;
    
    /**
     * 默认为异步请求
     * */
    options.async = options.async?options.async:true;
    /**
     * 对需要传入的参数的处理
     * */
    var params = getParams(options.data);
    var xhr;
    /**
     * 创建一个 ajax请求
     * W3C标准和IE标准
     */
    if (window.XMLHttpRequest){
        /**
         * W3C标准
         * */
        xhr = new XMLHttpRequest();
    }else{
        /**
         * IE标准
*老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：

         * @type {ActiveXObject}
         */
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && !timeout){
            var status = xhr.status;
            if (status >= 200 && status < 300 ){
                var res=xhr.responseText;
                if(options.dataType=="json"){
                    try{
                         res=JSON.parse(xhr.responseText);
                    }catch(e){
                        console.log("Return JSON format error")
                    }

                }
                options.success && options.success(res);
            }else{
                options.error && options.error(status);
            }
        }
    };
    if (options.type == 'GET'){
        xhr.open("GET",options.url + '?' + params ,options.async);
        xhr.send(null)
    }else if (options.type == 'POST'){
        /**
         *打开请求
         * */
        xhr.open('POST',options.url,options.async);
        /**
         * POST请求设置请求头
         * */
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        /**
         * 发送请求参数
         */
        xhr.send(params);
    }
    var timer = setTimeout(function(){
        timeout = true;
        console.log('Ajax timeout!')
        xhr.abort();//请求中止
    },options.timeout);
}
/**
 * 对象参数的处理
 * @param data
 * @returns {string}
 */
function getParams(data) {
    var arr = [];
    for (var param in data){
        arr.push(encodeURIComponent(param) + '=' +encodeURIComponent(data[param]));
    }
    console.log(arr);
    arr.push(('randomNumber=' + Math.random()).replace('.'));
    console.log(arr);
    return arr.join('&');
}
