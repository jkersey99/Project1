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

    // used for updating a warehouse's max inventory. Currently unused and rolled into general PUT, but left because it might be useful down the road
    @Query("update Warehouse w set w.maxInv = :max_inv where id = :ware_id")
    @Modifying
    @Transactional
    public int updateWarehouseMaxInv(@Param("ware_id") int id, @Param("max_inv") int newMax);
    

    public List<Warehouse> findAllByCity(City city); 

    // native query to reset the serial sequence, that way deleting a warehouse will allow the id to be reused and not increment forever. 
    // also helps with not having id gaps during front end fetches
    @Query(value="select setval(pg_get_serial_sequence('warehouses', 'ware_id'), coalesce (max(ware_id)+1, 1), false) from warehouses", nativeQuery = true)
    public long resetWarehouseSerial();

    // find all warehouses ordered y their id
    @Query(value="select * from warehouses order by ware_id", nativeQuery = true)
    public List<Warehouse> findAllOrderByIdAsc(); 

    // native delete query. normal delete was not functioning, however this native one works
    @Query(value="delete from warehouses where ware_id = ?1", nativeQuery = true)
    @Modifying
    @Transactional
    public void deleteWarehouse(@Param("ware_id") int wareId);
}   
