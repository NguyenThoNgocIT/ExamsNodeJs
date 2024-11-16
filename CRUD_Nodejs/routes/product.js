import express from "express";
import ProductController from "../controllers/product.js"; // Đường dẫn phải chính xác
const router = express.Router(); /// nhớ truyền callback dô nha ba 
// Route CRUD cho sản phẩm
router.get("/products",ProductController.getProducts);  // Lấy tất cả sản phẩm
router.get("/productsGetById/:slug",ProductController.getProductsById);  // Lấy sản phẩm theo slug
router.post("/productsAdd", ProductController.addProducts);  // Thêm sản phẩm mới
router.delete("/productsDelete/:id", ProductController.deleteProducts);  // Xóa sản phẩm theo ID
router.put("/productsUpdate/:id", ProductController.updateProducts);  // Cập nhật sản phẩm theo ID
export default router;
