package com.devops.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.devops.demo.model.Mobile;

@Repository
public interface MobileRepository extends JpaRepository<Mobile, Integer> 
{
    Mobile findByBrand(String brand);
    Mobile findByModel(String model);
}
