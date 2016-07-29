<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="org.apache.solr.common.SolrDocumentList" %>
<%@ page import="org.apache.solr.common.SolrDocument" %>
<%@ page import="zoe.youngplussoft.solrj.search.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.lang.Math" %>
<%
	String url = request.getRequestURL().toString();
	String baseURL = url.substring(0, url.length() - request.getRequestURI().length()) + ":8080" + request.getContextPath() ;
	
	SolrDocumentList results = (SolrDocumentList)request.getAttribute("docs") ;
	String query = (String)request.getAttribute("query") ;
	String start = (String)request.getAttribute("start") ;
	//String page = (String)request.getAttribute("page") ;
	String rows = (String)request.getAttribute("rows") ;
	
	long nCur = 0 ;
	long nStart = 0 ;
	long nRows = 10 ;
	long nTotal = 0 ;
	long nFound = 0 ;
	
	if( results != null ) {
		nFound = results.getNumFound() ;

		try {
			nTotal = results.getNumFound()/10 + (results.getNumFound()%10 > 0 ? 1:0) ;
			nStart = Long.parseLong(start) ;
			nCur = nStart/10 + 1 ;
		}
		catch(Exception e){
			
		}
	}
	
    String listHref = baseURL + "/List.do?q=" + query + "&rows=10&" + "page=" ;

    String pagingHtml = Paging.getPaging(nRows, nCur, nTotal, nFound, listHref) ;
    
 
%>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>검색 서비스  </title>
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
	var __Hostname = '<%=baseURL%>' ;

	var __poiInfoArr = new Array() ;
	var __poiIdArr = new Array() ;
	
	<% for(int n=0 ; results != null && n<results.size() ; n++) { %>
		__poiInfoArr[<%=n%>] = '<%=(results.get(n).get("title") + "<br>" + ((String)results.get(n).get("address")).split("#@#")[0])%>' ;
		__poiIdArr[<%=n%>] = '<%=((String)results.get(n).get("id")).trim()%>' ;
	<% } %>
	</script>
	
	<script type="text/javascript" src="./js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="./js/map.js"></script>
	<script type="text/javascript" src="./js/news.item.js"></script>
	<script type="text/javascript" src="./js/list.js"></script>
	
</head>
<body style="text-align:center">

	
	<div id="search_bar">
		<form id="searchForm" name="search" action="<%=baseURL%>/List.do" method="get">
			<input type="text"   id="search" name="q" value="<%=query%>" placeholder="맛집을 입력하세요." />
			<input type="hidden" name="default" value="마루샤브" />
			<input type="hidden" name="page" value="1" />
			<input type="hidden" name="rows" value="10" />
			<input type="submit" id="search_submit" class="solid" value="검  색" >
		</form>
	</div>

		
	<div id="searchResults">

	<% 
	
	for(int i=0 ; results!=null && i<results.size() ; i++) { 
			
		SolrDocument doc = results.get(i) ;
		
		String imgUrl = (String)doc.get("imgUrl") ;

		Float  score = (Float)doc.get("score") ;
		
	%>
		
		<div class="poi_detailInfo">
		  <a class="poi" style="color:white" href="<%=((String)doc.get("url")) %>">
		  <div class="poiBox">
		 	<div class="poi_poiDetail">
		 		<div style="float:left">
             		<img class="thumbnail" src="<%=doc.get("imgUrl")%>"></img>
             	</div> 
             	<style>
             		.thumText .title .name br {
             			color:#00ffcc
             		}
             	</style>
				<div class="thumText"  style="float:left"> 
					<div class="title">
						<span class="name"><%=doc.get("title") %></span>
		            	<span class="score">score:<%=score.floatValue() %></span>
		            </div>
					
				</div> 
			</div> 
		
			<div class="poi_poiView"> 
				<div class="thumText"> 						
						<span class="context"><img class="icon" src="image/20/Theme_icon.png"/><%=((String)doc.get("hilight")).replaceAll("&amp;#[0-9]*[;]*","") %></span> 					
				</div>
			</div>
		  </div>
		  </a> 
		</div>	   
		
	<% } %>

	</div>
	
	<div id="paging" style="margin-top:50px;">
		<%=pagingHtml %>
	</div>
	
	<div id='loading'><img src="./image/loading1.gif">
	</div>

</body>
</html>


