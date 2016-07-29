<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String url = request.getRequestURL().toString();
String baseURL = url.substring(0, url.length() - request.getRequestURI().length()) + ":8080" + request.getContextPath() ;
%>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>검색 서비스  </title>
	<!--  link rel="stylesheet" href="./css/style.css"/>
	<link rel="stylesheet" href="./css/food.css"/-->
	<link rel="shortcut icon" href="./image/logo_icon.ico" />	
	
	<script type="text/javascript">
		var mobile = false ;
		var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
		for (var word in mobileKeyWords){
		    if (navigator.userAgent.match(mobileKeyWords[word]) != null){
		        mobile = true ;
		        break;
		    }
		}
		
		if( mobile ) {
			document.write('<link rel="stylesheet" type="text/css" href="./css/styleM.css">');
			document.write('<link rel="stylesheet" type="text/css" href="./css/foodM.css">');
		}
		else {
			document.write('<link rel="stylesheet" type="text/css" href="./css/style.css">');
			document.write('<link rel="stylesheet" type="text/css" href="./css/food.css">');
		}


/*
	if(navigator.appName.charAt(0)=='M' && (
	           (navigator.appVersion.indexOf('MSIE 6') >= 0) ||
	           (navigator.appVersion.indexOf('MSIE 7') >= 0)) ) {
	            location.href = './old/index.html';
	}
*/
	var __Hostname = "<%=baseURL%>" ;


	</script>
	
</head>
<body style="text-align:center;">

	<div id="menu_div">
		<div id="navigation">
			<div id="menu">
				<ul id="nav">
					<li><p>맛집검색</p></li>
			
				<li>
				<!-- Search Form -->
				<form id="searchform_bar" name="searchfield" action="<%=baseURL%>/List.do" method="get"> 
					<input type="text" id="searchfield" name="q" placeholder="ex)마루샤브" />
					<input type="hidden" name="default" value="마루샤브" />
					<input type="hidden" name="page" value="1" />
					<input type="hidden" name="rows" value="10" />
					<input type="image" img src="./image/search.png" id="search_submit_bar" class="solid_bar">
					
					
				</form>
				</li>
				 <!-- / Search Form -->
				</ul><!-- #nav END-->
				 
			</div><!-- #menu END-->
		</div><!-- #navigation END-->
	</div><!-- #menu_div END-->
	
	<div id="main_div">
		
		<div id="contents">
			<img src="./image/splash-320screen.png"/>	
		</div>
	</div>
	
	<div id='loading'><img src="./image/loading1.gif">
	</div>
	
</body>
</html>


