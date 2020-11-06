package webscraper;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import jdk.jshell.spi.ExecutionControl;

class TagHandler implements Callable<TagDTO> {
    TagCounter tc;
    TagHandler (TagCounter tc) {
        this.tc = tc;
    }
    @Override
    public TagDTO call() throws Exception {
        tc.doWork();
        return new TagDTO(tc);
    }
}

public class Tester {

    public static List<TagCounter> runSequental() {
        List<TagCounter> urls = new ArrayList();
        urls.add(new TagCounter("https://www.fck.dk"));
        urls.add(new TagCounter("https://www.google.com"));
        urls.add(new TagCounter("https://politiken.dk"));
        urls.add(new TagCounter("https://cphbusiness.dk"));
        for (TagCounter tc : urls) {
            tc.doWork();
        }
        return urls;
    }

    public static List<TagDTO> runParallel(ExecutorService threadPool) throws ExecutionControl.NotImplementedException, InterruptedException, ExecutionException, TimeoutException {
        List<TagCounter> urls =  new ArrayList();
        urls.add(new TagCounter("https://www.fck.dk"));
        urls.add(new TagCounter("https://www.google.com"));
        urls.add(new TagCounter("https://politiken.dk"));
        urls.add(new TagCounter("https://cphbusiness.dk"));
        
        List<TagDTO> tagDTOs = new ArrayList();
        List <Future<TagDTO>> futures = new ArrayList();
        
        // Start threads
        for (TagCounter tc : urls) {
            TagHandler th = new TagHandler(tc);
            Future<TagDTO> tag = threadPool.submit(th);
            futures.add(tag);
        }
        
        // Get results
        List<TagDTO> results = new ArrayList();
        for (Future<TagDTO> f : futures) {
            results.add(f.get(10, TimeUnit.SECONDS));
        }
        return results;
    }
  
    public static void main(String[] args) throws Exception {
        long timeSequental;
        long start = System.nanoTime();

        List<TagCounter> fetchedData = new Tester().runSequental();
        long end = System.nanoTime();
        timeSequental = end - start;
        System.out.println("\nTime Sequential: " + ((timeSequental) / 1_000_000) + " ms.\n");

        for (TagCounter tc : fetchedData) {
            System.out.println("Title: " + tc.getTitle());
            System.out.println("Div's: " + tc.getDivCount());
            System.out.println("Body's: " + tc.getBodyCount());
            System.out.println("----------------------------------");
        }
        
        ExecutorService threadPool = Executors.newCachedThreadPool();
        start = System.nanoTime();
        long timeParallel = System.nanoTime() - start;
        
        List<TagDTO> fetchedDataParallel = new Tester().runParallel(threadPool);
        end = System.nanoTime();
        timeParallel = end - start;
                
        threadPool.shutdown();
        System.out.println("\nTime Parallel: " + ((timeParallel) / 1_000_000) + " ms.");        
        System.out.println("Parallel was " + timeSequental / timeParallel + " times faster");
       
         
    }
}
