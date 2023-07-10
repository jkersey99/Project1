package com.skillstorm.project.project_1.models;

import java.io.Serializable;

public class CompositeId implements Serializable{
    private Warehouse warehouse;
    private Game game;
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

}