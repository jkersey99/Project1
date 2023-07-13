package com.skillstorm.project.project_1.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.CompositeId;
import com.skillstorm.project.project_1.models.WarehouseInventory;

@Repository
public interface WarehouseInventoryRepository extends JpaRepository<WarehouseInventory, CompositeId> {

    @Query(value = "select * from ware_inv where ware_id = ?1 order by game_id", nativeQuery=true)
    public List<WarehouseInventory>findAllByWareId (@Param("ware_id") Integer wareId);

    @Query(value = "select * from ware_inv where game_id = ?1 order by ware_id", nativeQuery=true)
    public List<WarehouseInventory>findAllByGameId (@Param("game_id") Integer gameId);

    @Query(value = "update ware_inv set quantity = ?3 where ware_id = ?1 and game_id = ?2", nativeQuery=true)
    @Modifying
    @Transactional
    public int updateInventory(@Param("ware_id") int wareId, @Param("game_id") int gameId, @Param("quantity") int quantity);

    @Query(value = "insert into ware_inv values (?1, ?2, ?3)", nativeQuery=true)
    @Modifying
    @Transactional
    public int newInventory(@Param("ware_id") int wareId, @Param("game_id") int gameId, @Param("quantity") int quantity);

    
}
