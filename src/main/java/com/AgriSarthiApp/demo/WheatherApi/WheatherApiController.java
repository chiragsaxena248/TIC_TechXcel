package com.AgriSarthiApp.demo.WheatherApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class WheatherApiController {
    @Autowired
    WhetherApiService service;
    @GetMapping("/wheatherInfo")
    public ResponseEntity<?> getWhetherInfo(@RequestBody WeatherDto city){
        System.out.println("city="+city.getCity());
        return service.getWeatherByCity(city.getCity());
    }
}
