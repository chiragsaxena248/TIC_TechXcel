package com.AgriSarthiApp.demo.Irrigation;

import org.springframework.stereotype.Component;

@Component
public class IrrigationUtilMethods {
    public String createPrompt(IrrigationDtoClass details) {
        return "How can I Irrigate my field in a most efficient way so that my crops will be maximum and minimum loss of water:" +
                "Here are some information that helps you to take more predictable data "+
                "Total land area(in acre/biga)="+details.getLandSize()+
                "Farming city/Area="+details.getFarmingCity()+
                "Crop Name="+details.getCropName()+
                "Water availibility="+details.getWaterAvailability()+
                "Source of water="+details.getSourceOfWater()+
                "other Utilities of water="+details.getOtherUtilityOFWater()+
                "whether conditions="+details.getWhetherCondition()+
                "wind Speed="+details.getWindSpeed()+
                "Temperature="+details.getTemperature()+
                "humidity="+details.getHumidity()+
                "Give reply in proper order and the language of the Response should Hindi";
    }
}
