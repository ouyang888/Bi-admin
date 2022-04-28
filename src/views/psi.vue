<template>
    <div class="wrapper">
        <div class="content">
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="card-box">
                    <template v-if="index == 0">
                    <DataBigCardS :inner="inner" :background="isShowBg" :title="item.title" :toPath="item.toPath" />
                    </template>
                    <template v-else-if="index == 1">
                    <DataBigCardP :inner="inner" :background="isShowBg" :title="item.title" :toPath="item.toPath" />
                    </template>
                    <template v-else>
                    <DataBigCardI :inner="inner" :background="isShowBg" :title="item.title" :toPath="item.toPath" />
                    </template>
                </div>
                <div class="echarts-box">
                    <div class="echarts-title">事业部年度{{item.echartsTitle}}及达成趋势图</div>
                    <div class="echarts-body">
                        <staticEcharts :id="index + 11" :title="isshowTitle" />
                    </div>
                </div>

                <div class="table-box">
                    <ColumnTable />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DataBigCardS from '@/views/componets/DataBigCardPsiS.vue'
    import DataBigCardP from '@/views/componets/DataBigCardPsiP.vue'
    import DataBigCardI from '@/views/componets/DataBigCardPsiI.vue'
    import PublicEcharts from '@/views/componets/PublicEcharts.vue'
    import MinCardBg from '@/views/componets/MinCardBg.vue'
    import MaxCardBg from '@/views/componets/MaxCardBg.vue'
    import ColumnTable from '@/views/componets/table/ColumnTable.vue'
    import * as echarts from 'echarts'
    import StaticEcharts from '@/views/componets/StaticEcharts.vue'
    import { cardData } from '@/assets/js/static.js'
    import { useStore } from 'vuex'

    import { reactive, defineComponent, onMounted, toRefs, computed } from 'vue'
    export default ({
        name: 'SaleIndex',
        components: {
            DataBigCardS,
            DataBigCardP,
            DataBigCardI,
            PublicEcharts,
            MinCardBg,
            MaxCardBg,
            ColumnTable,
            StaticEcharts
        },
        setup() {
            const Store = useStore()
            const state = reactive({
                list: [
                    { title: '事业部S', echartsTitle: "库存", toPath: 's' },
                    { title: '事业部P', echartsTitle: "销售", toPath: 's' },
                    { title: '事业部I', echartsTitle: "生产", toPath: 's' }
                ],
                isShowBg: false,
                inner: cardData.psis,
                // SPISS: Store.state.psis,
                // SPISP: Store.state.psis,
                // SPISI: Store.state.psis,
                color: "linear-gradient(to right , #50C0FF,#5AFFA3,#66FFFF) ",
                directName: computed(() => Store.state.tableOneHeading),
                innerTableList: computed(() => Store.state.tableList.innerDirect),
                isshowTitle: true,
            })
            console.log('state.directName', state.directName, state.innerTableList)
            const changeTime = (val) => {
                console.log(val);
            }
            const methods = {
                namesClick() {

                }
            }
            return {
                ...toRefs(state), ...methods, changeTime
            }

        }


    })
</script>
<style scoped>
    .wrapper {
        width: 1910px;
        background-color: #02004D;
        /* overflow: auto; */
    }

    .card-box {
        position: relative;
    }

    .echarts-box {
        /* margin: 10px 0; */
        width: 100%;
        height: 250px;
    }

    .echarts-body {
        height: calc(100% - 50px);
        width: 100%;
    }

    .table-box {

        width: 100%;
        /* height: 250px; */
        margin: 15px 0;
        margin-top: 20px;
    }

    .content {
        /* margin: 15px auto; */
        color: #fff;
        line-height: 1.5;
        display: flex;
        justify-content: space-between;
        padding: 15px 30px;
        width: calc(100% - 30px);
        position: relative;
        box-sizing: border-box;
    }

    .item {
        width: 32.8%;
        background-image: url('@/assets/backgrounCard.svg');
        background-size: cover;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 2px;
        padding-bottom: 10px;
    }

    .echarts-title {
        font-size: 16px;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 2px;
    }
</style>