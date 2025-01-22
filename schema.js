const Joi = require("joi");

const listingSchema = Joi.object({
    Listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
        location:Joi.string().required(),
        category:Joi.string()
    }).required()
});
const reviewSchema = Joi.object({
   
        comments: Joi.string().required(),
        rating: Joi.number().required(),
        createdAt: Joi.date(),
    
});
module.exports = {listingSchema,reviewSchema};
