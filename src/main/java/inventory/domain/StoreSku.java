package inventory.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A StoreSku.
 */
@Entity
@Table(name = "store_sku")
public class StoreSku implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    private Store store;

    @ManyToOne
    private Sku sku;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public StoreSku quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Store getStore() {
        return store;
    }

    public StoreSku store(Store store) {
        this.store = store;
        return this;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Sku getSku() {
        return sku;
    }

    public StoreSku sku(Sku sku) {
        this.sku = sku;
        return this;
    }

    public void setSku(Sku sku) {
        this.sku = sku;
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
        StoreSku storeSku = (StoreSku) o;
        if (storeSku.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storeSku.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StoreSku{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
