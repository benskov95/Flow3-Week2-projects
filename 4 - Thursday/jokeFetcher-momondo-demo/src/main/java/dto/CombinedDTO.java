package dto;

public class CombinedDTO {
    
    private String chuckJoke;
    private String chuckRef;
    private String dadJoke;
    private String dadRef;

    public CombinedDTO(ChuckDTO chuckDTO, DadDTO dadDTO) {
        this.chuckJoke = chuckDTO.getValue();
        this.chuckRef = chuckDTO.getUrl();
        this.dadJoke = dadDTO.getJoke();
        this.dadRef = dadDTO.getUrl();
    }

    public String getChuckJoke() {
        return chuckJoke;
    }

    public void setChuckJoke(String chuckJoke) {
        this.chuckJoke = chuckJoke;
    }

    public String getChuckRef() {
        return chuckRef;
    }

    public void setChuckRef(String chuckRef) {
        this.chuckRef = chuckRef;
    }

    public String getDadJoke() {
        return dadJoke;
    }

    public void setDadJoke(String dadJoke) {
        this.dadJoke = dadJoke;
    }

    public String getDadRef() {
        return dadRef;
    }

    public void setDadRef(String dadRef) {
        this.dadRef = dadRef;
    }
    
}
