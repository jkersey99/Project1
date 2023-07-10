package com.skillstorm.project.project_1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project.project_1.models.WarehouseInventory;
import com.skillstorm.project.project_1.repositories.WarehouseInventoryRepository;

@Service
public class WarehouseInventoryService {

    @Autowired
    WarehouseInventoryRepository warehouseInvetoryRepository;

    public List<WarehouseInventory> findAllByWareId(int wareId) {
        List<WarehouseInventory> inventory = warehouseInvetoryRepository.findAllByWareId(wareId);

        if(!inventory.isEmpty()) {
            return inventory;
        }
        return null;
    }
        
        public List<WarehouseInventory> findAllByGameId(int gameId) {
        List<WarehouseInventory> inventory = warehouseInvetoryRepository.findAllByGameId(gameId);

        if(!inventory.isEmpty()) {
            return inventory;
        }
        return null;
    }
    
    
}
