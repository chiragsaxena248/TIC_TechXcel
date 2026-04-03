package com.AgriSarthiApp.demo.LLMModule;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            ObjectMapper mapper = new ObjectMapper();

            Map<String, Object> request = new HashMap<>();

            request.put("model", "Meta-Llama-3.1-8B-Instruct");

            Map<String, String> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            request.put("messages", List.of(message));
            request.put("temperature", 0.7);

            String requestBody = mapper.writeValueAsString(request);

//        String requestBody = """
//        {
//          "model": "Llama-3.3-Swallow-70B-Instruct-v0.4",
//          "messages": [
//            {"role": "user", "content": "%s"}
//          ]
//        }
//        """.formatted(prompt);
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
