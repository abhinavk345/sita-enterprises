package com.maa.sita.enterprises.controller;

import com.maa.sita.enterprises.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String paymentMethod = request.get("paymentMethod");

        orderService.placeOrder(email, paymentMethod);

        return ResponseEntity.ok("Order Placed");
    }
}