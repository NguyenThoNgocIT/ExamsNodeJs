import mongoose from "mongoose";

// Định nghĩa schema cho Product
const productSchema = new mongoose.Schema(
  {
    // Tên sản phẩm
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,  // Loại bỏ khoảng trắng dư thừa
      minlength: [3, "Product name must be at least 3 characters"],
      maxlength: [100, "Product name cannot exceed 100 characters"]
    },

    // Mô tả sản phẩm
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [10, "Product description must be at least 10 characters"]
    },

    // Giá sản phẩm
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price must be greater than or equal to 0"]
    },

    // Số lượng tồn kho
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"]
    },

    // Hình ảnh sản phẩm
    images: [
      {
        type: String, // URL hoặc đường dẫn tới hình ảnh
        required: true
      }
    ],

    // Slug cho sản phẩm (dùng trong URL)
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    // Danh mục sản phẩm (ví dụ: điện thoại, máy tính, v.v.)
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true
    },

    // Thương hiệu (brand)
    brand: {
      type: String,
      trim: true
    },

    // Đánh giá sản phẩm (rating)
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be greater than 5"]
    },

    // Tổng số lượt đánh giá
    numReviews: {
      type: Number,
      default: 0
    },

    // Tình trạng sản phẩm (Còn hàng, hết hàng...)
    status: {
      type: String,
      enum: ['available', 'out of stock', 'discontinued'],
      default: 'available'
    },

    // Ngày tạo sản phẩm
    createdAt: {
      type: Date,
      default: Date.now
    },

    // Ngày cập nhật thông tin sản phẩm
    updatedAt: {
      type: Date,
      default: Date.now
    },

    // Có được giảm giá không?
    discount: {
      type: Number,
      default: 0, // Mức giảm giá (giả sử là %)
      min: [0, "Discount cannot be less than 0"],
      max: [100, "Discount cannot be greater than 100"]
    },

    // Hình thức vận chuyển (ví dụ: free shipping, charged shipping, ...)
    shipping: {
      type: String,
      enum: ['free', 'charged'],
      default: 'charged'
    }
  },
  {
    timestamps: true // Tự động tạo trường createdAt và updatedAt
  }
);

// Tạo model từ schema
const Product = mongoose.model("Product", productSchema);

export default Product;
