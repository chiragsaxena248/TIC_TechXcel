package com.AgriSarthiApp.demo.Login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;



@Service
public class RegistrationService {
    @Autowired
    RegistrationRepo registrationRepo;
    public ResponseEntity<?> registerUser(@RequestBody UserPojo user){
        if(user.getName().isBlank()|| user.getMobileNo().isBlank()){
            return ResponseEntity.status(401).body("Please enter all Fields");
        }

      if(registrationRepo.existsById(user.getMobileNo())) return ResponseEntity.status(401).body("User already Exist:");
      registrationRepo.save(user);

      return ResponseEntity.ok("Success,welcomee to agriSarthi:");
    }

    public ResponseEntity<?> loginUser(@RequestBody LoginDtoClass userlogin){

        if(!registrationRepo.existsById(userlogin.getMobileNo())) return ResponseEntity.status(401).body("User not exists:");
         else{return  ResponseEntity.ok("Welcomeback user:");}


    }
}

