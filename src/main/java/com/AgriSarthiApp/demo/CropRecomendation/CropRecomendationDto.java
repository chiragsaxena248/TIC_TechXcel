package com.AgriSarthiApp.demo.CropRecomendation;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

 @Component
 @Getter
 @Setter
public class CropRecomendationDto {
  private  String landSize;
  private  String farmingCity;
  private String farmingSeason;
  private String waterAvailability;
  private String soilType;
  private String demandedCrop;
 }
