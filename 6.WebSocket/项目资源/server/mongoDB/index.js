const mongoose = require('mongoose');

const schemas = require('./schemas');

mongoose.connect('mongodb://localhost:27017/guiguchat',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.once('open',(err)=>{
    if(err){
        console.log('连接数据库失败',error);
    }else{
        console.log('连接数据库成功')
    }
});

const models = {};

Object.entries(schemas).forEach(function([collectionName,schemaObj]){
    models[collectionName+'Model'] = mongoose.model(collectionName,new mongoose.Schema(schemaObj));
})

module.exports = models;