const http = require('http');
const fs = require('fs');
const path = require('path');

//fs: file system

//req: request we are sending to the server
//res: response from the server
const server = http.createServer((req, res) => {
    let filePath = '.' + (req.url === '/' ? '/index.html' : req.url + ".html");

    console.log("filepath: ", filePath);
    fs.readFile(filePath, (error, data) => {
        if(error){
            if(error.code === 'ENOENT'){
                // File not found
                fs.readFile('./404.html', (err, data) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data);
                });
            }else{
                // Other error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error(`Error reading file ${filePath}: ${error}`);
            }
        }else{
            // Determine content type
            const contentType = getContentType(filePath);
            //inform web browser about th etype of content being sent
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});


//find out what kind of content is being served
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/plain';
    }
}

//starts the server and listens for request on port 8080
//listen is used to bind and listen for connections on the psecified host and port
const PORT = 8080;
server.listen(PORT, () => { //callback right here
    console.log(`Server is running on http://localhost:${PORT}/`);
});
