package com.AgriSarthiApp.demo.Login;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepo extends JpaRepository<UserPojo,String> {
    boolean existsById(String s);

}
