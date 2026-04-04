package com.AgriSarthiApp.demo.CropRecomendation;

import org.springframework.stereotype.Component;

;

@Component
public class CropRecomendationUtilClass {
    public String promptCreation(CropRecomendationDto details){
        return  "Recommend me the best crops in my field for maximum yield production.Here is some info about my land:/n" +
                "Total land area(in acre/biga)="+details.getLandSize()+"/n"+
                "Farming city/Area="+details.getFarmingCity()+"/n"+
                "Farming Season="+details.getFarmingSeason()+"/n"+
                "Water availibility="+details.getWaterAvailability()+"/n"+
                "Soil Type="+details.getSoilType()+"/n"+
                "Demanded Crop="+details.getDemandedCrop()+"/n"+
                "Give reply in proper order and the language of the Response should Hindi";
    }
}
