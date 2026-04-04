package com.AgriSarthiApp.demo.Login;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {
    @Id
    private String mobileNo;
    private String Name;
    private  String adress;
    private String password;
    private String landInAcre;

}
