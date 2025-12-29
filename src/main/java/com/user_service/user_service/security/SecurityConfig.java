package com.user_service.user_service.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Configuration de la sécurité
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()  // Désactivation de CSRF pour l'API REST
                .authorizeRequests()
                .antMatchers("/api/users/register", "/api/users/login").permitAll()  // Autoriser l'accès à l'inscription et à la connexion
                .anyRequest().authenticated();  // Toute autre requête doit être authentifiée

        return http.build();
    }
    // Bean pour encoder les mots de passe
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Utilisation de BCrypt pour le hachage des mots de passe
    }
}





