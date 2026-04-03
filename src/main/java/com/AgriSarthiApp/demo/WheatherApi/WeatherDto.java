package com.AgriSarthiApp.demo.WheatherApi;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class WeatherDto {
    private String city;
}
