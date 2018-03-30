package inventory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Sku.
 */
@Entity
@Table(name = "sku")
public class Sku implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sku_id", nullable = false)
    private String skuId;

    @Column(name = "name")
    private String name;

    @Column(name = "uom")
    private String uom;

    @Column(name = "units_per_uom")
    private Integer unitsPerUom;

    @Column(name = "category")
    private String category;

    @Column(name = "jhi_cost")
    private Double cost;

    @Column(name = "tags")
    private String tags;

    @OneToMany(mappedBy = "sku")
    @JsonIgnore
    private Set<StoreSku> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkuId() {
        return skuId;
    }

    public Sku skuId(String skuId) {
        this.skuId = skuId;
        return this;
    }

    public void setSkuId(String skuId) {
        this.skuId = skuId;
    }

    public String getName() {
        return name;
    }

    public Sku name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUom() {
        return uom;
    }

    public Sku uom(String uom) {
        this.uom = uom;
        return this;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Integer getUnitsPerUom() {
        return unitsPerUom;
    }

    public Sku unitsPerUom(Integer unitsPerUom) {
        this.unitsPerUom = unitsPerUom;
        return this;
    }

    public void setUnitsPerUom(Integer unitsPerUom) {
        this.unitsPerUom = unitsPerUom;
    }

    public String getCategory() {
        return category;
    }

    public Sku category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getCost() {
        return cost;
    }

    public Sku cost(Double cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public String getTags() {
        return tags;
    }

    public Sku tags(String tags) {
        this.tags = tags;
        return this;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Set<StoreSku> getItems() {
        return items;
    }

    public Sku items(Set<StoreSku> storeSkus) {
        this.items = storeSkus;
        return this;
    }

    public Sku addItem(StoreSku storeSku) {
        this.items.add(storeSku);
        storeSku.setSku(this);
        return this;
    }

    public Sku removeItem(StoreSku storeSku) {
        this.items.remove(storeSku);
        storeSku.setSku(null);
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
        Sku sku = (Sku) o;
        if (sku.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sku.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sku{" +
            "id=" + getId() +
            ", skuId='" + getSkuId() + "'" +
            ", name='" + getName() + "'" +
            ", uom='" + getUom() + "'" +
            ", unitsPerUom=" + getUnitsPerUom() +
            ", category='" + getCategory() + "'" +
            ", cost=" + getCost() +
            ", tags='" + getTags() + "'" +
            "}";
    }
}
