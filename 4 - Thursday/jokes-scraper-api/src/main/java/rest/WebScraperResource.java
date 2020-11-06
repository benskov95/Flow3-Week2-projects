package rest;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeoutException;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import jdk.jshell.spi.ExecutionControl;
import webscraper.TagCounter;
import webscraper.Tester;
import webscraper.TagDTO;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("scrape")
public class WebScraperResource {
    @Context
    private UriInfo context;
    private static ExecutorService threadPool = Executors.newCachedThreadPool();
    
    @Path("sequential")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public String getTagsSequential() {
        long startTime = System.nanoTime();
        List<TagCounter> dataFeched = Tester.runSequental();
        long endTime = System.nanoTime()-startTime;
        return TagDTO.getTagsAsJson("Sequential fetching",dataFeched, endTime);
    }
    
    @Path("parallel")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public String getTagsParrallel() throws ExecutionControl.NotImplementedException, InterruptedException, ExecutionException, TimeoutException {
        long startTime = System.nanoTime();
        List<TagDTO> dataFeched = Tester.runParallel(threadPool);
        long endTime = System.nanoTime()-startTime;
        return TagDTO.getTagDTOsAsJson("Parallel fetching", dataFeched, endTime);
    }
    
    
}
