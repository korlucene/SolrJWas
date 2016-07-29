$(function () {
	
	var adjustDateTimeString= function (strDateTime) {
		var strResult,
			strYear,
			strMonth,
			strDay,
			strHour,
			strMinute,
			dtNow,
			strHourFormatted;

		strYear = strDateTime.substr(0, 4);
		strMonth = strDateTime.substr(4, 2);
		strDay = strDateTime.substr(6, 2);
		strHour = strDateTime.substr(8, 2);
		strMinute = strDateTime.substr(10, 2);

		dtNow = new Date();
		if (dtNow.getYear() === strYear && dtNow.getMonth() === strMonth && dtNow.getDate() === strDay) {
			strResult = "";
		}
		else {
			strResult = strMonth + "월\n" + strDay+"일\n" ;
		}

		if (strHour > 12) {
			strHour -= 12;
			strHourFormatted = "오전 " + ((strHour < 10) ? "0" + strHour : strHour);
		}
		else {
			strHourFormatted = "오후" + strHour;
		}
		strResult += strHourFormatted + ":" + strMinute ;

		return strResult;
	}
	
	

	var replaceALL=function(argvalue, x, y) {

		  if ((x == y) || (parseInt(y.indexOf(x)) > -1)) {
		    return argvalue;
		  }
		    
		  while (argvalue.indexOf(x) != -1) {
		    var leading = argvalue.substring(0, argvalue.indexOf(x));
		    var trailing = argvalue.substring(argvalue.indexOf(x) + x.length, 
			argvalue.length);
		    argvalue = leading + y + trailing;
		  }

		  return argvalue;
	}

	

	var __start_at = 0;
	var __more = 100 ;
	var __loading = false ;
	
	__onSuccessAjax = function(response, textStatus, jqXHR) {
//		console.log(response);
	
	  var itemlist ="";	  
	  
	  var docs = $.parseJSON(response) ;
	  
	  //var docs = result.response.docs ;
	  
	  if( docs && docs.length == 10 ) {
	  	__more = 10 ;
	  }
	  else {
	  	__more = 0 ;
	  }
				
	  for(i=0 ; i<docs.length ; i++){
		  
		  	var imageTag ='' ;
		  	var item = '' ;
		    var newsItem = docs[i] ;
		    
	    	item = newsItemTag.replace("\$ITEM_NO", ""+i) ;
	    	item = item.replace("\$ITEM_NO", ""+i) ;
	    	item = item.replace("\$IMG_URL", splitFirst(newsItem.imgUrl, '@@#sep#@@', 0)) ;
	    	item = item.replace("\$POI_NAME", newsItem.poiName) ;
	    	item = item.replace("\$BLOG_COUNT", newsItem.blogCount) ;
	    	item = item.replace("\$ADDRESS", splitFirst(newsItem.address, '#@#', 0)) ;
	    	item = item.replace("\$TEL", splitFirst(newsItem.tel, '#@#', 0))
	    	item = item.replace("\$CONTENT", splitFirst(newsItem.hilight, '@@#sep#@@', 24)) ;	    	
	    	
	    	itemlist +=item;    	
	  };
	  
	  if( __startat == 0 ) {
		  $("#searchResults").html(itemlist);
		  //console.log(itemlist);
	  }
	  else {
//		  $("#searchResults :last-child").after(itemlist);
		  $("#searchResults").append(itemlist);
	  }
	  
	  if( __more > 0 ) {
//		  __startat = (__more > 10 ) ? (__startat+10) : (__startat+__more) ;
		  __startat = __startat +10;
	  }
	  
	  //document.body.style.cursor = "default"; 
	  //$(".solid").attr("disabled", false) ;
		
	};

	__onErrorAjax = function(jqXHR, textStatus, errorThrown) {
//		console.log("Error : " + textStatus);
		
		//document.body.style.cursor = "default"; 
		//$(".solid").attr("disabled", false) ;

		alert('ERROR:AJAX 통신에러');

	}
	
	__optionsAjaxSearchNews = {
			url: __Hostname + "/Query.do?",
			type: "POST",
			data: {
				q: undefined,
				fq: undefined,
				start: 0,
				rows: 10,
				//defType: "edismax",
				//qf: "poiName^100+address^10+title^70+theme^10+feature^10+detailInfo^1"
			},
			dataType: "json",
			timeout: 10000,
			success: __onSuccessAjax,
			error: __onErrorAjax
			
	};
	
	

	__moreLoad = function(dataString) {  
		
		if( __loading ) return ;
		
//    	dataString = $("#searchForm").serialize();
    	dataString +="&start="+__startat+"&rows=10" ;

    		
//    	alert(dataString) ;   		    

    	$.ajax({
    		type: "POST",
    		url: __Hostname + "/Query.do",
    		async: true,
    		data: dataString,
    		success: __onSuccessAjax,
    		error: __onErrorAjax,
    		beforeSend:function(jqXHR, settings){
    			__loading = true ;
    			$("#loading").fadeIn(10);
    			$(".solid_bar").attr("disabled", true) ;
    	    	$(".solid").attr("disabled", true) ;
    	    	document.body.style.cursor = "wait"; 
    		},
    		complete:function(jqXHR, settings){
    			__loading = false ;
    			$("#loading").fadeOut(10);
				document.body.style.cursor = "default"; 
				$(".solid_bar").attr("disabled", false) ;
				$(".solid").attr("disabled", false) ;
			}  			
    	});
	};  
	
	__searchBar = function() {
	
		$("#searchForm input:text").val($("#searchform_bar input:text").val()); 
		var query =  $("#searchForm input:text").val()  ;
		if($.trim(query) == '' ) {
    		alert("빈 문자열입니다.") ;
    		return ;
		}
		
		var height = $("#search_bar").height();
    	$("#search").height(height);
		
		$("#news-wrapper").fadeIn(1000);
		
		var screenW = window.screen.availWidth;
		
		$("#content-wrapper").css("padding-left","420px");
		
		__startat = 0 ;
		__more = 10 ;
		__loading = false ;
		
		//$("#searchResults").html('<img src="/images/loading1.gif"/>');
		dataString = $("#searchform_bar").serialize();


		if( __more > 0 )
			__moreLoad(dataString) ;	
		$("#searchform_bar input:text").val("");
	};  
	

	__search = function() {  
		
//		$("#searchResults").html("") ;
		
		var query =  $("#searchForm input:text").val()  ;
    	if( $.trim(query) == ''  ) {
    		alert("빈 문자열입니다.") ;
    		return ;
    	}
    	__startat = 0 ;
    	__more = 10 ;
    	__loading = false ;
    	//$("#searchResults").html('<img src="/images/loading1.gif"/>');
		dataString = $("#searchForm").serialize();

		
		if( __more > 0 )
			__moreLoad(dataString) ;	
	};  
	

	
	
	__searchClear = function(){
		$("#news-wrapper").fadeOut(500);
		var screenW = window.screen.availWidth;
			$("#content-wrapper").css("padding-left","");

	}

	$('a.poi').hover(
		function() {
			alert('a') ;
    		$(this).children().css('border-style','solid');
  		}, function() {
    		$(this).children().css('border-style','dotted');
  		}
	) ;

/*
	$('a.poi').focus(
    	function(){
        	$(this).children().css('border-style','solid');
    	}).blur(
    	function(){
        	$(this).children().css('border-style','solid');
    	});
    	*/
	
//	$(window).scroll(function(){
//		if  ($(window).scrollTop() == $("#searchResults").height() - $(window).height()){
//		   alert("a") ;
//		}
//	}); 
	
	$(document).ready(function () {
		__startat = 0 ;
		//__moreLoad(__query) ;
	});
	
});	

	
