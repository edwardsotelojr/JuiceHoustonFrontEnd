import appleImg from './assets/redApple.jpg';
import * as data from './sample.json'
//const list = [data];
const dailyRecommendation = {
    vitaminA : 3,
    vitaminB6: 4,
    unit: 'microggrams',
};
const list = [
    {
        'name': 'Red Delicious Apple',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
                'vitamin A': 0.02,
                'vitamin B6': 0.0003
        },
        'unit': 'micrograms',
        'facts':["good for skin", "heart health thesine"],
        "minerals": {
            magnesium: 0.06
        },
        'color': "#ff0000",
        'costPerOunce': 0.30
    },
    {
        'name': 'Granny Apple',
        'calories': 12,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.02,
            'vitamin B6': 0.0003
        },
        'unit': 'micrograms',
        'facts':[],
        "minerals": {},
        'color': "#f2f285",
        'costPerOunce': 0.20
    },
    {
        'name': 'Carrot',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },

        'facts':[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,

    },
    {
        'name': 'Celery',
        'calories': 12,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },

        'facts':[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "green",
        'costPerOunce': 0.40,

    },
    {
        'name': 'Cucumber',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },

        'facts':[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "green",
        'costPerOunce': 0.40,

    },

];


export default list;
