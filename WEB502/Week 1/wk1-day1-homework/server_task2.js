const http = require('http');

const hostname = 'localhost';
const port = 8080;
const path = require('path');
const fs = require('fs');  //file system: READ, CREATE, Delete, rename files..etc

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/' || fileUrl === '/home') {
            fileUrl = '/home.html';
        }else if (fileUrl === '/about') {
            fileUrl = '/about.html';
        }else if (fileUrl === '/contact') {
            fileUrl = '/contact.html';
        }
        
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath); //get file extension

        if (fileExt === '.html') {
            fs.access(filePath, err => {//name of the file is not found
                if (err) {     
                    res.statusCode = 404; //not found status code
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200; //success status code
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else { //for non-HTML files
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else { 
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`The NodeJS Server on port ${port} is now running`);
});