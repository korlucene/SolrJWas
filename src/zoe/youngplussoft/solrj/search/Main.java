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
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


/**
 * Servlet implementation class Poi
 */
@WebServlet(name = "Main", urlPatterns = { "/Main.do" })
public class Main extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Main() {
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
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/main.jsp") ;
		dispatcher.forward(request, response) ;	
	}
	
	public static void main(String argv[]) {
		
		String id = "1" ;
		
		try {
			if( id != null ) {
				SolrClient solr = new HttpSolrClient("http://localhost:7070/solr") ;
				SolrQuery query = new SolrQuery() ;
				query.addFilterQuery("id:" + id) ;
				query.setStart(0) ;
				
				QueryResponse responseSolr = solr.query("collection1", query) ;
				SolrDocumentList results = responseSolr.getResults() ;
				for (int i = 0; i < results.size(); ++i) {
			      System.out.println(results.get(i));
			      Gson gson = new Gson();
			      String json = gson.toJson(results.get(i));
			      System.out.println("json = " + json);
			    }
			}
		}
		catch(Exception e){
			
		}
	}

}
