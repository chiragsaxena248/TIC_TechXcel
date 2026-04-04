package com.AgriSarthiApp.demo.DiseaseDetection;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class DiseaseDetectionUtilMethods {
    public String prompt(MultipartFile imageFile,CropDiseaseDetectionDto details){
        return "Provie me the information about the crop disease and also tell it's Solution"+
                "Here is the photo of the image:"+ imageFile+
                "Crop Name="+details.getCropName()
                +"Crop description:"+details.getDescription();
    }
}
