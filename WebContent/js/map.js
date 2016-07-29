   	var __circle = null ;
   	var __center = null ;
   	var __radius = null ;
   	var __map = null ;

	var onMouseDown = function(event, payload) {
		
		if( typeof event._src._eventMgr === 'undefined' || event._src._eventMgr._domEvent.button == 0 )
			return ;
	    
		console.log("우클릭  down :" + event.getCoord());
        
		__center = event.getCoord() ;    
	} 
	  
	var onMouseUp = function(event, payload) {
		 
		 if(  typeof event._src._eventMgr === 'undefined' || event._src._eventMgr._domEvent.button == 0 )
				return ;
		    
		  console.log("우클릭 up :" + event.getCoord());
			
		
	      var coord = event.getCoord() ;
	      var center = __center ;
	      
	      if( center == null )
	    	  return ;
			
			var radius = Math.sqrt( (center.x-coord.x)*(center.x-coord.x) + (center.y-coord.y)*(center.y-coord.y) ) ;
			
			__radius = radius ;
			
			
			if( __circle != null )
				__map.getLayer("Vector").remove(__circle) ;
			
			var circle = new olleh.maps.vector.Circle({
				  map: app.__map,
				  center: center,
				  radius: radius,
				  strokeColor: 'red',
				  fillColor: 'red',
				  fillOpacity: 0.3
				});
			
			__circle = circle ;
			 
	} 
   
   	/**
		draw Olleh Map
		@param		{String}	div		- div id
		@param		{int}		zoom	- zoom level
		@param 	    {int}		x		-  지도  x  좌표 
		@param 	    {int}		y		-  지도  y  좌표 
	 */
	var drawOllehMap = function(div, zoom, x, y) {
		
		if( __map )
			__map = null ;

		var divTag = document.getElementById(div) ;
		divTag.innerHTML = "" ;
		
		__map = new olleh.maps.Map(divTag, {
			        center: new olleh.maps.UTMK(x, y),
			        zoom: zoom,
			        //disableDefaultUI: true // 전체 컨트롤 삭제
			      });
		
		__map.onEvent('mousedown', onMouseDown);				
		__map.onEvent('mouseup', onMouseUp);
		
		return __map ;
	} 
	
	var drawOllehMap2 = function(div, zoom, x, y) {
		
		if( __map )
			__map = null ;
			
		
		__map = new olleh.maps.Map(document.getElementById(div), {
			        center: new olleh.maps.UTMK(x, y),
			        zoom: zoom,
			        //disableDefaultUI: true // 전체 컨트롤 삭제
			      });
		
		return __map ;
	}
	
	/**
	draw Olleh Map
		@param 	    {int}		x		-  지도  x  좌표 
		@param 	    {int}		y		-  지도  y  좌표 
		@param		{boolean}	ani		-  animation marker flag
		@return 	{Marker}			-  지도위에 생성된 마커 리턴
	 */
	drawMarker = function(x,y, info, ani) {
		
		initPosition = new olleh.maps.UTMK(x, y);
	
		if( ani ) {
			
			aniMarker = new olleh.maps.overlay.Marker({
		        position: initPosition,
		        animation: olleh.maps.overlay.Marker.BOUNCE, // 제자리에서 통통튀는 Bounce 애니메이션 동작
		        map: __map ,
		        title: info
		      });
			
			return aniMarker ;
		}
		else {
			
			flatMarker = new olleh.maps.overlay.Marker({
		        position: initPosition,
		        flat: true, // 마커를 2D로 표현 (그림자가 없음)
		        map: __map ,
		        title: info
		      });
			
			return flatMarker ;
		}
	}