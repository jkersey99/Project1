package com.skillstorm.project.project_1.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonBackReference;

// Maps to the warehouse table
@Entity
@Table(name="warehouses")
public class Warehouse {

    @Id
    @Column(name="ware_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="ware_name")
    private String name;

    @Column
    private String manager;

    @Column(name="curr_inv")
    @Min(0)
    private int currInv;

    @Column(name="max_inv")
    @Min(1)
    private int maxInv;

    // Many to One with the city table
    @ManyToOne
    @JoinColumn(name="city")
    private City city;

    // One to Many with the junction ta ble
    @JsonBackReference                                                  // prevents infinite recursion
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "warehouse")         // EAGER-type helped with populating the front end
    private List<WarehouseInventory> inventory;

    public Warehouse() {
    }

    public Warehouse(int id, String name, String manager, @Min(0) int currInv, @Min(1) int maxInv, City city) {
        this.id = id;
        this.name = name;
        this.manager = manager;
        this.currInv = currInv;
        this.maxInv = maxInv;
        this.city = city;
    }

    public Warehouse(String name, String manager, @Min(0) int currInv, @Min(1) int maxInv, City city) {
        this.name = name;
        this.manager = manager;
        this.currInv = currInv;
        this.maxInv = maxInv;
        this.city = city;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public int getCurrInv() {
        return currInv;
    }

    public void setCurrInv(int currInv) {
        this.currInv = currInv;
    }

    public int getMaxInv() {
        return maxInv;
    }

    public void setMaxInv(int max_inv) {
        this.maxInv = max_inv;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<WarehouseInventory> getInventory() {
        return inventory;
    }

    public void setInventory(List<WarehouseInventory> inventory) {
        this.inventory = inventory;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((manager == null) ? 0 : manager.hashCode());
        result = prime * result + currInv;
        result = prime * result + maxInv;
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((inventory == null) ? 0 : inventory.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Warehouse other = (Warehouse) obj;
        if (id != other.id)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (manager == null) {
            if (other.manager != null)
                return false;
        } else if (!manager.equals(other.manager))
            return false;
        if (currInv != other.currInv)
            return false;
        if (maxInv != other.maxInv)
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        if (inventory == null) {
            if (other.inventory != null)
                return false;
        } else if (!inventory.equals(other.inventory))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Warehouse [id=" + id + ", name=" + name + ", manager=" + manager + ", currInv=" + currInv + ", maxInv="
                + maxInv + ", city=" + city + ", inventory=" + inventory + "]";
    }
    
}
