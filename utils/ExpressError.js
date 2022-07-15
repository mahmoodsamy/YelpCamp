class ExpressError extends Error{
    constructor(meesage, statusCode){
        super();
        this.message = meesage;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;