package com.AgriSarthiApp.demo.DiseaseDetection;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Setter
@Getter
public class CropDiseaseDetectionDto {
    private String cropName;
    private String description;
}
