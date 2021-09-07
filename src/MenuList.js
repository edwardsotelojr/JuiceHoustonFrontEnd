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
        name: 'Fuji Apple',
        calories: 17,
        protein: '0.1g',
        vitamin: {
                'vitamin A': 0.02,
                'vitamin B6': 0.0003
        },
        'unit': 'micrograms',
        facts:["sweet flavor", "Heart and liver health", 
        "antioxidant and anti-inflammatory properties", "Improve insulin resistance"],
        shortFacts: ["Source of stuff", "Good for this and that, that, and this.", 'It taste good!'],
        "minerals": {
            magnesium: 0.06
        },
        'color': "#ff0000",
        'costPerOunce': 0.30
    }, 
    {
        name: 'Gala Apple',
        calories: 17,
        protein: '0.1g',
        vitamin: {
                'vitamin A': 0.02,
                'vitamin B6': 0.0003
        },
        'unit': 'micrograms',
        facts:["Great source of vitamin C.", "antioxidant and anti-inflammatory properties"],
        shortFacts: ["Source of stuff","Good for this and that, that, and this.", 'It taste good!'],
        "minerals": {
            magnesium: 0.06
        },
        'color': "#ff0000",
        'costPerOunce': 0.30
    },
    {
        name: 'Golden Delicious Apple',
        calories: 17,
        protein: '0.1g',
        vitamin: {
                'vitamin A': 0.02,
                'vitamin B6': 0.0003
        },
        'unit': 'micrograms',
        facts:["Great source of vitamin C.", "antioxidant and anti-inflammatory properties"],
        shortFacts: ["Source of stuff","Good for this and that, that, and this.", 'It taste good!'],
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
        facts:["good for skin", "heart health thesine"],
        shortFacts: ["Source of stuff","Good for this and that, that, and this.", 'It taste good!'],
                "minerals": {},
        'color': "#f2f285",
        'costPerOunce': 0.20
    },
    {
        name: 'Red Delicious Apple',
        calories: 17,
        protein: '0.1g',
        vitamin: {
                'vitamin A': 0.02,
                'vitamin B6': 0.0003
        },
        'unit': 'micrograms',
        facts:["Great source of vitamin C.", "antioxidant and anti-inflammatory properties"],
        shortFacts: ["Source of stuff","Good for this and that, that, and this.", 'It taste good!'],
        "minerals": {
            magnesium: 0.06
        },
        'color': "#ff0000",
        'costPerOunce': 0.30
    },
    {
        'name': 'Beets',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },

        facts:[],
        shortFacts: ["Source of stuff","Good for this and that, that, and this.", 'It taste good!'],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Broccoli',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },

        facts:[],
        shortFacts: ["","", ''],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Cantaloupe',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        facts:[],
        shortFacts: ["","", ''],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Carrot',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        facts:[],
        shortFacts: ["","", ''],
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
        shortFacts: ["","", ''],
        facts:[],
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
        shortFacts: ["","", ''],
        facts:[],

        "minerals": {},
        'unit': 'micrograms',
        'color': "green",
        'costPerOunce': 0.40,

    },
    {
        'name': 'Ginger',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Green Grapes',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Purple Grapes',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Red Grapes',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Grapefruit',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Honeydew Melon',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Kale',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Kiwi',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Lemons',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Iceberg Lettuce',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },

    {
        'name': 'Romaine Lettuce',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Lime',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Iceberg Lettuce',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    }, 
    {
        'name': 'Oranges',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:["Source of vitamin A. lol"],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Parsley',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Pineapple',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Peaches',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Pears',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Strawberries',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Tomatoes',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': "Turmeric",
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
    {
        'name': 'Watermelon',
        'calories': 17,
        'protein': '0.1g',
        'vitamin': {
            'vitamin A': 0.1,
            'vitamin B6': 0.09
        },
        shortFacts: ["","", ''],
        facts:[],
        "minerals": {},
        'unit': 'micrograms',
        'color': "#ffbf00",
        'costPerOunce': 0.40,
    },
];


export default list;
