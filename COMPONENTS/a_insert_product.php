<?php
    




?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    <title>Document</title>
</head>
<body>

    <div class="card mb-4 shadow-sm">
    <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Add New Menu Item</h5>
    </div>
    <div class="card-body">
        <form action="menu_logic.php" method="POST" class="row g-3">
            <div class="col-md-5">
                <label class="form-label">Product Name</label>
                <input type="text" name="p_name" class="form-control" placeholder="e.g. Cheesy Burger" required>
            </div>
            <div class="col-md-3">
                <label class="form-label">Price (₱)</label>
                <input type="number" step="0.01" name="p_price" class="form-control" placeholder="0.00" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">Category</label>
                <select name="p_category" class="form-select">
                    <option value="Meals">Meals</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </div>
            <div class="col-12 text-end">
                <button type="submit" name="add_product" class="btn btn-success">
                    <i class="bi bi-plus-lg"></i> Save to Menu
                </button>
            </div>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>