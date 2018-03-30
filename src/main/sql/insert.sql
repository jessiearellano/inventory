insert into inventory.sku (sku_id, name, uom, units_per_uom, category, jhi_cost, tags)
    select SKU,Item_Name,UOM,Units_Per_UOM,Category,Cost,tags FROM Starbucks_IMS.All_items
