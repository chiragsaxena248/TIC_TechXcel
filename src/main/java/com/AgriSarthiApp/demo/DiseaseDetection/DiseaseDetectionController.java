package com.AgriSarthiApp.demo.DiseaseDetection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class DiseaseDetectionController {
    @GetMapping("/CropDiseaseDetection")
    public ResponseEntity<?> cropDisaeseDetection(@RequestParam MultipartFile imageFile){
        return  null;
    }

}
