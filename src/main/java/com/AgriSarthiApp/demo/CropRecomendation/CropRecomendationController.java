package com.AgriSarthiApp.demo.CropRecomendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CropRecomendationController {
    @Autowired
    CropRecomendationService cropRecomendationService;
    @Autowired
    CropRecomendationUtilClass utilClass;
    @GetMapping("/getCropRecomendation")
    public ResponseEntity<?> cropRecommendation(@RequestBody CropRecomendationDto details){
        return cropRecomendationService.getCropRecommendation(utilClass.promptCreation(details));
    }
}
