const KoaRouter = require('koa-router');
const router = new KoaRouter();

const routes = require('./routes');

Object.entries(routes).forEach(function([method,mapObj]){
    Object.entries(mapObj).forEach(function([path,callback]){
        router[method]("/"+path,callback);
    })
})

module.exports = router;