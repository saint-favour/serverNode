const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
     console.log(req.url, req.method)

    res.setHeader('Content-Type', 'text/html')

    
let path = './views/'
switch(req.url) {
    case '/' :
        path += 'index.html'
        break;
    case '/about':
        path += 'about.html'
        break;
    default:
        path += '404.html'
        break; 

}

// this code get path partially works, the else doesn't get the 
// 404 page, but insted gives the root file 
    /*let path = './views/'
if(req.url = '/'){
    path += 'index.html'
}
else if(req.url = '/about'){
    path += 'about.html'
}else{
    path += '404.html'
}*/

    fs.readFile(path, (err, data) =>{
       if(err){
        console.log(err)
        res.end()
       } else{
        res.write(data)
        res.end()
       }
    })
})

server.listen(3000, 'localhost', () =>{
    console.log('listening for request on localhost:3000')
})
  

