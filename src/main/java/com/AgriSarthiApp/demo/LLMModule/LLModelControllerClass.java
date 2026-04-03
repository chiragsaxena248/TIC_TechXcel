package com.AgriSarthiApp.demo.LLMModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class LLModelControllerClass {
    @Autowired
    LLmModelServiceClass serviceClass;
    @GetMapping("/askChatGpt")
    public ResponseEntity<?> askLLm(@RequestBody LLmModelDto prompt){
        System.out.println("prompt="+prompt.getPrompt());
        return  serviceClass.askLLM(prompt.getPrompt());
    }
}
