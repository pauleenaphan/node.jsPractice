const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

//__dirname is a keyword/global var in node.js

// Function to serve HTML files with error handling
function serveHtml(fileName) {
    return function (req, res, next) {
        //join directory name(node.jspractice), fileName(about.html)
        res.sendFile(path.join(__dirname, fileName), function (err) {
            if (err) {
                res.status(err.status).sendFile(path.join(__dirname, '404.html')); // Show the 404 page
            }
        });
    };
}

// Routes using the serveHtml function
app.get("/", serveHtml('index.html'));
app.get("/about", serveHtml('about.html'));
app.get("/contact", serveHtml('contact-me.html'));

// //!Longer way to do it
// // Route for serving index.html with error handling
// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'), function (err) {
//         if (err) {
//             res.status(404).sendFile(path.join(__dirname, '404.html'));
//         }
//     });
// });

// // Route for serving about.html with error handling
// app.get("/about", function (req, res) {
//     res.sendFile(path.join(__dirname, 'about.html'), function (err) {
//         if (err) {
//             res.status(404).sendFile(path.join(__dirname, '404.html'));
//         }
//     });
// });

// // Route for serving contact.html with error handling
// app.get("/contact", function (req, res) {
//     res.sendFile(path.join(__dirname, 'contact.html'), function (err) {
//         if (err) {
//             res.status(404).sendFile(path.join(__dirname, '404.html'));
//         }
//     });
// });

// Start the server
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
