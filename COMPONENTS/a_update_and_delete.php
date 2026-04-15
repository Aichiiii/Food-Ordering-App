<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="card shadow">
        <div class="card-header bg-warning text-dark">
            <h5 class="mb-0">Update Menu Item #<?php echo $id; ?></h5>
        </div>
        <div class="card-body">
            <form action="menu_logic.php" method="POST" enctype="multipart/form-data" class="row g-3">
                <input type="hidden" name="p_id" value="<?php echo $row['product_id']; ?>">
                
                <div class="col-md-6">
                    <label class="form-label">Product Name</label>
                    <input type="text" name="p_name" class="form-control" value="<?php echo $row['product_name']; ?>" required>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Price (₱)</label>
                    <input type="number" step="0.01" name="p_price" class="form-control" value="<?php echo $row['price']; ?>" required>
                </div>
                <div class="col-md-3">
                    <label class="form-label">Category</label>
                    <select name="p_category" class="form-select">
                        <option value="Meals" <?php if($row['category'] == 'Meals') echo 'selected'; ?>>Meals</option>
                        <option value="Drinks" <?php if($row['category'] == 'Drinks') echo 'selected'; ?>>Drinks</option>
                        <option value="Snacks" <?php if($row['category'] == 'Snacks') echo 'selected'; ?>>Snacks</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label">Change Image (Leave blank to keep current)</label>
                    <input type="file" name="p_image" class="form-control">
                </div>
                <div class="col-12 text-end">
                    <a href="a_insert_product.php" class="btn btn-secondary">Cancel</a>
                    <button type="submit" name="update_product" class="btn btn-primary">Update Product</button>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>