package com.devops.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.devops.demo.model.Mobile;
import com.devops.demo.service.MobileService;

@RestController
@RequestMapping("/api/mobiles")
@CrossOrigin(origins = "*")
public class MobileController {

    @Autowired
    private MobileService mobileService;

    @GetMapping("/")
    public String home() {
        return "Mobile API Demo";
    }

    @PostMapping("/add")
    public ResponseEntity<Mobile> addMobile(@RequestBody Mobile mobile) {
        Mobile savedMobile = mobileService.addMobile(mobile);
        return new ResponseEntity<>(savedMobile, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Mobile>> getAllMobiles() {
        List<Mobile> mobiles = mobileService.getAllMobiles();
        return new ResponseEntity<>(mobiles, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMobileById(@PathVariable int id) {
        Mobile mobile = mobileService.getMobileById(id);
        if (mobile != null) {
            return new ResponseEntity<>(mobile, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Mobile with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMobile(@RequestBody Mobile mobile) {
        Mobile existing = mobileService.getMobileById(mobile.getId());
        if (existing != null) {
            Mobile updatedMobile = mobileService.updateMobile(mobile);
            return new ResponseEntity<>(updatedMobile, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Mobile with ID " + mobile.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMobile(@PathVariable int id) {
        Mobile existing = mobileService.getMobileById(id);
        if (existing != null) {
            mobileService.deleteMobileById(id);
            return new ResponseEntity<>("Mobile with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Mobile with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }

    }
}
