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

    // Checks to make sure the warehouse exists before returning it
    public List<WarehouseInventory> findAllByWareId(int wareId) {
        List<WarehouseInventory> inventory = warehouseInvetoryRepository.findAllByWareId(wareId);

        if(!inventory.isEmpty()) {
            return inventory;
        }
        return null;
    }
    // Checks to make sure the warehouse exists before returning it
        public List<WarehouseInventory> findAllByGameId(int gameId) {
        List<WarehouseInventory> inventory = warehouseInvetoryRepository.findAllByGameId(gameId);

        if(!inventory.isEmpty()) {
            return inventory;
        }
        return null;
    }

    public int newInventory(int wareId, int gameId, int quantity) {
        return warehouseInvetoryRepository.newInventory(wareId, gameId, quantity);
    }

    public int updateInventory(int wareId, int gameId, int quantity) {
        return warehouseInvetoryRepository.updateInventory(wareId, gameId, quantity);
    }

    public void deleteInventory(WarehouseInventory inventory) {
        warehouseInvetoryRepository.delete(inventory);
    }
    
    
}
