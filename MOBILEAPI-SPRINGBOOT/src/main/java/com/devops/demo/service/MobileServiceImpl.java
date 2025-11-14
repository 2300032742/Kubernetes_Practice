package com.devops.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devops.demo.model.Mobile;
import com.devops.demo.repository.MobileRepository;

@Service
public class MobileServiceImpl implements MobileService {

    @Autowired
    private MobileRepository mobileRepository;

    @Override
    public Mobile addMobile(Mobile mobile) {
        return mobileRepository.save(mobile);
    }

    @Override
    public List<Mobile> getAllMobiles() {
        return mobileRepository.findAll();
    }

    @Override
    public Mobile getMobileById(int id) {
        Optional<Mobile> opt = mobileRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Mobile updateMobile(Mobile mobile) {
        return mobileRepository.save(mobile);
    }

    @Override
    public void deleteMobileById(int id) {
        mobileRepository.deleteById(id);
    }
}
