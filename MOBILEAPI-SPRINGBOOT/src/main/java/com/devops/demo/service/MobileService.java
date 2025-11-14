package com.devops.demo.service;

import java.util.List;
import com.devops.demo.model.Mobile;

public interface MobileService
{
    Mobile addMobile(Mobile mobile);
    List<Mobile> getAllMobiles();
    Mobile getMobileById(int id);
    Mobile updateMobile(Mobile mobile);
    void deleteMobileById(int id);
}
