import express from "express";
import productRouter from "./routes/product.js";
import { connectMongooseDB } from "./config/connectDB.mjs";
import dotenv from "dotenv"
const app = express();
/// nếu mà muốn đưa cái này lên onl thì phải dấu cái link db đi mà muốn nó đọc đc file env thì pahir cài thêm cái thèn dotenv
dotenv.config();
connectMongooseDB(process.env.DB_URL);

const port = 8081;
/// chúng ta cần có một thư viện Data Processing để xử lí cho sever có thể đọc hiểu đc 
/// ở đây chúng ta sẽ dùng body parser của express 
/// nó phân tích dữ liệu từ phía client gửi lên 

/// chúng ta đăng kí một cái middleware nó sẽ chạy trươc khi routes đc xử lí 
app.use(express.json());/// chú ý là cái json phải truyền vao cái callback
 /// cấu hình các file ejs
 app.set('view engine', 'ejs');
 app.set('views', './views');

 app.get('/', function(req, res) {
  res.render('partials/home.ejs');
});


app.use( `/api`,productRouter)
app.listen(port, () => {
  console.log(`Sever Start localhost on port ${port}`);
});
