// function wrapAsync(fn) {
//     return function (req, res, next) {
//         console.log("this is wrapAsync");
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// }

function wrapAsync(fn){
    return function(req,res,next){
       
        fn(req, res, next).catch(next);
        // fn(req, res, next).catch(err).next(err);
        // fn().catch(err).next(err);
    }
}
module.exports = wrapAsync;
