package com.user_service.user_service.service;

import com.user_service.user_service.model.User;
import com.user_service.user_service.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection for UserRepository and PasswordEncoder
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register method for creating a new user
    public User registerUser(User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        // Secure the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set a default role (USER)
        user.setRole("USER");

        // Save the user to the database
        return userRepository.save(user);
    }

    // Login method for user authentication
    public User login(String username, String rawPassword) {

        // Find user by email (username)
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the password matches (after encoding)
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

    // Find user by email (username) method
    public User findByUsername(String username) {
        Optional<User> user = userRepository.findByEmail(username);  // Using findByEmail
        return user.orElse(null);
    }
}
