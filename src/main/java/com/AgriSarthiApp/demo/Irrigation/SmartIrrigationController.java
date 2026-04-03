package com.AgriSarthiApp.demo.Irrigation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SmartIrrigationController {
    @Autowired
    IrrigationService irrigationService;
    @GetMapping("/smartIrrigation")
    public ResponseEntity<?> smartIrrigation(@RequestBody IrrigationDtoClass details){

        return irrigationService.getIrrigationRecommendation(details);
    }
}
