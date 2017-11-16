///**
// * Created by lyx on 2017/11/13.
// */
////截取url参数
//var host = window.location.host;
////var contentId = getQueryString("contentId");
////var length = getQueryString("length");
////var userId = getQueryString("userId");
////var gpId = getQueryString("gpId");
////var current = getQueryString("current");
//var url = window.location.host;
//function getQueryString(name) {
//    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//    var r = window.location.search.substr(1).match(reg);
//    if (r != null)
//        return decodeURIComponent(r[2]);
//    return null;
//}
//
//var hisData = {
//    //contentId:contentId,
//    //type:type
//    userId:139,
//    gpId:201
//
//}
//
////hisData = JSON.stringify(hisData);
//$.ajax({
//    url:'http://app.es.loc/web/gp/gpHomePage.do',
//    //url:'http://192.168.1.8:8080/app/gp/listGpVedio.do',
//    type:'GET',
//    data:hisData,
//    dataType:'json',
//    contentType:"application/json",
//    success:function(data){
//        console.log(data);
//        //if(data.data){
//        //    console.log(data);
//        //    var html ='';
//        //    for(var i=0;i<data.data.length;i++){
//        //
//        //    }
//        //}
//    }
//})
