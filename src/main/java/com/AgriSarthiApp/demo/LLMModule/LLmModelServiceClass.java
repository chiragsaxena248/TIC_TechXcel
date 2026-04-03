package com.AgriSarthiApp.demo.LLMModule;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class LLmModelServiceClass {
    private final WebClient webClient;
    private final String apiKeys;
    public LLmModelServiceClass (
            WebClient.Builder builder,
            @Value("${llm.api.key}")
            String apiKey,
            @Value("${llm.api.url}")
            String baseURl ){
        this.webClient=builder.baseUrl(baseURl).build();
        this.apiKeys=apiKey;
    }
    public ResponseEntity<?> askLLM(String prompt){
        try {


        String requestBody = """
        {
          "model": "Llama-3.3-Swallow-70B-Instruct-v0.4",
          "messages": [
            {"role": "user", "content": "%s"}
          ]
        }
        """.formatted(prompt);
        return  ResponseEntity.ok(webClient.post()

                .header("Authorization","Bearer "+apiKeys)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block());
    }catch (Exception e){
            return ResponseEntity.status(500).body("something Went wrong:"+e.getLocalizedMessage());
        }
}}
