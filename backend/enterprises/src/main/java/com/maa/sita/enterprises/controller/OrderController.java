package com.maa.sita.enterprises.controller;

import com.maa.sita.enterprises.entity.Order;
import com.maa.sita.enterprises.repository.OrderRepository;
import com.maa.sita.enterprises.service.InvoiceService;
import com.maa.sita.enterprises.service.OrderService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;
    private final InvoiceService invoiceService;
    private final OrderRepository orderRepository;

    public OrderController(OrderService orderService, InvoiceService invoiceService, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.invoiceService = invoiceService;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, String> request) throws Exception {

        String email = request.get("email");
        String paymentMethod = request.get("paymentMethod");
        Order savedOrder = orderService.placeOrderAndReturnOrder(email, paymentMethod);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", savedOrder.getId());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/invoice/{orderId}")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable Long orderId) throws Exception {

        byte[] pdf = invoiceService.generateInvoicePdf(
                orderRepository.findById(orderId).orElseThrow()
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=invoice-" + orderId + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}