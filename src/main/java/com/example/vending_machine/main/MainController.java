package com.example.vending_machine.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/item")
    public String item(){
        return "item/item";
    }

    @GetMapping("/items")
    public String items(){
        return "item/items";
    }

    @GetMapping("/itemDetails")
    public String itemDetails(){
        return "item/itemDetails";
    }

    @GetMapping("/admin")
    public String admin(){
        return "item/admin";
    }

}
