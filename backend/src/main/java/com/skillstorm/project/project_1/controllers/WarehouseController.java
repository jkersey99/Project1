package com.skillstorm.project.project_1.controllers;

public class WarehouseController {

    @Autowired
    WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.findAllWarehouses();
        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Warehouse> findWarehouseById(@PathVariable int id) {
        Warehouse warehouse = warehouseService.findWarehouseById(id);
        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }

    @GetMapping("/city")
    public ResponseEntity<List<Warehouse>> findWarehousesByCity(@RequestParam("city") String city) {
        List<Warehouse> warehouses = warehouseService.findWarehousesByCity(city);
        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Warehouse> createWarehouse(@Valid @RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.CREATED);
    }

    @PutMapping("/warehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.OK);

    }

    @DeleteMapping
    public ResponseEntity<Warehouse> deleteWarehouse(@RequestBody Warehouse warehouse) {
        warehouseService.deleteWarehouse(warehouse);
        return ResponseEntity.noContent().build();
    }
}
