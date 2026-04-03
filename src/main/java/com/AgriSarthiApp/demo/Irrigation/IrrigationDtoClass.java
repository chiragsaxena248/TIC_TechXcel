package com.AgriSarthiApp.demo.Irrigation;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class IrrigationDtoClass {
    private String landSize;
    private String  farmingCity;
    private String  cropName;
    private String waterAvailability;
    private String sourceOfWater;
    private String whetherCondition;
    private Double temperature;
    private int humidity;
    private Double windSpeed;
    private String otherUtilityOFWater;
}
