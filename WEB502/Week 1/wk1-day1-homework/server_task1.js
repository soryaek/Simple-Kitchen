const http = require('http');
const hostname = 'localhost';
const port = 2000;
const path = require('path');
const fs = require('fs');  //file system: READ, CREATE, Delete, rename files..etc
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/' || fileUrl === '/home'){
            res.statusCode = 200; 
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Home Page</h1></body></html>`);
        }else if (fileUrl === '/about') {
            res.statusCode = 200; 
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>About Page</h1></body></html>`);

        }else if (fileUrl === '/contact') {
            res.statusCode = 200; 
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Contact Page</h1></body></html>`);
        }else { 
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
        }
    }
});
server.listen(port, hostname, () => {
    console.log(`The NodeJS Server on port ${port} is now running`);
});