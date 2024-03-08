const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

// main html 불러오기, ( 하단 createServer 코드 참고 )
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

// mariadb를 mysql 모듈 불러와서 일단 설정완료!!!
const mysql_module = require("mysql");
const mariadb = mysql_module.createConnection({
  // mariadb가 있는 컴퓨터 주소
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Tennis",
});

// mariadb 연결
mariadb.connect();

// Request는 req, Response는 res 매개변수로 설정.
const server = http.createServer((req, res) => {
  // url 모듈에서 굳이 parse를 쓰는 이유는 URL 구성 요소로 나누어서 쉽게 작업하기 위함임.
  // 만약에 parse를 쓰지 않는다면 아래 주석같이 써야함.
  //   const { url } = req;
  //   const queryParams = querystring.parse(url.split("?")[1]);
  const parsedUrl = url.parse(req.url);

  //   queryParams 말그대로 URL에서 ? 시작하는 query params 값을 얻기 위함임.
  const queryParams = querystring.parse(parsedUrl.query);

  //   main page
  if (parsedUrl.pathname === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(main_view);
    res.end();
    //   main page

    // order page
  } else if (parsedUrl.pathname === "/order") {
    // Order 버튼 눌렀을때 query 값 받아오기
    const productId = queryParams.productId;
    const productName = queryParams.productName;


    // query 값 안에 있는 productId와 더불어 현재 날짜와 같이 query 보내기
    mariadb.query(
      `INSERT INTO orderlist VALUES ('${productId}', '${productName}', '${new Date().toLocaleDateString()}');`,
      (err, rows) => {
        console.log(rows);
      }
    );


    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write("order page");
    res.end();
    // order page

    // orderlist page
  } else if (parsedUrl.pathname === "/orderlist") {
    mariadb.query(`SELECT * FROM orderlist;`, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.write(
          orderlist_view.replace("{ ROWS_DATA }", JSON.stringify(rows))
        );
        res.end();
      }
    });
    // orderlist page

    // img url 주소
  } else if (parsedUrl.pathname.startsWith("/img/")) {
    const imagePath = `.${parsedUrl.pathname}`;

    fs.readFile(imagePath, (err, data) => {
      // 이미지 못찾을시 not fouond 404 에러
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.write("Not Found!!! 404!!!");
        res.end();
        // 이미지 못찾을시 not fouond 404 에러

        // img url 주소 찾을 시
      } else {
        res.writeHead(200, {
          // image type 으로 바꿨습니다.
          "Content-Type": "image/png",
        });
        res.write(data);
        res.end();
      }
      // img url 주소 찾을 시
    });
    // img url 주소

    // 없는 url 주소 입력시
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.write("Not Found!!! 404!!!");
    res.end();
  }
  // 없는 url 주소 입력시
});

// process.env.PORT 이 부분은 최상단에 .env 파일 생성 뒤
// PORT=8888 이렇게 작성하시면 됩니다.

// 이렇게 굳이 작성하는 이유는 서버 애플리케이션 서버가 실행될 환경에 따라 포트 번호를 동적으로 설정하기 위함입니다.
// 만약에 AWS와 같은 클라우드 서비스를 쓴다면, 포트번호를 서버 배포자가 지정할 수 있는데, AWS 해당 클라우드 서비스에서
// 서버자가 포트값을 8080 값으로 지정했다면 그 클라우드 플랫폼 서비스의 .env(환경변수 파일)에는 8080이 지정되어,
// 그 클라우드 서비스에서는 8080 포트번호에서 서버가 실행될 것입니다.
// 만약 따로 지정된 PORT 번호가 없다면 8888을 쓰게 되는 것 입니다.
const PORT = process.env.PORT || 8888;

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
