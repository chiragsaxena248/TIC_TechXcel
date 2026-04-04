package com.AgriSarthiApp.demo.DiseaseDetection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

@RestController
public class DiseaseDetectionController {
    @Autowired
    DiseaseDetectionService diseaseDetectionService;
    @Autowired
    DiseaseDetectionUtilMethods utilMethods;

//    @GetMapping("/CropDiseaseDetection")
//    public ResponseEntity<?> cropDiseaseDetection(@RequestParam MultipartFile imageFile){
//        System.out.println("Prompt:"+Response);
////       String prompt= utilMethods.prompt(imageFile);
//        return diseaseDetectionService.getDiseaseInfo(Response);
//    }
@GetMapping("/cropDiseaseDetection")
    public ResponseEntity<?> cropDiseaseDetection(@RequestParam("imageFile")MultipartFile imageFile ,@RequestParam("croupDetails")String detials) throws  Exception{
    ObjectMapper mapper=new ObjectMapper();
    CropDiseaseDetectionDto  croupDetails=mapper.readValue(detials, CropDiseaseDetectionDto.class);
    System.out.println("Croup name"+croupDetails);
    String prompt=utilMethods.prompt(imageFile,croupDetails);

    return diseaseDetectionService.getDiseaseInfo(prompt);
}
}
