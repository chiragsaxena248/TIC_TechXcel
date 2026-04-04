package com.AgriSarthiApp.demo.Login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {
    @Autowired
    RegistrationService registrationService;
    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@RequestBody UserPojo newUser){
         return registrationService.registerUser(newUser);
    }

    @GetMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody UserPojo user){
        return registrationService.loginUser(user);
    }

}
