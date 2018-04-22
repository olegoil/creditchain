var http = require("http");
var request = require("request");
const fs = require('fs');
var url = require('url');
var ipfsAPI = require('ipfs-api')

var ipfs = ipfsAPI();

const port = 7777, reader = fs.createReadStream('./index.html');

const server = http.createServer(go);

server.listen(port, ()=>{
    console.log('Server listen',port);
})

function go(req, res) {
    console.log(req.url)
    if (req.url == '/') {
        let file = fs.createReadStream('./index.html');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        file.pipe(res);
    }
    if(req.url == '/move'){
        let hash = 'QmXMRuPVZdRSMHKyQ1fXZsG7XBxKnKdzAJtRNU3wRefgcA'
        var q = url.parse(req.url, true).query;
        console.log(q)
        ipfs.files.cat('/ipfs/'+hash, function (err, file) {
            if (err) {
              throw err
            }
          
            console.log(file.toString('utf8'))
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write({status:'ключ найден', hash:file})
            req.pipe(res);
          })
    }
    //принимает данные с ПОСТ метода
    if (req.url == '/post') {
        let chunk = '';
        req.on('data', (data) => {
            chunk += data;
        });
        req.on('end', function() {
            //эта хуйня помещает в буфер данные с кодировкой которая прилитает со страницы
            console.log(chunk.length);
            var buf = Buffer.from(chunk, 'binary');
            //сюда его роняешь
            const files = [{
                path: 'pohuipath',
                content: buf
            }]
            //сам метод отправки данных в IPFS 
            ipfs.files.add(files, function(err, files) {
                if (err) console.log(err);
                //эта пиздула возвращает объект с хэшом и путём файла которое ты указал при объявлении const files
                console.log(files);
            });
            res.end();
        });
    }
    if (req.url.match(/css/gi)) {
        let file = fs.createReadStream('.' + req.url);
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        file.pipe(res);
    }
    if (req.url.match(/js/gi)) {
        let file = fs.createReadStream('.' + req.url);
        res.writeHead(200, {
            'Content-Type': 'text/javascript'
        });
        file.pipe(res);
    }
    if (req.url.match(/gif/gi)) {
        let file = fs.createReadStream('.' + req.url);
        res.writeHead(200, {
            'Content-Type': 'image/gif'
        });
        file.pipe(res);
    }
    if (req.url.match(/png/gi)) {
        let file = fs.createReadStream('.' + req.url);
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        file.pipe(res);
    }
    if (req.url.match(/jpg/gi)) {
        let file = fs.createReadStream('.' + req.url);
        res.writeHead(200, {
            'Content-Type': 'image/jpg'
        });
        file.pipe(res);
    }
     if (req.url.match(/svg/gi)) {
        let file = fs.createReadStream('.' + req.url);
        res.writeHead(200, {
            'Content-Type': 'image/svg+xml'
        });
        file.pipe(res);
    }

}