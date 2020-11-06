package dto;

public class DadDTO {
    
    private String joke;
    private String id;
    private String url;

    public DadDTO(String joke, String id) {
        this.joke = joke;
        this.id = id;
    }

    public String getJoke() {
        return joke;
    }

    public void setJoke(String joke) {
        this.joke = joke;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    
    public void addUrl() {
        this.url = "https://icanhazdadjoke.com/j/" + this.id;
    }
}
