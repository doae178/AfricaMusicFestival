package com.user_service.user_service.controller;

import com.user_service.user_service.dto.AuthResponse;
import com.user_service.user_service.dto.LoginRequest;
import com.user_service.user_service.dto.RegisterRequest;
import com.user_service.user_service.model.User;
import com.user_service.user_service.security.JwtUtil;
import com.user_service.user_service.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Use email for authentication
        User user = userService.login(
                request.getUsername(),  // This can still be the username (email) passed in the request
                request.getPassword()
        );

        // Generate token for the user
        String token = jwtUtil.generateToken(user.getId(), user.getEmail()); // Use email here instead of username

        return ResponseEntity.ok(new AuthResponse(token));
    }


    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        // Créez un utilisateur à partir des données du formulaire
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());

        // Enregistrer l'utilisateur dans la base de données
        newUser = userService.registerUser(newUser);

        return ResponseEntity.ok(newUser);
    }
}
