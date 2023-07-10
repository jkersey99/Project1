package com.skillstorm.project.project_1.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.City;
import com.skillstorm.project.project_1.models.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer>{

    @Query("update Warehouse w set w.maxInv = :max_inv where id = :ware_id")
    @Modifying
    @Transactional
    public int updateWarehouseMaxInv(@Param("ware_id") int id, @Param("max_inv") int newMax);
    

    public List<Warehouse> findAllByCity(City city); 

    @Query(value="select setval(pg_get_serial_sequence('warehouses', 'ware_id'), coalesce (max(ware_id)+1, 1), false) from warehouses", nativeQuery = true)
    public long resetWarehouseSerial();


}
