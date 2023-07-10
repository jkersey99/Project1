package com.skillstorm.project.project_1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.project.project_1.models.Game;
import com.skillstorm.project.project_1.models.WarehouseInventory;

@Repository
public interface WarehouseInventoryRepository extends JpaRepository<Game, Integer> {

    public List<WarehouseInventory>findAllByWareId (int wareId);

    public List<WarehouseInventory>findAllByGameId (int gameId);

    
}
