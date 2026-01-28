import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: {
        en: String,
        es: String,
    },
    ingredientPlainText: {
        en: String,
        es: String,
    },
    instructions: {
        en: String,
        es: String,
    },
    imageURI: String,
    tags: {
        blueRibbon: Boolean,
        vegan: Boolean,
        vegetarian: Boolean,
    },
    ingredients: [
        {
            ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
            amount: Number,
            unit: String,
            en: String,
            es: String,
            costPerUnit: Number,
            baseUnit: String,
            productLink: String,
            multiplier: Number
        },
    ],
    appliances: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Appliance', required: true },
            en: String,
            es: String
        },
    ],
    totalCost: Number,
    allergens:{
        dairy: Boolean,
        egg: Boolean,
        wheat: Boolean,
        soy: Boolean,
        fish: Boolean,
        peanuts: Boolean,
        treeNuts: Boolean
    }
});

export default mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);