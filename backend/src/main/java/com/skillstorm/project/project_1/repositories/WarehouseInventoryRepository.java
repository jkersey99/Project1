package com.skillstorm.project.project_1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.CompositeId;
import com.skillstorm.project.project_1.models.WarehouseInventory;

@Repository
public interface WarehouseInventoryRepository extends JpaRepository<WarehouseInventory, CompositeId> {

    @Query(value = "select * from ware_inv where ware_id = ?1", nativeQuery=true)
    public List<WarehouseInventory>findAllByWareId (@Param("ware_id") Integer wareId);

    @Query(value = "select * from ware_inv where game_id = ?1", nativeQuery=true)
    public List<WarehouseInventory>findAllByGameId (@Param("game_id") Integer gameId);

    
}
