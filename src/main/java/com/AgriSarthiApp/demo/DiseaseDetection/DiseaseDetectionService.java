package com.AgriSarthiApp.demo.DiseaseDetection;

import com.AgriSarthiApp.demo.LLMModule.LLmModelServiceClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class DiseaseDetectionService {
    @Autowired
    private  LLmModelServiceClass lLmModelServiceClass;
//    @Autowired
//    private  DiseaseDetectionUtilMethods utilMethods;

    public  ResponseEntity<?> getDiseaseInfo(String prompt) {
        return lLmModelServiceClass.askLLM(prompt);
    }




}
