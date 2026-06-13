package com.ecommerce.order.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class ProductClient {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("${product.service.url:http://product-service:8081}")
    private String productServiceUrl;
    
    public boolean updateStock(Long productId, Integer quantity) {
        try {
            String url = productServiceUrl + "/api/products/" + productId + "/stock";
            Map<String, Integer> request = Map.of("quantity", quantity);
            
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.postForObject(url, request, Map.class);
            
            return response != null && Boolean.TRUE.equals(response.get("success"));
        } catch (Exception e) {
            return false;
        }
    }
}
