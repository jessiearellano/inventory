package inventory.web.rest;

import com.codahale.metrics.annotation.Timed;
import inventory.domain.StoreSku;

import inventory.repository.StoreSkuRepository;
import inventory.web.rest.errors.BadRequestAlertException;
import inventory.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StoreSku.
 */
@RestController
@RequestMapping("/api")
public class StoreSkuResource {

    private final Logger log = LoggerFactory.getLogger(StoreSkuResource.class);

    private static final String ENTITY_NAME = "storeSku";

    private final StoreSkuRepository storeSkuRepository;

    public StoreSkuResource(StoreSkuRepository storeSkuRepository) {
        this.storeSkuRepository = storeSkuRepository;
    }

    /**
     * POST  /store-skus : Create a new storeSku.
     *
     * @param storeSku the storeSku to create
     * @return the ResponseEntity with status 201 (Created) and with body the new storeSku, or with status 400 (Bad Request) if the storeSku has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/store-skus")
    @Timed
    public ResponseEntity<StoreSku> createStoreSku(@RequestBody StoreSku storeSku) throws URISyntaxException {
        log.debug("REST request to save StoreSku : {}", storeSku);
        if (storeSku.getId() != null) {
            throw new BadRequestAlertException("A new storeSku cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StoreSku result = storeSkuRepository.save(storeSku);
        return ResponseEntity.created(new URI("/api/store-skus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /store-skus : Updates an existing storeSku.
     *
     * @param storeSku the storeSku to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated storeSku,
     * or with status 400 (Bad Request) if the storeSku is not valid,
     * or with status 500 (Internal Server Error) if the storeSku couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/store-skus")
    @Timed
    public ResponseEntity<StoreSku> updateStoreSku(@RequestBody StoreSku storeSku) throws URISyntaxException {
        log.debug("REST request to update StoreSku : {}", storeSku);
        if (storeSku.getId() == null) {
            return createStoreSku(storeSku);
        }
        StoreSku result = storeSkuRepository.save(storeSku);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, storeSku.getId().toString()))
            .body(result);
    }

    /**
     * GET  /store-skus : get all the storeSkus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of storeSkus in body
     */
    @GetMapping("/store-skus")
    @Timed
    public List<StoreSku> getAllStoreSkus() {
        log.debug("REST request to get all StoreSkus");
        return storeSkuRepository.findAll();
        }

    /**
     * GET  /store-skus/:id : get the "id" storeSku.
     *
     * @param id the id of the storeSku to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the storeSku, or with status 404 (Not Found)
     */
    @GetMapping("/store-skus/{id}")
    @Timed
    public ResponseEntity<StoreSku> getStoreSku(@PathVariable Long id) {
        log.debug("REST request to get StoreSku : {}", id);
        StoreSku storeSku = storeSkuRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(storeSku));
    }

    /**
     * DELETE  /store-skus/:id : delete the "id" storeSku.
     *
     * @param id the id of the storeSku to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/store-skus/{id}")
    @Timed
    public ResponseEntity<Void> deleteStoreSku(@PathVariable Long id) {
        log.debug("REST request to delete StoreSku : {}", id);
        storeSkuRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
