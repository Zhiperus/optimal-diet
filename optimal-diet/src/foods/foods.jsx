const foods = {
  "Frozen Broccoli": {
    price: 0.16,
    serving_size: "10 Oz Pkg",
    nutrition_list: [
      73.8, 0.0, 0.8, 68.2, 13.6, 8.5, 8.0, 5867.4, 160.2, 159.0, 2.3,
    ],
  },
  "Carrots, Raw": {
    price: 0.07,
    serving_size: "1/2 Cup Shredded",
    nutrition_list: [
      23.7, 0.0, 0.1, 19.2, 5.6, 1.6, 0.6, 15471.0, 5.1, 14.9, 0.3,
    ],
  },
  "Celery, Raw": {
    price: 0.04,
    serving_size: "1 Stalk",
    nutrition_list: [6.4, 0.0, 0.1, 34.8, 1.5, 0.7, 0.3, 53.6, 2.8, 16.0, 0.2],
  },
  "Frozen Com": {
    price: 0.18,
    serving_size: "1/2 Cup",
    nutrition_list: [72.2, 0.0, 0.6, 2.5, 17.1, 2.0, 2.5, 106.6, 5.2, 3.3, 0.3],
  },
  "Lettuce, Iceber g,Raw": {
    price: 0.02,
    serving_size: "1 Leaf",
    nutrition_list: [2.6, 0.0, 0.0, 1.8, 0.4, 0.3, 0.2, 66.0, 0.8, 3.8, 0.1],
  },
  "Peppers, Sweet, Raw": {
    price: 0.53,
    serving_size: "1 Pepper",
    nutrition_list: [20.0, 0.0, 0.1, 1.5, 4.8, 1.3, 0.7, 467.7, 66.1, 6.7, 0.3],
  },
  "Potatoes, Baked": {
    price: 0.06,
    serving_size: "1/2 Cup",
    nutrition_list: [
      171.5, 0.0, 0.2, 15.2, 39.9, 3.2, 3.7, 0.0, 15.6, 22.7, 4.3,
    ],
  },
  Tofu: {
    price: 0.31,
    serving_size: "1/4 block",
    nutrition_list: [88.2, 0.0, 5.5, 8.1, 2.2, 1.4, 9.4, 98.6, 0.1, 121.8, 6.2],
  },
  "Roasted Chicken": {
    price: 0.84,
    serving_size: "1 lb chicken",
    nutrition_list: [
      277.4, 129.9, 10.8, 125.6, 0.0, 0.0, 42.2, 77.4, 0.0, 21.9, 1.8,
    ],
  },
  "Spaghetti W/ Sauce": {
    price: 0.78,
    serving_size: "1 1/2 Cup",
    nutrition_list: [
      358.2, 0.0, 12.3, 1237.1, 58.3, 11.6, 8.2, 3055.2, 27.9, 80.2, 2.3,
    ],
  },
  "Tomato,Red,R ipc,Raw": {
    price: 0.27,
    serving_size: "1 Tomato, 2-3/5 In",
    nutrition_list: [
      25.8, 0.0, 0.4, 11.1, 5.7, 1.4, 1.0, 766.3, 23.5, 6.2, 0.6,
    ],
  },
  "Apple, Raw, VV/ Skin": {
    price: 0.24,
    serving_size: "1 Fruit,3/Lb,Wo/ Rf",
    nutrition_list: [81.4, 0.0, 0.5, 0.0, 21.0, 3.7, 0.3, 73.1, 7.9, 9.7, 0.2],
  },
  Banana: {
    price: 0.15,
    serving_size: "1 Fruit, Wo/Skn &Seeds",
    nutrition_list: [
      104.9, 0.0, 0.5, 1.1, 26.7, 2.7, 1.2, 92.3, 10.4, 6.8, 0.4,
    ],
  },
  Grapes: {
    price: 0.32,
    serving_size: "10 Fruits,Wo Rf",
    nutrition_list: [15.1, 0.0, 0.1, 0.5, 4.1, 0.2, 0.2, 24.0, 1.0, 3.4, 0.1],
  },
  "Kiwi fruit,Raw, Fresh": {
    price: 0.49,
    serving_size: "1 Med Frt,Wo/Skin",
    nutrition_list: [
      46.4, 0.0, 0.3, 3.8, 11.3, 2.6, 0.8, 133.0, 74.5, 19.8, 0.3,
    ],
  },
  Oranges: {
    price: 0.15,
    serving_size: "1 Fit,2-5/8 Diam",
    nutrition_list: [
      61.6, 0.0, 0.2, 0.0, 15.4, 3.1, 1.2, 268.6, 69.7, 52.4, 0.1,
    ],
  },
  Bagels: {
    price: 0.16,
    serving_size: "1 Oz",
    nutrition_list: [
      78.0, 0.0, 0.5, 151.4, 15.1, 0.6, 3.0, 0.0, 0.0, 21.0, 1.0,
    ],
  },
  "Wheat Bread": {
    price: 0.05,
    serving_size: "1 SI",
    nutrition_list: [
      65.0, 0.0, 1.0, 134.5, 12.4, 1.3, 2.2, 0.0, 0.0, 10.8, 0.7,
    ],
  },
  "White Bread": {
    price: 0.06,
    serving_size: "1 SI",
    nutrition_list: [
      65.0, 0.0, 1.0, 132.5, 11.8, 1.1, 2.3, 0.0, 0.0, 26.2, 0.8,
    ],
  },
  "Oatmeal Cookies": {
    price: 0.09,
    serving_size: "1 Cookie",
    nutrition_list: [81.0, 0.0, 3.3, 68.9, 12.4, 0.6, 1.1, 2.9, 0.1, 6.7, 0.5],
  },
  "Apple Pie": {
    price: 0.16,
    serving_size: "1 Oz",
    nutrition_list: [67.2, 0.0, 3.1, 75.4, 9.6, 0.5, 0.5, 35.2, 0.9, 3.1, 0.1],
  },
  "Chocolate Chip Cookies": {
    price: 0.03,
    serving_size: "1 Cookie",
    nutrition_list: [78.1, 5.1, 4.5, 57.8, 9.3, 0.0, 0.9, 101.8, 0.0, 6.2, 0.4],
  },
  "Butter, Regular": {
    price: 0.05,
    serving_size: "1 Pat",
    nutrition_list: [
      35.8, 10.9, 4.1, 41.3, 0.0, 0.0, 0.0, 152.9, 0.0, 1.2, 0.0,
    ],
  },
  "Cheddar Cheese": {
    price: 0.25,
    serving_size: "1 Oz",
    nutrition_list: [
      112.7, 29.4, 9.3, 173.7, 0.4, 0.0, 7.0, 296.5, 0.0, 202.0, 0.2,
    ],
  },
  "3.3% Fat, Whole Milk": {
    price: 0.16,
    serving_size: "1 C",
    nutrition_list: [
      149.9, 33.2, 8.1, 119.6, 11.4, 0.0, 8.0, 307.4, 2.3, 291.3, 0.1,
    ],
  },
  "2% Low fat Milk": {
    price: 0.23,
    serving_size: "1 C",
    nutrition_list: [
      121.2, 18.3, 4.7, 121.8, 11.7, 0.0, 8.1, 500.2, 2.3, 296.7, 0.1,
    ],
  },
  "Skim Milk": {
    price: 0.13,
    serving_size: "1 C",
    nutrition_list: [
      85.5, 4.4, 0.4, 126.2, 11.9, 0.0, 8.4, 499.8, 2.4, 302.3, 0.1,
    ],
  },
  "Poached Eggs": {
    price: 0.08,
    serving_size: "Lrg Egg",
    nutrition_list: [
      74.5, 211.5, 5.0, 140.0, 0.6, 0.0, 6.2, 316.0, 0.0, 24.5, 0.7,
    ],
  },
  "Scrambled Eggs": {
    price: 0.11,
    serving_size: "1 Egg",
    nutrition_list: [
      99.6, 211.2, 7.3, 168.0, 1.3, 0.0, 6.7, 409.2, 0.1, 42.6, 0.7,
    ],
  },
  "Bologna.Turkey": {
    price: 0.15,
    serving_size: "1 Oz",
    nutrition_list: [
      56.4, 28.1, 4.3, 248.9, 0.3, 0.0, 3.9, 0.0, 0.0, 23.8, 0.4,
    ],
  },
  "Frankfurter, Beef": {
    price: 0.27,
    serving_size: "1 Frankfurter",
    nutrition_list: [
      141.8, 27.4, 12.8, 461.7, 0.8, 0.0, 5.4, 0.0, 10.8, 9.0, 0.6,
    ],
  },
  "Ham,Sliced,Ex tralean": {
    price: 0.33,
    serving_size: "1 Sl,6- 1/4x4x1/16 In",
    nutrition_list: [37.1, 13.3, 1.4, 405.1, 0.3, 0.0, 5.5, 0.0, 7.4, 2.0, 0.2],
  },
  "Kielbasa.Prk": {
    price: 0.15,
    serving_size: "1 SI,6x3-3/4x1/16 In",
    nutrition_list: [
      80.6, 17.4, 7.1, 279.8, 0.6, 0.0, 3.4, 0.0, 5.5, 11.4, 0.4,
    ],
  },
  "Cap'N Crunch": {
    price: 0.31,
    serving_size: "1 Oz",
    nutrition_list: [
      119.6, 0.0, 2.6, 213.3, 23.0, 0.5, 1.4, 40.6, 0.0, 4.8, 7.5,
    ],
  },
  Cheerios: {
    price: 0.28,
    serving_size: "1 Oz",
    nutrition_list: [
      111.0, 0.0, 1.8, 307.6, 19.6, 2.0, 4.3, 1252.2, 15.1, 48.6, 4.5,
    ],
  },
  "Com Flks, Kelloggâ€™S": {
    price: 0.28,
    serving_size: "1 Oz",
    nutrition_list: [
      110.5, 0.0, 0.1, 290.5, 24.5, 0.7, 2.3, 1252.2, 15.1, 0.9, 1.8,
    ],
  },
  "Raisin Bm, Kellg'S": {
    price: 0.34,
    serving_size: "1.3 Oz",
    nutrition_list: [
      115.1, 0.0, 0.7, 204.4, 27.9, 4.0, 4.0, 1250.2, 0.0, 12.9, 16.8,
    ],
  },
  "Rice Kxispies": {
    price: 0.32,
    serving_size: "1 Oz",
    nutrition_list: [
      112.2, 0.0, 0.2, 340.8, 24.8, 0.4, 1.9, 1252.2, 15.1, 4.0, 1.8,
    ],
  },
  "Special K": {
    price: 0.38,
    serving_size: "1 Oz",
    nutrition_list: [
      110.8, 0.0, 0.1, 265.5, 21.3, 0.7, 5.6, 1252.2, 15.1, 8.2, 4.5,
    ],
  },
  Oatmeal: {
    price: 0.82,
    serving_size: "1 C",
    nutrition_list: [
      145.1, 0.0, 2.3, 2.3, 25.3, 4.0, 6.1, 37.4, 0.0, 18.7, 1.6,
    ],
  },
  "Malt-O- Meal,Choc": {
    price: 0.52,
    serving_size: "1 C",
    nutrition_list: [
      607.2, 0.0, 1.5, 16.5, 128.2, 0.0, 17.3, 0.0, 0.0, 23.1, 47.2,
    ],
  },
  "Pizza W/Pepperoni": {
    price: 0.44,
    serving_size: "1 Slice",
    nutrition_list: [
      181.0, 14.2, 7.0, 267.0, 19.9, 0.0, 10.1, 281.9, 1.6, 64.6, 0.9,
    ],
  },
  Taco: {
    price: 0.59,
    serving_size: "1 Small Taco",
    nutrition_list: [
      369.4, 56.4, 20.6, 802.0, 26.7, 0.0, 20.7, 855.0, 2.2, 220.6, 2.4,
    ],
  },
  "Hamburger W/Toppings": {
    price: 0.83,
    serving_size: "1 Burger",
    nutrition_list: [
      275.0, 42.8, 10.2, 563.9, 32.7, 0.0, 13.6, 126.3, 2.6, 51.4, 2.5,
    ],
  },
  "Hotdog, Plain": {
    price: 0.31,
    serving_size: "1 Hotdog",
    nutrition_list: [
      242.1, 44.1, 14.5, 670.3, 18.0, 0.0, 10.4, 0.0, 0.1, 23.5, 2.3,
    ],
  },
  Couscous: {
    price: 0.39,
    serving_size: "1/2 Cup",
    nutrition_list: [100.8, 0.0, 0.1, 4.5, 20.9, 1.3, 3.4, 0.0, 0.0, 7.2, 0.3],
  },
  "White Rice": {
    price: 0.08,
    serving_size: "1/2 Cup",
    nutrition_list: [102.7, 0.0, 0.2, 0.8, 22.3, 0.3, 2.1, 0.0, 0.0, 7.9, 0.9],
  },
  "Macaroni,Ckd": {
    price: 0.17,
    serving_size: "1/2 Cup",
    nutrition_list: [98.7, 0.0, 0.5, 0.7, 19.8, 0.9, 3.3, 0.0, 0.0, 4.9, 1.0],
  },
  "Peanut Butter": {
    price: 0.07,
    serving_size: "2 Tbsp",
    nutrition_list: [
      188.5, 0.0, 16.0, 155.5, 6.9, 2.1, 7.7, 0.0, 0.0, 13.1, 0.6,
    ],
  },
  Pork: {
    price: 0.81,
    serving_size: "4 Oz",
    nutrition_list: [
      710.8, 105.1, 72.2, 38.4, 0.0, 0.0, 13.8, 14.7, 0.0, 59.9, 0.4,
    ],
  },
  "Sardines in Oil": {
    price: 0.45,
    serving_size: "2 Sardines",
    nutrition_list: [
      49.9, 34.1, 2.7, 121.2, 0.0, 0.0, 5.9, 53.8, 0.0, 91.7, 0.7,
    ],
  },
  "White Tuna in Water": {
    price: 0.69,
    serving_size: "3 Oz",
    nutrition_list: [
      115.6, 35.7, 2.1, 333.2, 0.0, 0.0, 22.7, 68.0, 0.0, 3.4, 0.5,
    ],
  },
  "Popcorn, Air-Popped": {
    price: 0.04,
    serving_size: "1 Oz",
    nutrition_list: [108.3, 0.0, 1.2, 1.1, 22.1, 4.3, 3.4, 55.6, 0.0, 2.8, 0.8],
  },
  "Potato Chips, Bbqflvr": {
    price: 0.22,
    serving_size: "1 Oz",
    nutrition_list: [
      139.2, 0.0, 9.2, 212.6, 15.0, 1.2, 2.2, 61.5, 9.6, 14.2, 0.5,
    ],
  },
  Pretzels: {
    price: 0.12,
    serving_size: "1 Oz",
    nutrition_list: [
      108.0, 0.0, 1.0, 486.2, 22.5, 0.9, 2.6, 0.0, 0.0, 10.2, 1.2,
    ],
  },
  "Tortilla Chip": {
    price: 0.19,
    serving_size: "1 Oz",
    nutrition_list: [
      142.0, 0.0, 7.4, 149.7, 17.8, 1.8, 2.0, 55.6, 0.0, 43.7, 0.4,
    ],
  },
  "Chicknoodl Soup": {
    price: 0.39,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      150.1, 12.3, 4.6, 1862.2, 18.7, 1.5, 7.9, 1308.7, 0.0, 27.1, 1.5,
    ],
  },
  "Spit Pea&l lamsoup": {
    price: 0.67,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      184.8, 7.2, 4.0, 964.8, 26.8, 4.1, 11.1, 4872.0, 7.0, 33.6, 2.1,
    ],
  },
  "Vegetbeef Soup": {
    price: 0.71,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      158.1, 10.0, 3.8, 1915.1, 20.4, 4.0, 11.2, 3785.1, 4.8, 32.6, 2.2,
    ],
  },
  "Neweng Clamchwd": {
    price: 0.75,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      175.7, 10.0, 5.0, 1864.9, 21.8, 1.5, 10.9, 20.1, 4.8, 82.8, 2.8,
    ],
  },
  "Tomato Soup": {
    price: 0.39,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      170.7, 0.0, 3.8, 1744.4, 33.2, 1.0, 4.1, 1393.0, 133.0, 27.6, 3.5,
    ],
  },
  "New E Clamchwd,W/ Mlk": {
    price: 0.99,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      163.7, 22.3, 6.6, 992.0, 16.6, 1.5, 9.5, 163.7, 3.5, 186.0, 1.5,
    ],
  },
  "Crm Mshrm Soup,W/Mlk": {
    price: 0.65,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      203.4, 19.8, 13.6, 1076.3, 15.0, 0.5, 6.1, 153.8, 2.2, 178.6, 0.6,
    ],
  },
  "Beanbacn Soup,W/Watr": {
    price: 0.67,
    serving_size: "1 C (8 FI Oz)",
    nutrition_list: [
      172.0, 2.5, 5.9, 951.3, 22.8, 8.6, 7.9, 888.0, 1.5, 81.0, 2.0,
    ],
  },
};

export default foods;
