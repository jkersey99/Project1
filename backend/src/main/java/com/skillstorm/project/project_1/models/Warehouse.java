package com.skillstorm.project.project_1.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

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

    @Column(name="max_inv")
    @Max(3000)
    @Min(1)
    private int maxInv;

    @ManyToOne
    @JoinColumn(name="city")
    private City city;

    public Warehouse() {
    }

    public Warehouse(int id, String name, String manager, @Max(3000) @Min(1) int maxInv, City city) {
        this.id = id;
        this.name = name;
        this.manager = manager;
        this.maxInv = maxInv;
        this.city = city;
    }

    public Warehouse(String name, String manager, @Max(3000) @Min(1) int maxInv, City city) {
        this.name = name;
        this.manager = manager;
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((manager == null) ? 0 : manager.hashCode());
        result = prime * result + maxInv;
        result = prime * result + ((city == null) ? 0 : city.hashCode());
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
        if (maxInv != other.maxInv)
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Warehouse [id=" + id + ", name=" + name + ", manager=" + manager + ", maxInv=" + maxInv + ", city="
                + city + "]";
    }

}
