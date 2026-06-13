package com.ecommerce.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;

@RestController
@RequestMapping("/api")
public class GatewayController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("${product.service.url}")
    private String productServiceUrl;
    
    @Value("${order.service.url}")
    private String orderServiceUrl;
    
    @Value("${user.service.url}")
    private String userServiceUrl;
    
    // Product Service Routes
    @RequestMapping(value = "/products/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<?> productProxy(HttpServletRequest request, @RequestBody(required = false) Object body) {
        return forwardRequest(request, body, productServiceUrl);
    }
    
    // Order Service Routes
    @RequestMapping(value = "/orders/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<?> orderProxy(HttpServletRequest request, @RequestBody(required = false) Object body) {
        return forwardRequest(request, body, orderServiceUrl);
    }
    
    // User Service Routes
    @RequestMapping(value = "/users/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<?> userProxy(HttpServletRequest request, @RequestBody(required = false) Object body) {
        return forwardRequest(request, body, userServiceUrl);
    }
    
    private ResponseEntity<?> forwardRequest(HttpServletRequest request, Object body, String serviceUrl) {
        try {
            String path = request.getRequestURI();
            String queryString = request.getQueryString();
            String targetUrl = serviceUrl + path + (queryString != null ? "?" + queryString : "");
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<?> entity = new HttpEntity<>(body, headers);
            
            ResponseEntity<?> response = restTemplate.exchange(
                URI.create(targetUrl),
                HttpMethod.valueOf(request.getMethod()),
                entity,
                Object.class
            );
            
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error forwarding request: " + e.getMessage());
        }
    }
}
