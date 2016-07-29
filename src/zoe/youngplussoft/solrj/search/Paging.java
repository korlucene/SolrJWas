package zoe.youngplussoft.solrj.search;

import java.util.Enumeration;
import java.util.Hashtable;

/**
 * 
 */

public class Paging {

	public static String getPaging(long write_pages, long cur_page, long total_page, long found_count,  String url)
	{
	    String str = "";
	    if (cur_page > 1) {
	        str += "<a href='" + url + "1'>First</a>";
	    }
	
	    long start_page = ( ( (cur_page - 1 ) / write_pages )  * write_pages ) + 1;
	    long end_page = start_page + write_pages - 1;
	
	    if (end_page >= total_page) end_page = total_page;
	
	    if (start_page > 1) str += " &nbsp;<a href='" + url + (start_page-1) + "'>Prev</a>";
	
	    if (total_page > 1) {
	        for (long k=start_page; k<=end_page; k++) {
	            if (cur_page != k)
	                str += " &nbsp;<a href='" + url + k +"'><span>" + k + "</span></a>";
	            else
	                str += " &nbsp;<b>" + k + "</b> ";
	        }
	    }
	
	    if (total_page > end_page) str += " &nbsp;<a href='" + url + (end_page+1)  + "'>Next</a>";
	
	    if (total_page > end_page) {
	        str += " &nbsp;<a href='" + url + total_page + "'>Last</a>";
	    }
	    str += "[total:" + found_count + "]";
	
	    return str;
	}
	

	public static String filterTitle(String s) {
		s = s.replaceAll("&amp;", "&");
		s = s.replace("&lt;", "<");
		s = s.replace("&gt;", ">");
		s = s.replace("&quot;", "\"");
		s = s.replace("&apos;", "'");
		s = s.replace("&nbsp;", " ");
		s = s.replace("&#160;", " ");
		s = s.replace("\r\n", " ");
		return s;
	}
	
	public static String substrN(String str, int maxlen) {
	    
	    if( maxlen > 0 && str.length() > maxlen ) {
	       return  str.substring(0,maxlen) ;
	    }
	    else {
	        return str ;
	    }
	}
   
}
