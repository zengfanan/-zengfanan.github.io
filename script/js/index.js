define(function(require,exports,module){
    var fc = require('./pub/util'),
		fv = require('./pub/favorites'),
		sethome = require('./pub/sethome'),
		tab=require('./pub/tab');
    $('#kingone').css({color:fc.randomColor()});
	 window.setInterval(function(){
		  $('#kingone').css({color:fc.randomColor()});
	 },1500);	
	$("#test01").click(function () {
		var sitename = "Add  baidu Fav";
		fv(sitename,'http://www.baidu.com');
	});	
	$("#sethome").click(function () {
		sethome(this,window.location);
	});	
	 new tab({ 
	 tab : $(".tb-hd li"), 
	 defaultIndex : 0, 
	 tabCurrentClass : "cur", 
	 only : true, 
	 content : $(".tb-bd"),
	 afterShow : function(index){ 
		 if(index == 0){return} 
		 alert(index);
		 }
	 }); 
	 new tab({ 
	 tab : $(".tb-hd2 li"), 
	 defaultIndex : 0, 
	 tabCurrentClass : "cur", 
	 only : true, 
	 content : $(".tb-bd2"), 
	 trigger : "mouseover" 
	 }); 
	
});