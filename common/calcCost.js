const calcCost = {
    WEIGHT_LT_2 :{
        DIS_LT_5 : 12,
        DIS_5_20 : 15,
        DIS_20_50: 20,
        DIS_50_500: 50,
        DIS_500_800: 100,
        DIS_GT_800: 220
    },
    WEIGHT_2_5 :{
        DIS_LT_5 : 14,
        DIS_5_20 : 18,
        DIS_20_50: 24,
        DIS_50_500: 55,
        DIS_500_800: 110,
        DIS_GT_800: 250
    },
    WEIGHT_5_20 :{
        DIS_LT_5 : 16,
        DIS_5_20 : 25,
        DIS_20_50: 30,
        DIS_50_500: 80,
        DIS_500_800: 130,
        DIS_GT_800: 270
    },
    WEIGHT_GT_20 :{
        DIS_LT_5 : 21,
        DIS_5_20 : 35,
        DIS_20_50: 50,
        DIS_50_500: 90,
        DIS_500_800: 150,
        DIS_GT_800: 300
    }
}

export function getAmount(weight, distance){
    let weight_obj = '';
    let distance_obj = '';

    switch(true){
        case weight <= 2: weight_obj = 'WEIGHT_LT_2'; break;
        case weight > 2 && weight <= 5 : weight_obj = 'WEIGHT_2_5'; break;
        case weight > 5 && weight <= 20: weight_obj = 'WEIGHT_5_20'; break;
        case weight > 20 : weight_obj = 'WEIGHT_GT_20'; break;
        default: weight_obj= 'WEIGHT_LT_2';
    };

    switch(true){      
        case distance < 5: distance_obj = 'DIS_LT_5'; break;
        case distance > 5 && distance <= 20: distance_obj = 'DIS_5_20'; break;
        case distance > 20 && distance <= 50: distance_obj = 'DIS_20_50'; break;
        case distance > 50 && distance <= 500: distance_obj = 'DIS_50_500'; break;
        case distance > 500 && distance <= 800: distance_obj = 'DIS_500_800'; break;
        case distance > 800: distance_obj = 'DIS_GT_800'; break;
        default: distance_obj = 'DIS_LT_5';
    }

    const determined_weight = calcCost[weight_obj];
    return determined_weight[distance_obj];
}

export default calcCost;