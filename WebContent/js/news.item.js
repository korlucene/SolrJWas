var newsItemTag =
'<a class="poi" href="#" style="text-align:left; cursor: auto;">\n'+
'<div id="listItem_$ITEM_NO" class="poiBox"  style="overflow: auto">\n' + 
'	<div class="thumbBox">\n' + 
'        <div><img class="thumbnail" src="$IMG_URL"/></div>\n' + 
'        <div class="thumText">\n' + 
'            <span class="title">$POI_NAME</span>\n' + 
'            <div>\n' + 
'            <span class="context"><img class="icon" src="image/20/location_icon.png"/>$ADDRESS</span>\n' + 
'            <span class="context"><img class="icon" src="image/20/phone_icon.png"/>$TEL</span>\n' + 
'            </div>\n' + 
'        </div>\n' + 
'    </div>\n' + 
'    <div class="blogBox">\n' + 
'        <div class="blogNum"><span>$BLOG_COUNT Blogs</span></div>\n' + 
'        <div class="blogText"><span>$CONTENT</span></div>\n' + 
'    </div>\n' + 
'</div>\n' +
'</a>\n' ;


var poiDetailTag = 
"   <div id=\"poiDetail\">" + 
"		<div class=\"thumText\">" + 
"			<div class=\"title\"><span class=\"name\">#poiName#</span>" + 
"            <span class=\"blogname\">#blogCount# Blogs</span>" + 
"			</div>" +
"			<div>" + 
"				<span class=\"context\"><img class=\"icon\" src=\"image/20/location_icon.png\"/>#address#</span>" + 
"				<span class=\"context\"><img class=\"icon\" src=\"image/20/phone_icon.png\"/>#tel#</span>" + 
"			</div>" + 
"		</div>" + 
"	</div>" + 
"	<div id=\"poiView\">" + 
"		<div class=\"thumText\">" + 
"			<div>" + 
"             <tpl if=\" values.theme != '테마 : ' \">" + 
"				<span class=\"context\"><img class=\"icon\" src=\"image/20/Theme_icon.png\"/>#theme#</span>" + 
"             </tpl>" + 
"             <tpl if=\" values.feature != '특징 : ' \">" + 
"				<span class=\"context\"><img class=\"icon\" src=\"image/20/feature_icon.png\"/>#feature#</span>" + 
"             </tpl>" + 
"             <tpl if=\" values.bhour != '시간 : ' \">" + 
"				<span class=\"context\"><img class=\"icon\" src=\"image/20/bhour_icon.png\"/>#bhour#</span>" + 
"             </tpl>" + 
"             <tpl if=\" values.area != '지역 : ' \">" + 
"				<span class=\"context\"><img class=\"icon\" src=\"image/20/area_icon.png\"/>#area#</span>" + 
"             </tpl>" + 
"             <tpl if=\" values.facility != '시설 : ' \">" + 
"				<span class=\"context\"><img class=\"icon\" src=\"image/20/facility_icon.png\"/>#facility#</span>" + 
"             </tpl>" + 
"			</div>" + 
"		</div>" + 
"	</div>" ;


var poiBlogTag =
	"<a class='blog' \n" +
	"	href=\"#link#\" \n" +
	"	target=\"_blank\" \n" +
	"	> \n" +
	"     <div class=\"listDetailItem\"> \n" +
    "        <div style=\"float:left\"><img class=\"thumbnail\" src=\"#imgUrl#\"></img></div> \n" +
    "		 <div> \n" +
    "            <span class=\"blogContent\"><b>#title#<b></span> \n" +
    "            <span class=\"blogName\"><p>#detailInfo#</p></span> \n" +
    "        </div> \n" +
    "     </div> \n" +
	"  </a> \n" ;


