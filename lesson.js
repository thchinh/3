// Tuần 2-2
// Introduce rest api
//     - Description
//     - Why is it important?
//     - Method, Tranfer data format
//     - Pros and cons
//     - Structure of a rest api
// Connect with mysql
// Demo CRUD with mysql

// Api thường return to json or xml, we need to follow this rule
// Về cách đặt tên dường dẫn của APi chúng ta cần tuân thủ 1 số điều
// + Luôn sử dụng động từ số nhiều để đặt tên cho enpoint vd /products, /users, /posts
// + Không sử dụng động từ để đặt tên vd: /search, /find, /get
// + Thường name of endpoint api theo modle sử dụng
// + Path of endpint k được chứa ký tự đặc biệt trừ (-) hyphen oder-details
// + If endpoin include multiple word use hyphen to split it like /order-details, /order-items
// + Endpoint need to include api keyword to know it's a api like /api/products, /api/users

// /api/....

// 200 => success
// 400 => bad request of user
// 404 => server can't find path
// 500 => server error
// Open question 304

// Database => MYSQL
