/**
 * 
 */
//$(function () {
	
	var __loading = false ;
	
	function filterTitle(s) {
		s = s.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&quot;/g, "\"");
		s = s.replace(/&apos;/g, "'");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#160;/g, " ");
		s = s.replace(/\r\n/g, " ");
		return s;
	}
	
	function Theme(poiId, theme) {
		
		if( __loading ) {
			return ;
		}
		
		$.ajax(
			{
				url: __Hostname + "/ThemeAA.do",
				type: "POST",
				data: {
					poiId: poiId,
					theme: theme,
				},
				dataType: "json",
				timeout: 10000,
				success: function(response, textStatus, jqXHR){
					//var results = $.parseJSON(response) ;
					var results = response ;
					
					var html = "" ;
					for(var i=0 ; results && i < results.length ; i++) {
						
						var tag = poiBlogTag.replace('#link#', results[i].urlInfo[0]) ;
						//tag = tag.replace('#imgUrl#', results[i].imgUrl[0]) ;
						tag = tag.replace('#imgUrl#', foodImageArr[i]) ;
						tag = tag.replace('#title#', filterTitle(results[i].title[0])) ;
						tag = tag.replace('#detailInfo#', results[i].hilight) ;
						html += tag ;
					}
					
					$("#blogList").html(html);
				},
				error: function(jqXHR, textStatus, errorThrown){
					alert('ajax 통신 오류') ;
				},
				beforeSend:function(jqXHR, settings){
	    			__loading = true ;
	    			$("#loading").css('display', 'block');
	    			$("#loading").fadeIn(10) ;
	    		},
	    		complete:function(jqXHR, settings){
	    			__loading = false ;
	    			$("#loading").css('display', 'none');
	    			$("#loading").fadeOut(10) ;
				}  			
			}
		) ;
	}	
	
	
	$(document).ready(function () {
		
		$("a.blog").hover(
			function() {
			  	//this.querySelector("div.listDetailItem").style.setProperty("background-color","Cyan", "important") ;
			  	this.querySelector("div.listDetailItem").style.setProperty("border","3px solid Cyan", "important") ;
			},
			function() {
				//this.querySelector("div.listDetailItem").style.setProperty("background-color","white", "important") ;
				this.querySelector("div.listDetailItem").style.setProperty("border","1px dotted #777777", "important") ;
			}
		
		);
		
		$("#search").keyup(function(event){
		  if(event.which == 13){
		    document.searchForm.submit();
		    }
		});
		
		drawOllehMap2('map', 10, __poiX, __poiY) ;
		drawMarker(__poiX, __poiY, __poiInfo, true) ;
			
	});

//});	
