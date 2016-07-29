/**
 * 
 */

$(function () {
	
	$(document).ready(function () {
		
		$("a.poi").hover(
			function() {
			  this.querySelector("div.poiBox").style.setProperty("background-color","Cyan", "important") ;
			},
			function() {
				  this.querySelector("div.poiBox").style.setProperty("background-color","white", "important") ;
			}
		
		);
		
		$("#search").keyup(function(event){
			  if(event.which == 13){
			    document.searchForm.submit();
			    }
		});
		
		if( __poiIdArr.length > 0 ) {
			drawOllehMap('map', __zoom, __centerX, __centerY) ;
		}
		else {
			$("#map").html("<br><br><p>검색 결과가 없습니다!!!</p>")
		}
		
		for(var k=0 ; k<__poiIdArr.length ; k++) {
			
			var marker = null ;
			if( k == 0 )
				marker = drawMarker(__poiXarr[k], __poiYarr[k], __poiInfoArr[k], true) ;
			else
				marker = drawMarker(__poiXarr[k], __poiYarr[k], __poiInfoArr[k], false) ;
			
			marker.onEvent('click', function(event, payload) {
				
				var distance = 99999999999 ;
			    var coord = event.getCoord() ;
			    var index = -1 ;

			    for(var j=0 ; j<__poiXarr.length ; j++) {
			        var dist =  Math.sqrt( (__poiXarr[j]-coord.x)*(__poiXarr[j]-coord.x) + (__poiYarr[j]-coord.y)*(__poiYarr[j]-coord.y) ) ;
			        if( distance > dist ) {
			            distance = dist ;
			            index = j ;
			        }
			     }
				
				window.location.href = __Hostname + '/Detail.do?poiId=' + __poiIdArr[index] ;
			}) ;
		}
	});

});	