package com.AgriSarthiApp.demo.Irrigation;

import com.AgriSarthiApp.demo.LLMModule.LLmModelServiceClass;
import com.AgriSarthiApp.demo.WheatherApi.WhetherApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.Objects;

@Service
public class IrrigationService {
    @Autowired
    IrrigationUtilMethods utilMethods;
    @Autowired
    WhetherApiService whetherApiService;
    @Autowired
    LLmModelServiceClass lLmModelServiceClass;

    public ResponseEntity<?> getIrrigationRecommendation(IrrigationDtoClass details) {
        String whether= Objects.requireNonNull(whetherApiService.getWeatherByCity(details.getFarmingCity()).getBody()).toString();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(whether);
        double temp = root.path("main").path("temp").asDouble();
        int humidity = root.path("main").path("humidity").asInt();
        String condition = root.path("weather").get(0).path("main").toString();
        double windSpeed = root.path("wind").path("speed").asDouble();

        details.setTemperature(temp);
        details.setHumidity(humidity);
        details.setWhetherCondition(condition);
        details.setWindSpeed(windSpeed);
//        System.out.println("temperature="+temp);
//        System.out.println("humidity:"+humidity);
//        System.out.println("condition:"+condition);
//        System.out.println("windSpeed"+windSpeed);



        String prompt=utilMethods.createPrompt(details);
        return lLmModelServiceClass.askLLM(prompt);
    }
}
