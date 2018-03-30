package inventory.repository;

import inventory.domain.StoreSku;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the StoreSku entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoreSkuRepository extends JpaRepository<StoreSku, Long> {

}
