exports.initialize = function(){
};
exports.finalize = function(){
};
exports.run = function(inputTools, callback){
    var args = inputTools.args();
    var lists = [];
    var async = new inputTools.SimpleAsync(function(){
        callback(null, lists);
    });
    args.api.forEach(function(v){
        var url = 'http://data.mtgox.com/api/2/' + v;
        async.inc();
        try{
            inputTools.http_get(url, function(err, res){
                if(err){
                    console.error(err.stack);
                }else{
                    lists.push(JSON.parse(res));
                }
                async.dec();
            });
        }catch(err){
            console.error(err.stack);
            async.dec();
        }
    });
};
