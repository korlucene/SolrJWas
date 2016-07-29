package zoe.youngplussoft.solrj.search;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.embedded.EmbeddedSolrServer;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.apache.solr.core.CoreContainer;
import org.apache.solr.client.solrj.embedded.EmbeddedSolrServer ;


public class Sample {
	
	public static void highlight() {
		
		try {
			SolrClient solr = new HttpSolrClient("http://localhost:7070/solr") ;		
			SolrQuery query = new SolrQuery() ;
			query.setQuery("content:갈비 AND id:4001") ;
			query.setParam("start", "0") ;
			query.setParam("rows", "10") ;
			//query.setHighlight(true).setHighlightSnippets(3); 
						
			QueryResponse responseSolr = solr.query("collection1", query) ;
			SolrDocumentList results = responseSolr.getResults() ;
			
			if( results == null || results.size() == 0 ) {
				throw new Exception("empty docs results") ;
			}
		
			  SolrDocument resultDoc = results.get(0) ;
			  
			  String id = (String)resultDoc.get("id") ;
			  List<String> highlightSnippets = responseSolr.getHighlighting().get(id).get("content");
			  
			  System.out.println(highlightSnippets);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	public static void search() {
		
		try {
			SolrClient solr = new HttpSolrClient("http://localhost:7070/solr") ;
			SolrQuery query = new SolrQuery() ;
			query.setQuery("서서갈비") ;
			//query.addFilterQuery("id:4001 or id:4002") ;
			query.setStart(0) ;
			
			QueryResponse responseSolr = solr.query("collection1", query) ;
			SolrDocumentList results = responseSolr.getResults() ;
			
			System.out.println(results.toString());
		}
		catch(Exception e){
			
		}
		
	}
	
	public static void delete() {
		
		try {
	
			HttpSolrClient solr = new HttpSolrClient("http://localhost:7070/solr/collection1") ;
			solr.deleteByQuery("id:4001 or id:4002") ;
			solr.commit();	
			solr.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	
	public static void add() {
		
		try {
	
			 HttpSolrClient solr = new HttpSolrClient("http://localhost:7070/solr/collection1") ;
			 SolrInputDocument doc1 = new SolrInputDocument();
			 doc1.addField( "id", "4001" );
			 doc1.addField( "title", "서서갈비", 1.0f );
			 doc1.addField("address", "서울시 마포구", 1.0f) ;
			 doc1.addField( "content", "갈비 맛이 일품입니다. 앉아서 먹는 서서 갈비 ....", 1.0f );

	
			SolrInputDocument doc2 = new SolrInputDocument();
			 doc2.addField( "id", "4002" );
			 doc2.addField( "title", "홍까스", 1.0f );
			 doc2.addField("address", "경기도 성남시 수정구 산성동", 1.0f) ;
			 doc2.addField( "content", "수제 돈까스 전문점, 생모밀 전문, 맛이 일품입니다  ", 1.0f );
	
			Collection<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();
			docs.add( doc1 );
			docs.add( doc2 );


			solr.add( docs );
			solr.commit();
			solr.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public static void main(String args[]) {
		
		//search() ;
		highlight() ;
		//delete() ;
	}

}
