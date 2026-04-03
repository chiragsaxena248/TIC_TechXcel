package com.AgriSarthiApp.demo.WheatherApi;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WhetherApiService {
    private final WebClient webClient;
    private String apiKey;
   public WhetherApiService(
            WebClient.Builder builder,
           @Value("${weather.api.key}")
           String apiKey,
            @Value("${weather.api.base-url}")
            String baseURl ){
       this.webClient=builder.baseUrl(baseURl).build();
       this.apiKey=apiKey;}


    public ResponseEntity<?> getWeatherByCity(String city) {
        try {

            return ResponseEntity.ok(
                    webClient.get()
                            .uri(uriBuilder -> uriBuilder.queryParam("q", city)
                                    .queryParam("appid", apiKey)
                                    .queryParam("units", "metric")
                                    .build())
                            .retrieve()
                            .bodyToMono(String.class)
                            .block());


        } catch (Exception e) {
            return ResponseEntity.status(500).body("Something Went Wrong:Reason:" + e.getLocalizedMessage());
        }
    }
}