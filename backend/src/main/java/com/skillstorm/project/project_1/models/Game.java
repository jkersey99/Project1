package com.skillstorm.project.project_1.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @Column(name = "game_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String title;
    
    @Column(name = "release_date")
    private String releaseDate;

    @Column
    private String platform;

    @Column
    private String genre;

    @Column
    private String description;

    @Column
    private String publisher;

    @Column (name = "buy_price")
    private double price;

    @Column
    private String image;

    @JsonBackReference
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "game")
    private List<WarehouseInventory> inventory;

    public Game() {
    }

    // constructor without an id
    public Game(String title, String releaseDate, String platform, String genre, String description, String publisher,
            double price, String image) {
        this.title = title;
        this.releaseDate = releaseDate;
        this.platform = platform;
        this.genre = genre;
        this.description = description;
        this.publisher = publisher;
        this.price = price;
        this.image = image;
    }

    // full constructor
    public Game(int id, String title, String releaseDate, String platform, String genre, String description,
            String publisher, double price, String image) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.platform = platform;
        this.genre = genre;
        this.description = description;
        this.publisher = publisher;
        this.price = price;
        this.image = image;
    }

    //Getters, Setters, hashCode, equals, toString

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((releaseDate == null) ? 0 : releaseDate.hashCode());
        result = prime * result + ((platform == null) ? 0 : platform.hashCode());
        result = prime * result + ((genre == null) ? 0 : genre.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((publisher == null) ? 0 : publisher.hashCode());
        long temp;
        temp = Double.doubleToLongBits(price);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + ((image == null) ? 0 : image.hashCode());
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
        Game other = (Game) obj;
        if (id != other.id)
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (releaseDate == null) {
            if (other.releaseDate != null)
                return false;
        } else if (!releaseDate.equals(other.releaseDate))
            return false;
        if (platform == null) {
            if (other.platform != null)
                return false;
        } else if (!platform.equals(other.platform))
            return false;
        if (genre == null) {
            if (other.genre != null)
                return false;
        } else if (!genre.equals(other.genre))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (publisher == null) {
            if (other.publisher != null)
                return false;
        } else if (!publisher.equals(other.publisher))
            return false;
        if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
            return false;
        if (image == null) {
            if (other.image != null)
                return false;
        } else if (!image.equals(other.image))
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
        return "Game [id=" + id + ", title=" + title + ", releaseDate=" + releaseDate + ", platform=" + platform
                + ", genre=" + genre + ", description=" + description + ", publisher=" + publisher + ", price=" + price
                + ", image=" + image + ", inventory=" + inventory + "]";
    }
}
