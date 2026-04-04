package com.AgriSarthiApp.demo.CropRecomendation;

import com.AgriSarthiApp.demo.LLMModule.LLmModelServiceClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CropRecomendationService {
    @Autowired
    LLmModelServiceClass lLmModelServiceClass;
    public ResponseEntity<?> getCropRecommendation(String prompt) {
        return lLmModelServiceClass.askLLM(prompt);

    }
}
