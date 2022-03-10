const http=require("http")
const fs=require("fs")
const request=require("requests")
const htmlfile=fs.readFileSync("home.html","utf-8")
const server=http.createServer((req,res)=>{
  const replace=(tempval,orgval)=>{
  let temperature=tempval.replace("{%temp%}",orgval.main.temp)
  temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min)
  temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max)
  temperature=temperature.replace("{%location%}",orgval.name)
  temperature=temperature.replace("{%country%}",orgval.sys.country)
  console.log(temperature)
  }
if(req.url=="/"){
    request('https://api.openweathermap.org/data/2.5/weather?q=indore&appid=8a27252cec71d3f71e6896d2c1736162')
    .on('data', function (chunk) {
        const obj=JSON.parse(chunk)
        const arr=[obj]
     const realData=arr.map((val)=>{
         replace(htmlfile,val)
     }).join("")
     res.write(realData)
       console.log(realData)
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
     res.end()
      console.log('end');
    });
}
})
server.listen(8000)