package inventory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Store.
 */
@Entity
@Table(name = "store")
public class Store implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "store_id", nullable = false)
    private String storeId;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "store_number")
    private String storeNumber;

    @OneToMany(mappedBy = "store")
    @JsonIgnore
    private Set<StoreSku> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStoreId() {
        return storeId;
    }

    public Store storeId(String storeId) {
        this.storeId = storeId;
        return this;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public String getName() {
        return name;
    }

    public Store name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Store phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStoreNumber() {
        return storeNumber;
    }

    public Store storeNumber(String storeNumber) {
        this.storeNumber = storeNumber;
        return this;
    }

    public void setStoreNumber(String storeNumber) {
        this.storeNumber = storeNumber;
    }

    public Set<StoreSku> getItems() {
        return items;
    }

    public Store items(Set<StoreSku> storeSkus) {
        this.items = storeSkus;
        return this;
    }

    public Store addItem(StoreSku storeSku) {
        this.items.add(storeSku);
        storeSku.setStore(this);
        return this;
    }

    public Store removeItem(StoreSku storeSku) {
        this.items.remove(storeSku);
        storeSku.setStore(null);
        return this;
    }

    public void setItems(Set<StoreSku> storeSkus) {
        this.items = storeSkus;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Store store = (Store) o;
        if (store.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), store.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Store{" +
            "id=" + getId() +
            ", storeId='" + getStoreId() + "'" +
            ", name='" + getName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", storeNumber='" + getStoreNumber() + "'" +
            "}";
    }
}
