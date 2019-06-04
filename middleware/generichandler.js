const winston = require('winston');


module.exports = function (handler){
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }catch(ex){
            winston.error(ex.message, ex);

            next(ex);
        }
    };
}