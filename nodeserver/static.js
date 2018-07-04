var fs=require("fs");
var mime=require("./mine").types;
var num=0;
module.exports= function(req,res,pathname){
    //var pathname=url.parse(req.url).pathname;
    //var pathname=req.url;
    if(pathname==""||pathname=="/"){
        var realpath="./pwatest/static/index.html";
    }else{
        var realpath="./"+pathname;
    }
    //console.log(realpath)
    fs.exists(realpath, function(exists){
        //console.log(exists);
        if(!exists){
            res.writeHead("404",{"content-type":"text/plain"});
            res.write("404,not found!");
            res.end();
        }else{
            fs.readFile(realpath,function(err,data){
                if(err){
                    res.writeHead(500,{"content-type":"text/html"});
                    res.end(err);
                }else{
                    var splitPathRe =/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                    console.log("88888888888")
                    var splitPath = function(filename) {
                      return splitPathRe.exec(filename).slice(1);
                    };
                    var ext=splitPath(realpath).slice(-1);
                    console.log(ext)
                    console.log(ext[0])
                    console.log("6666666666666")
                    var contenttype=mime[ext[0]]||"text/html";
                    res.writeHead(200,{"content-type":contenttype});
                    console.log(data)
                    if(ext[0]!=".html"){
                        res.write(data);
                    }else{
                        console.log("this is a num="+num)
                        if(num==0){
                            res.write(data);
                            num++;
                        }else{
                            res.write(data);
                            console.log("this is second html")
                        }
                    }
                    res.end();

                }
            });
        }
    });
}