import mongoose, { mongo } from "mongoose";
import { Sequelize, DataType, DataTypes} from 'sequelize';
import _ from 'lodash';
import casual from 'casual'; // pkg allows for creation of word, sentences, nums, aka fake data 

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/widgets', {
    useNewUrlParser: true
});

const widgetSchema = new mongoose.Schema({
    name: {
        type: String, 
    }, 
    description: {
        type: String
    },
    price: {
        type: Number
    },
    soldout: {
        type: String
    },
    inventory: {
        type: String
    }, 
    stores: {
        type: Array
    }
}); 

const Widgets = mongoose.model('widgets');

const sequelize = new Sequelize('sqlite:memory:');

const Categories = sequelize.define('categories', {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
});

Categories.sync({ force: true}).then(() => {
_.times(5,(i) => {
    Categories.create({
        category: casual.word,
        description: casual.sentence,
    });
  });
});

export { Widgets, Categories };