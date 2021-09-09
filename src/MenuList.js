import appleImg from './assets/redApple.jpg';
import * as data from './sample.json'
import fujiApple from './assets/fuji-apple.jpg'
import galaApple from './assets/gala-apple.jpg'
import goldenDeliciousApple from './assets/golden-delicious-apple.jpg'
import grannySmithApple from './assets/granny-smith-apple.jpg'
import redDeliciousApple from './assets/red-delicious-apple.jpg'
import beets from './assets/beetss.png'
import broccoli from './assets/broccoli.jpg'
import cantaloupe from './assets/cantaloupe.jpg'
import carrots from './assets/carrots.jpg'
import celery from './assets/celery.jpg'
import cucumber from './assets/cucumber.jpg'
import ginger from './assets/ginger.jpg'
import greenGrapes from './assets/green-grapes.jpg'
import redGrapes from './assets/red-grapes.jpg'
import blackGrapes from './assets/black-grapes.jpg'
import grapefruit from './assets/grapefruit.jpg'
import honeydew from './assets/honeydew.jpg';
import kale from './assets/kale.jpg'
import kiwi from './assets/kiwi.jpg'
import lemons from './assets/lemons.jpg'
import icebergLettuce from './assets/iceberg-lettuce.jpg'
import romaineLettuce from './assets/romaine-lettuce.jpg'
import lime from './assets/lime.jpg'
import oranges from './assets/oranges.jpg'
import parsley from './assets/parsley.jpg'
import pineapple from './assets/pineapple.jpg'
import peaches from './assets/peaches.jpg'
import pears from './assets/pears.jpg'
import strawberries from './assets/strawberries.jpg'
import tomatoes from './assets/tomatoes.jpg'
import turmeric from './assets/turmeric.jpg'
import watermelon from './assets/watermelon.jpg'



//const list = [data];
const dailyRecommendation = {
    vitaminA : 3,
    vitaminB6: 4,
    unit: 'microggrams',
};
const list = [
    {
        name: 'Fuji Apple',
        img: fujiApple,
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
        img: galaApple,
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
        img: goldenDeliciousApple,
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
        'name': 'Granny Smith Apple',
        img: grannySmithApple,
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
        img: redDeliciousApple,
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
        img: beets,
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
        img: broccoli,
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
        img: cantaloupe,
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
        img: carrots,
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
        img: celery,
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
        img: cucumber,
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
        img: ginger,
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
        img: greenGrapes,
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
        img: redGrapes,
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
        'name': 'Black Grapes',
        img: blackGrapes,
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
        img: grapefruit,
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
        img: honeydew,
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
        img: kale,
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
        img: kiwi,
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
        img: lemons,
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
        img: icebergLettuce,
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
        img: romaineLettuce,
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
        img: lime,
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
        img: oranges,
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
        img: parsley,
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
        img: peaches,
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
        img: peaches,
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
        img: pears,
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
        img: strawberries,
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
        img: tomatoes,
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
        img: turmeric,
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
        img: watermelon,
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
