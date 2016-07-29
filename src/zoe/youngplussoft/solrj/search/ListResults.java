package zoe.youngplussoft.solrj.search;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrInputDocument;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.noggit.JSONUtil;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;


/**
 * Servlet implementation class Poi
 */
@WebServlet(name = "List", urlPatterns = { "/List.do" })
public class ListResults extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ListResults() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		doPost(request, response) ;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String q = request.getParameter("q") ;	
		String defaultQuery = request.getParameter("default") ;	
		String page = request.getParameter("page") ;
		String rows = request.getParameter("rows") ;
		if( page == null )
			page = "1" ;
		if( rows == null )
			rows = "10" ;
		String start = "" + (Integer.parseInt(page)-1)*10 ;
		
		if( q.trim().equals("") )
			q = defaultQuery ;
		
		
				
		HttpSolrClient solr = null ;
		
		
		try {		
			
			solr = new HttpSolrClient("http://localhost:7070/solr") ;		
			SolrQuery query = new SolrQuery() ;
			query.setQuery(q) ;
			query.setParam("start", start) ;
			query.setParam("rows", rows) ;
			query.setHighlight(true).setHighlightSnippets(3); 
						
			QueryResponse responseSolr = solr.query("collection1", query) ;
			SolrDocumentList results = responseSolr.getResults() ;
			
			if( results == null || results.size() == 0 ) {
				throw new Exception("empty docs results") ;
			}
			
			Random rnd = new Random();
			rnd.setSeed(new Date().getTime());
			for (int i = 0; results != null && i < results.size(); ++i) {
			
				  //=================
				  SolrDocument resultDoc = results.get(i) ;
				  
				  Float score = (Float)resultDoc.get("score") ;
				  
				  String id = (String)resultDoc.get("id") ;
				  List<String> highlightSnippets = responseSolr.getHighlighting().get(id).get("content");
				  
				  int imgNo = Math.abs(rnd.nextInt())%100 ;
				  String imgUrl = "./foodImage/" + imgNo + ".png" ;
				  resultDoc.put("imgUrl", imgUrl) ;
				  resultDoc.put("imgNo", imgNo) ;
				  
				  if( highlightSnippets != null )
					  resultDoc.put("hilight", highlightSnippets.get(0)) ;
				  else
					  resultDoc.put("hilight", "") ;
			}
			
			solr.close();
			solr = null ;
			  
			request.setAttribute("docs", results);
			request.setAttribute("query", q);
			request.setAttribute("start", start);
			request.setAttribute("rows", rows);
			request.setAttribute("page", page);
		
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/list.jsp") ;
			dispatcher.forward(request, response) ;
			
		}
		catch(Exception e) {
			
			if( solr != null ) try { solr.close(); } catch(Exception ee) {}
			e.printStackTrace();
			
			request.setAttribute("query", q);
			request.setAttribute("start", start);
			request.setAttribute("rows", rows);
			request.setAttribute("page", page);
			
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/list.jsp") ;
			dispatcher.forward(request, response) ;
		}
			
	}
	

	public static void main(String argv[]) {
		
		String id = "1" ;
		
		try {
			if( id != null ) {
				HttpSolrClient solr = new HttpSolrClient("http://localhost:7070/solr/collection1") ;
				SolrQuery query = new SolrQuery() ;
				query.addFilterQuery("id:" + id) ;
				query.setStart(0) ;
				
				QueryResponse responseSolr = solr.query(query) ;
				SolrDocumentList results = responseSolr.getResults() ;
				for (int i = 0; i < results.size(); ++i) {
			      System.out.println(results.get(i));
			      Gson gson = new Gson();
			      String json = gson.toJson(results.get(i));
			      System.out.println("json = " + json);
			    }
				
				solr.close();
			}
		}
		catch(Exception e){
			
		}
	}

}
