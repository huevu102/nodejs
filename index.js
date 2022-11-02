const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
// chờ ứng dụng (process) cấp cổng hoặc sẽ lấy cổng 5000

app.listen(PORT, function () {
    console.log("Server is running...");
});

// config to connect mysql
const configDB = {
    host: "139.180.186.20", // localhost hoặc địa chỉ IP của server
    port: 3306,
    database: "t2207e",
    user: "t2207e", // localhost thi se la: root
    password: "t2207e123", //localhost thi mamp: "root" -- xampp: ""
    multipleStatements: true //cho phép sử dụng nhiều câu SQL 1 lần gửi yêu cầu
};

// connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// api list call class
app.get("/get-classes", function (req, res) {
    const sql = "select * from classes";
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
    //res.send("Khong send o day, do cau query can thoi gian de chay, nen send o day co the xuat hien truoc khi query xong")
});
/* call back function se duoc chay khi cau lenh sql chay xong: function (err, data) {}
sau khi truy van xong, neu co loi thi loi se duoc tra ve err, khong thi du lieu tra ve bien data*/

app.get("/get-students", function (req, res) {
    const sql = "select * from students";
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

// filter by cid
app.get("/get-student-by-class", function (req, res) {
    const cid = req.query.cid;
    const sql = "select * from students where cid = " + cid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

// search
app.get("/search-student", function (req, res) {
    const q = req.query.q;
    const sql = `select * from students where name like '%${q}%' or email like'%${q}%'`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

// search student by class name (sub-query)
app.get("/search-student-by-class-name", function (req, res) {
    const q = req.query.q;
    const sql = `select * from students where cid in (select cid from classes where name like '%${q}%')`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

// join-table????????
app.get("/student-join-class", function (req, res) {
    const sql = `select * from students s left join classes c on s.cid = c.cid`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

//get student by sid
app.get("/detail-student", function (req, res) {
    const sid = req.query.sid;
    const sql = `select * from students where sid = ${sid}`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else if(data.length > 0){
            res.send(data[0]);
        }else{
            res.status(404).send("404 not found");
            // http response status codes
        }
    })
});

app.get("/student", function(req, res) {
    //Liet ke sv
    res.send("GET student");
})

app.post("/student", function(req, res) {
    //Them
    res.send("POST student");
})

app.put("/student", function(req, res) {
    //update
    res.send("PUT student");
})

app.delete("/student", function(req, res) {
    //delete sv
    res.send("DELETE student");
})

//Post, put, delete khong xem duoc tren url ma can phai dung 1 phan mem khac
