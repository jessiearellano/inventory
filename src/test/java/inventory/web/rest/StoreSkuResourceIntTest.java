package inventory.web.rest;

import inventory.InventoryApp;

import inventory.domain.StoreSku;
import inventory.repository.StoreSkuRepository;
import inventory.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static inventory.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StoreSkuResource REST controller.
 *
 * @see StoreSkuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InventoryApp.class)
public class StoreSkuResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private StoreSkuRepository storeSkuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStoreSkuMockMvc;

    private StoreSku storeSku;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StoreSkuResource storeSkuResource = new StoreSkuResource(storeSkuRepository);
        this.restStoreSkuMockMvc = MockMvcBuilders.standaloneSetup(storeSkuResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StoreSku createEntity(EntityManager em) {
        StoreSku storeSku = new StoreSku()
            .quantity(DEFAULT_QUANTITY);
        return storeSku;
    }

    @Before
    public void initTest() {
        storeSku = createEntity(em);
    }

    @Test
    @Transactional
    public void createStoreSku() throws Exception {
        int databaseSizeBeforeCreate = storeSkuRepository.findAll().size();

        // Create the StoreSku
        restStoreSkuMockMvc.perform(post("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeSku)))
            .andExpect(status().isCreated());

        // Validate the StoreSku in the database
        List<StoreSku> storeSkuList = storeSkuRepository.findAll();
        assertThat(storeSkuList).hasSize(databaseSizeBeforeCreate + 1);
        StoreSku testStoreSku = storeSkuList.get(storeSkuList.size() - 1);
        assertThat(testStoreSku.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createStoreSkuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storeSkuRepository.findAll().size();

        // Create the StoreSku with an existing ID
        storeSku.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoreSkuMockMvc.perform(post("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeSku)))
            .andExpect(status().isBadRequest());

        // Validate the StoreSku in the database
        List<StoreSku> storeSkuList = storeSkuRepository.findAll();
        assertThat(storeSkuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStoreSkus() throws Exception {
        // Initialize the database
        storeSkuRepository.saveAndFlush(storeSku);

        // Get all the storeSkuList
        restStoreSkuMockMvc.perform(get("/api/store-skus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeSku.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void getStoreSku() throws Exception {
        // Initialize the database
        storeSkuRepository.saveAndFlush(storeSku);

        // Get the storeSku
        restStoreSkuMockMvc.perform(get("/api/store-skus/{id}", storeSku.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(storeSku.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingStoreSku() throws Exception {
        // Get the storeSku
        restStoreSkuMockMvc.perform(get("/api/store-skus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStoreSku() throws Exception {
        // Initialize the database
        storeSkuRepository.saveAndFlush(storeSku);
        int databaseSizeBeforeUpdate = storeSkuRepository.findAll().size();

        // Update the storeSku
        StoreSku updatedStoreSku = storeSkuRepository.findOne(storeSku.getId());
        // Disconnect from session so that the updates on updatedStoreSku are not directly saved in db
        em.detach(updatedStoreSku);
        updatedStoreSku
            .quantity(UPDATED_QUANTITY);

        restStoreSkuMockMvc.perform(put("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStoreSku)))
            .andExpect(status().isOk());

        // Validate the StoreSku in the database
        List<StoreSku> storeSkuList = storeSkuRepository.findAll();
        assertThat(storeSkuList).hasSize(databaseSizeBeforeUpdate);
        StoreSku testStoreSku = storeSkuList.get(storeSkuList.size() - 1);
        assertThat(testStoreSku.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingStoreSku() throws Exception {
        int databaseSizeBeforeUpdate = storeSkuRepository.findAll().size();

        // Create the StoreSku

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStoreSkuMockMvc.perform(put("/api/store-skus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(storeSku)))
            .andExpect(status().isCreated());

        // Validate the StoreSku in the database
        List<StoreSku> storeSkuList = storeSkuRepository.findAll();
        assertThat(storeSkuList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteStoreSku() throws Exception {
        // Initialize the database
        storeSkuRepository.saveAndFlush(storeSku);
        int databaseSizeBeforeDelete = storeSkuRepository.findAll().size();

        // Get the storeSku
        restStoreSkuMockMvc.perform(delete("/api/store-skus/{id}", storeSku.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StoreSku> storeSkuList = storeSkuRepository.findAll();
        assertThat(storeSkuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoreSku.class);
        StoreSku storeSku1 = new StoreSku();
        storeSku1.setId(1L);
        StoreSku storeSku2 = new StoreSku();
        storeSku2.setId(storeSku1.getId());
        assertThat(storeSku1).isEqualTo(storeSku2);
        storeSku2.setId(2L);
        assertThat(storeSku1).isNotEqualTo(storeSku2);
        storeSku1.setId(null);
        assertThat(storeSku1).isNotEqualTo(storeSku2);
    }
}
