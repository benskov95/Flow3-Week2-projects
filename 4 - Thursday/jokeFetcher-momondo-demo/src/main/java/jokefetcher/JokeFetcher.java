package jokefetcher;

import com.google.gson.Gson;
import dto.ChuckDTO;
import dto.CombinedDTO;
import dto.DadDTO;
import java.io.IOException;
import utils.HttpUtils;


public class JokeFetcher {
    public static void main(String[] args) throws IOException {
        
        Gson gson = new Gson();
        
        String chuck = HttpUtils.fetchData("https://api.chucknorris.io/jokes/random");
        String dad = HttpUtils.fetchData("https://icanhazdadjoke.com");
        
        ChuckDTO chuckDTO = gson.fromJson(chuck, ChuckDTO.class);
        DadDTO dadDTO = gson.fromJson(dad, DadDTO.class);
        dadDTO.addUrl();
        
        CombinedDTO combinedDTO = new CombinedDTO(chuckDTO, dadDTO);
        String combined = gson.toJson(combinedDTO);
        
        System.out.println("JSON fetched from chucknorris:");
        System.out.println(chuck);
        System.out.println("JSON fetched from dadjokes:");
        System.out.println(dadDTO.getUrl());
        System.out.println("CombinedDTO: " + combined);
        
       
    }
}
