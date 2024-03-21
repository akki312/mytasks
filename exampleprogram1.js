var http = require('http');
http.createServer(function (req, res)
{
    res.writeHead(200, {'content-typee': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type = "file" name="filetoupload"><br>');
    res.write('<input type = "submit">');
    res.write('</form>');
    return respond();
}).listen(8080);