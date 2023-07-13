package com.skillstorm.project.project_1.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.project.project_1.models.City;
import com.skillstorm.project.project_1.models.Warehouse;
import com.skillstorm.project.project_1.repositories.WarehouseRepository;

@Service
public class WarehouseService {

    @Autowired
    WarehouseRepository warehouseRepository;

    @Autowired
    CityService cityService;

    public Warehouse savedWarehouse (Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    //  calls findAll in the JpaRepository to return all warehouses
    public List<Warehouse> findAllWarehouses() {
        return warehouseRepository.findAllOrderByIdAsc();
    }

    // finds a warehouse by its id number
    public Warehouse findWarehouseById(int id) {
        Optional<Warehouse> warehouse = warehouseRepository.findById(id);
        if (warehouse.isPresent()) {                                        // checks to see if the optional was returned
            return warehouse.get();                                         //  if so returns that warehouse
        }
        return null;                                                        //  otherwise returns null
    }

    public List<Warehouse> findWarehousesByCity(String getCity) {
        City city = cityService.getCity(getCity);
        List<Warehouse> warehouses = warehouseRepository.findAllByCity(city);
        
        
        return warehouses;
        }
        

    

    public Warehouse saveWarehouse(Warehouse warehouse) {
        City city = cityService.saveCity(warehouse.getCity());
        warehouse.setCity(city);
        if (warehouse.getCurrInv() > warehouse.getMaxInv()) {
            return null;
        }
        return warehouseRepository.save(warehouse);
    }

    public int updateMaxInv (Warehouse warehouse, int newMax) {
        return warehouseRepository.updateWarehouseMaxInv(warehouse.getId(), newMax);
    }

    public void deleteWarehouse(Warehouse warehouse) {

        warehouseRepository.delete(warehouse);
        warehouseRepository.resetWarehouseSerial();
    }
    
}
