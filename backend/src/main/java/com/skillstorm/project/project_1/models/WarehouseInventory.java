package com.skillstorm.project.project_1.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


// Maps to junction table
@Entity
@Table(name="ware_inv")
@IdClass(CompositeId.class)             // IdClass needed since it has composite primary keys
public class WarehouseInventory{
    
    // Mony to One with warehouses
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ware_id")
    private Warehouse warehouse;

    // Many to One with games
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="game_id")
    private Game game;

    @Column
    private int quantity;
    
    public WarehouseInventory() {
    }

    public WarehouseInventory(Warehouse warehouse, Game game, int quantity) {
        this.warehouse = warehouse;
        this.game = game;
        this.quantity = quantity;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((warehouse == null) ? 0 : warehouse.hashCode());
        result = prime * result + ((game == null) ? 0 : game.hashCode());
        result = prime * result + quantity;
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
        WarehouseInventory other = (WarehouseInventory) obj;
        if (warehouse == null) {
            if (other.warehouse != null)
                return false;
        } else if (!warehouse.equals(other.warehouse))
            return false;
        if (game == null) {
            if (other.game != null)
                return false;
        } else if (!game.equals(other.game))
            return false;
        if (quantity != other.quantity)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "WarehouseInventory [warehouse=" + warehouse + ", game=" + game + ", quantity=" + quantity + "]";
    }
    
}
