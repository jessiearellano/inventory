package inventory.repository;

import inventory.domain.Store;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Store entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

}
