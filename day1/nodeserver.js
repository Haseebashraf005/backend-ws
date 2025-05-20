let http = require("http");
let server = http.createServer((req, res) => {

    if (req.url == "/") {

        req.end("this is first api end ")
    }else if(req.url == "/about")
    {
        req.end("this is about route")
        
    } else if(req.url == "/contact")
    {
        req.end("this is contact route ")

    }else{
        req.end("Page 404")
    }

})
server.listen(8000)