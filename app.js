
const express = require('express');
const fs = require('fs');
const path=require("path");
const app = express();

// 解析请求体中的 JSON 数据
app.use(express.json());


app.use(express.static(path.join(__dirname,'public')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.get('/get-array', (req, res) => {
    // 读取 now.json 文件中的数据
    fs.readFile('now.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading array data.');
      } else {
        const arrayData = JSON.parse(data);
        res.status(200).json(arrayData);
      }
    });
  });

 
 
  
  app.post('/save-array', (req, res) => {
    // 获取前端传递的数组数据
    const arrayData = req.body;
  
    // 读取现有的数据文件 now.json
    let jsonData = [];
    try {
      jsonData = JSON.parse(fs.readFileSync('now.json'));
    } catch (err) {
      console.error(err);
    }
    console.log(123)
  
    // 将传递的数组数据存入现有数据中
    jsonData.push(arrayData);
  
    // 将更新后的数据保存到 now.json 文件中
    fs.writeFile('now.json', JSON.stringify(jsonData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving array data.');
      } else {
        res.status(200).send('Array data saved successfully.');
      }
    });
  });
  
  // 监听端口号并启动服务器
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });