import * as echarts from 'echarts'


export const createRow = (row, key, val) => {
    if (!row) return;
    let arr = row.filter(v => { return v[key] == val })
    arr.splice(6)

    let info = arr && arr.length > 0 && arr[0]

    info.directName = info[key]
    if(info.onLineProfitRadio){
        info.onLineProfitRadio = (info.onLineProfitRadio * 100).toFixed(0)
    }
    if(info.onLineRadio){
        info.onLineRadio = (info.onLineRadio * 100).toFixed(0)
    }
    info.sumCnyamt = (info.sumCnyamt / 100000000).toFixed(0)
    info.saleTaskAmt = (info.saleTaskAmt / 100000000).toFixed(0)

    switch (info[key]) {
        case '线上':
            info.path = 'domesticOnLine';
            break;
        case '线下':
            info.path = 'domesticOffLine';
            break;
    }

    return [{ info: info, list: arr }]
}

export const createInnerSab = (row, name) => {
    if (!row) return;

    let data = row.filter((v) => {
        if (v.position) {
            v.positionRatio = Number((v.positionRatio).toFixed(2))
        }
        return v.cooprLevel1 == name && v.position != null
    })

    return data;

}
export const createOutSab = (row, name) => {
    if (!row) return;

    let data = row.filter((v) => {
        if (v.position) {
            v.positionRatio = Number((v.positionRatio).toFixed(2))
        }
        return v.obmOem == name && v.position != null
    })
    return data;

}

export const createInnerDirect = (row, name, obj1, obj2) => {
    if (!row) return;
    let xs = row.filter(v => {
        if (v.onLineRadio > 1) {
            v.onLineRadio = 1;
        }
        return v.cooprLevel1 == '线上' && v.directName == name
    }
    )
    let xx = row.filter(v => {
        if (v.onLineRadio > 1) {
            v.onLineRadio = 1;
        }
        return v.cooprLevel1 == '线下' && v.directName == name
    }
    )

    xs.splice(6)
    xx.splice(6)
    let xsInfo = xs && xs.length > 0 && xs[0]
    let xxInfo = xx && xx.length > 0 && xx[0]
    xsInfo.onLineRadio = xsInfo.onLineRadio.toFixed(2)
    xsInfo.onLineProfitRadio = xsInfo.onLineProfitRadio.toFixed(2)
    xsInfo.sumCnyamt = (xsInfo.sumCnyamt / 100000000).toFixed(0)
    xsInfo.saleTaskAmt = (xsInfo.saleTaskAmt / 100000000).toFixed(0)

    xxInfo.onLineRadio = xxInfo.onLineRadio.toFixed(2)
    xxInfo.onLineProfitRadio = xxInfo.onLineProfitRadio.toFixed(2)
    xxInfo.sumCnyamt = (xxInfo.sumCnyamt / 100000000).toFixed(0)
    xxInfo.saleTaskAmt = (xxInfo.saleTaskAmt / 100000000).toFixed(0)

    xsInfo.path = 'domestic'
    xxInfo.path = 'exprot'

    return [{ info: xsInfo, list: xs, sab: obj1 }, { list: xx, info: xxInfo, sab: obj2 }]
}
export const createOuterDirect = (row, name, obj1, obj2) => {
    if (!row) return;
    let xs = row.filter(v => { return v.obmOem == 'OBM' && v.directName == name })
    let xx = row.filter(v => { return v.obmOem == 'OEM' && v.directName == name })
    xs.splice(6)
    xx.splice(6)
    let xsInfo = xs && xs.length > 0 && xs[0]
    let xxInfo = xx && xx.length > 0 && xx[0]
    xsInfo.sumCnyamt = (xsInfo.sumCnyamt / 100000000).toFixed(0)
    xxInfo.sumCnyamt = (xxInfo.sumCnyamt / 100000000).toFixed(0)

    xsInfo.path = 'domestic'
    xxInfo.path = 'exprot'

    return [{ info: xsInfo, list: xs, sab: obj1 }, { list: xx, info: xxInfo, sab: obj2 }]


}
export const createEcharts = (echartsData) => {  // 

    console.log(echartsData)
    if (!Array.isArray(echartsData)) return

    var data = []
    echartsData.filter(child => {

        let seriesData = [] // series 数据
        let linearGradient = {
            '实际达成': ['hsla(197, 100%, 50%, .3)', 'hsla(215, 95%, 39%, .3)'],
            '规划达成': ['rgba(166,0,255,0.35)', 'rgba(113,0,224,1)'],
            '同期达成': ['rgba(117,116,142,0.25)', 'rgba(117,116,142,1)'],
        };
        let markLineData = { // 平均线
            data: [{
                yAxis: child.inOnLineRatio, silent: false, //鼠标悬停事件 true没有，false有
                lineStyle: { //警戒线的样式 ，虚实 颜色
                    type: "dashed", //样式  ‘solid’和'dotted'
                    color: "#FF8B2F",
                    width: 2   //宽度
                },
                label: {
                    formatter: '',
                    color: '#FF8B2F',
                    position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end" 开始 中点 结束
                },
            }],

            symbol: ['none', 'none'],

        }

        const color = [{
            colorStops: [{
                offset: 0, color: '#0554C0' // 0% 处的颜色
            }, {
                offset: 1, color: '#00B6FF' // 100% 处的颜色
            }],
        },
        {
            colorStops: [{
                offset: 0, color: 'rgba(166,0,255,0.35)' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgba(113,0,224,1)' // 100% 处的颜色
            }],
        },
        {
            colorStops: [{
                offset: 0, color: 'rgba(117,116,142,0.25)' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgba(117,116,142,1)' // 100% 处的颜色
            }],
        }] // 折线图颜色
        child.totalCnyAmt.forEach((v, i) => {
            seriesData.push({
                name: v.name,
                type: 'line',
                stack: 'Total',
                lineStyle: {
                    width: 1
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                            offset: 0,
                            color: linearGradient[v.name][0]
                        },
                        {
                            offset: 1,
                            color: linearGradient[v.name][1]
                        }
                    ])
                },
                data: v.data,
            })
            console.log('line', v.name, linearGradient[v.name][0])
            color.push(linearGradient[v.name][0])
        });
        color.push('#FF8B2F') // 末尾添加平均线颜色

        seriesData[0].markLine = markLineData;

        let echartsData = {

            textStyle: {
                color: '#3FB0FF'
            },
            color: color,
            grid: {
                top: '12%',
                left: '13%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: child.orderDate,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                name: '单位：万',
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(45,153,255,.3)'
                    },
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            series: seriesData
        };

        data.push({ title: child.title, echartsData: echartsData });

    })
    console.log(data)
    return data

}

