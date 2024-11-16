import Product from "../models/product.mjs"; // Giả sử bạn có model Product tương tự như model User
class ProductController {
  // Get tất cả sản phẩm
  static async getProducts(req, res) {
    const { page = 1, limit = 10, search = "" } = req.query;

    try {
      const query = search
        ? { name: { $regex: search, $options: "i" } } // Tìm kiếm theo tên
        : {};

      const products = await Product.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Product.countDocuments(query);

      res.status(200).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  // Get sản phẩm theo ID (hoặc slug)
  static async getProductsById(req, res) {
    const { slug } = req.params;
    try {
      const product = await Product.findOne({ slug }); // Tìm sản phẩm theo slug
      if (!product) {
        return res.status(404).send(`Product with slug ${slug} not found.`);
      }
      res.status(200).json(product); // Trả về thông tin sản phẩm dưới dạng JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
  //   Thêm Middleware Xác thực
  // Nếu ứng dụng cần bảo mật, bạn có thể yêu cầu token (JWT) để xác thực trước khi truy cập các route thêm/sửa/xóa sản phẩm.
  /// thêm tronng phần user phân quyền admin

  // Thêm sản phẩm mới
  static async addProducts(req, res) {
    const { name, price, description, slug } = req.body; // Lấy dữ liệu từ body

    try {
      // Tạo mới sản phẩm
      const newProduct = new Product({
        name,
        price,
        description,
        slug,
      });

      // Lưu sản phẩm vào DB
      await newProduct.save();

      res.status(201).json(newProduct); // Trả về sản phẩm mới được tạo dưới dạng JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  // Xóa sản phẩm theo ID
  static async deleteProducts(req, res) {
    const { id } = req.params; // Lấy id từ tham số URL
    try {
      const deletedProduct = await Product.findByIdAndDelete(id); // Xóa sản phẩm theo ID

      if (!deletedProduct) {
        return res.status(404).send("Product not found");
      }

      res.status(200).send("Product deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }

  // Cập nhật thông tin sản phẩm
  static async updateProducts(req, res) {
    const { id } = req.params; // Lấy id từ tham số URL
    const { name, price, description, slug } = req.body; // Lấy thông tin từ body

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, description, slug },
        { new: true } // Trả về bản cập nhật sau khi thay đổi
      );

      if (!updatedProduct) {
        return res.status(404).send("Product not found");
      }

      res.status(200).json(updatedProduct); // Trả về sản phẩm đã được cập nhật dưới dạng JSON
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
}

export default ProductController;
