export const productPath = ['domesticOnLineShopCo','domesticOnLineSales','exprotAreaProductCo','exprotProductCo','productCo','domesticProductCoOffline','exprotAreaProductCo']
export const chartData = [
    {
        orderDate: ['02-01'],
        title: "事业部",
        totalCnyAmt: [{
            data: [200, 300],
            name: '实际达成'
        }],
        inOnLineRatio: 200
    },
    {
        orderDate: ['02-01'],
        title: "内销",
        totalCnyAmt: [{
            data: [200],
            name: '实际达成'
        }],
        inOnLineRatio: 200
    },
    {
        orderDate: ['02-01'],
        title: "外销",
        totalCnyAmt: [{
            data: [200],
            name: '实际达成'
        }],
        inOnLineRatio: 200
    }
]

export const cardList = [{ title: '京东', path: 'domesticProductCoOnline',cnyAmt:15,saleAmtRadio:0,saleAmtRadio:.2,dateRadio:.1},
{ title: '淘系', path: 'domesticProductCoOnline',cnyAmt:15,saleAmtRadio:0,saleAmtRadio:.2,dateRadio:.1 },
{ title: '拼多多', path: 'domesticProductCoOnline',cnyAmt:15,saleAmtRadio:0,saleAmtRadio:.2,dateRadio:.1 },
{ title: '美的平台', path: 'domesticProductCoOnline',cnyAmt:15,saleAmtRadio:0,saleAmtRadio:.2,dateRadio:.1},
{ title: '兴趣电商', path: 'domesticProductCoOnline',cnyAmt:15,saleAmtRadio:0,saleAmtRadio:.2,dateRadio:.1 },
{ title: '天猫运营', path: 'domesticProductCoOnline',cnyAmt:15,saleAmtRadio:0,saleAmtRadio:.2,dateRadio:.1 }]






export const cardData = {
     psis: [
        {
            list: [
                { cnyAmtRadio: 0.2, businessEntityName: '环境', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '烹饪', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '电磁', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '调理', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '电动', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '饮品', dateRadio: 12 },
            ],
            info: {
                directName: "内销",
                cooprLevel1: '内销',
                path: 'domestic',
                saleTaskAmt: 75,
                onLineRadio: 5,
                sumCnyamt: 60,
                dateRadio: 0,
                onLineProfitRadio: .45,
            },
            sab: [{ position: 's', positionRatio: .2 },
            { position: 'a', positionRatio: .4 },
            { position: 'b', positionRatio: .6 }]
        },
        {
            list: [
                { cnyAmtRadio: 20, businessEntityName: '环境', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '烹饪', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '电磁', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '调理', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '电动', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '饮品', dateRadio: 12 },
            ],

            info: {
                directName: "内销",
                cooprLevel1: '外销',
                saleTaskAmt: 7,
                onLineRadio: .6,
                sumCnyamt: 60,
                dateRadio: 0,
                onLineProfitRadio: .60,
            },
            sab: [
                { position: 's', positionRatio: .2 },
                { position: 'a', positionRatio: .4 },
                { position: 'b', positionRatio: .6 },
            ]
        }],
    innerDirect: [
        {
            list: [
                { cnyAmtRadio: 0.2, businessEntityName: '环境', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '烹饪', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '电磁', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '调理', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '电动', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '饮品', dateRadio: 12 },
            ],
            info: {
                directName: "内销",
                cooprLevel1: '线上',
                path: 'domestic',
                saleTaskAmt: 7,
                onLineRadio: 5,
                sumCnyamt: 60,
                dateRadio: 0,
                onLineProfitRadio: .45,
            },
            sab: [{ position: 's', positionRatio: .2 },
            { position: 'a', positionRatio: .4 },
            { position: 'b', positionRatio: .6 }]
        },
        {
            list: [
                { cnyAmtRadio: 20, businessEntityName: '环境', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '烹饪', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '电磁', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '调理', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '电动', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '饮品', dateRadio: 12 },
            ],

            info: {
                directName: "内销",
                cooprLevel1: '线下',
                saleTaskAmt: 75,
                onLineRadio: .6,
                sumCnyamt: 60,
                dateRadio: 0,
                onLineProfitRadio: .60,
            },
            sab: [
                { position: 's', positionRatio: .2 },
                { position: 'a', positionRatio: .4 },
                { position: 'b', positionRatio: .6 },
            ]
        }],
    outerDirect: [
        {
            list: [
                { cnyAmtRadio: 0.2, businessEntityName: '环境', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '烹饪', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '电磁', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '调理', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '电动', dateRadio: 12 },
                { cnyAmtRadio: 0.2, businessEntityName: '饮品', dateRadio: 12 },
            ],
            info: {
                directName: "外销",
                cooprLevel1: 'OBM',
                saleTaskAmt: 60,
                path: 'exprot',
                sumCnyamt: 50,
                dateRadio: 0,
                onLineRadio: .3,
                onLineProfitRadio: .5,
            },
            sab: [{ position: 's', positionRatio: .2 },
            { position: 'a', positionRatio: .4 },
            { position: 'b', positionRatio: .6 }]
        },
        {
            list: [
                { cnyAmtRadio: 20, businessEntityName: '环境', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '烹饪', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '电磁', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '调理', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '电动', dateRadio: 12 },
                { cnyAmtRadio: 20, businessEntityName: '饮品', dateRadio: 12 },
            ],

            info: {
                directName: "外销",
                cooprLevel1: 'OEM',
                saleTaskAmt: 50,
                onLineRadio: .3,
                sumCnyamt: 40,
                dateRadio: 0,
                onLineProfitRadio: .23,
            },
            sab: [
                { position: 's', positionRatio: .2 },
                { position: 'a', positionRatio: .4 },
                { position: 'b', positionRatio: .6 },
            ]
        }],
};