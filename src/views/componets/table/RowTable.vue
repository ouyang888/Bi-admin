<template>
  <div class="execl">
    <el-table border :data="mesInfo" style="background:#070640" :span-method="objectSpanMethod"
      :cell-style="{ padding: '5px 0', borderColor: '#1E1D51' }" :row-style="rowStyle" type="index"
      :header-cell-style="headerCellStyle" class="execl-box" height="287">
      <el-table-column prop="marketChannel" align="center" :label="directName"></el-table-column>
      <el-table-column prop="cooprMode" align="center" :label="cooprMode" v-if="setTrueOrFalse"></el-table-column>
      <el-table-column prop="manager3" align="center" label="责任人">
        <div class="nameColor" @click="handleClick">张茉欧</div>
        <!-- <template v-slot="scope">
            <div class="nameColor" @click="handleClick">
              {{ scope.row.manager }}
            </div>
          </template> -->
      </el-table-column>
      <el-table-column v-for="(item, i) in titleHead" :key="i" :prop="i" :label="item" align="center">
        <template v-slot="scope">
          <div class="precent">
            <div style="width: 30px">{{ scope.row[i] }}</div>
            <div style="margin-top: 5px">
              <Progress style="margin-bottom: 3px" :rate="scope.row.saleTaskAmt" :color="'#FF8B2F'"
                class="precentCompentes" />
              <Progress :rate="scope.row.saleVolume1" :color="'#66FFFF'" class="precentCompentes" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="cnyAmt" label="总计" align="center">
        <template v-slot="scope">
          <div class="precent">
            <div style="width: 30px">{{ scope.row.cnyAmt }}</div>
            <div style="margin-top: 5px">
              <Progress style="margin-bottom: 3px" :rate="scope.row.saleTaskAmt" :color="'#FF8B2F'"
                class="precentCompentes" />
              <Progress :rate="scope.row.saleVolumeAll" :color="'#66FFFF'" class="precentCompentes" />
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { reactive, ref, defineComponent } from "vue";
  import Progress from "@/views/componets/Progress.vue";

  export default defineComponent({
    name: "RowTable",
    props: {
      mesInfo: {
        type: Object,
      },
      directName: {
        type: String,
      },
      rowSpanNumber: {
        type: Number,
      },
      color: {
        type: String,
      },
      titleHead: {
        type: Object,
      },
      setTrueOrFalse: {
        type: Boolean,
      },
      cooprMode: {
        type: String,
      },
    },
    components: {
      Progress,
    },
    data() {
      return {};
    },
    methods: {
      handleClick(row, index) {
        this.$emit("handleClick");
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        let number = 0;
        this.mesInfo.forEach((item, idnex) => {
          number++;
        });
        console.log(number, "numbernumbernumber");
        // 底部合计合并单元格
        if (rowIndex === number - 1) {
          if (columnIndex == 1 || columnIndex == 2) {
            return [0, 0];
          }
          if (columnIndex === 0) {
            return [1, 3];
          }
        }
        //       if (rowIndex === 6) {
        //   if (columnIndex == 1 || columnIndex == 2) {
        //     return [0, 0];
        //   }
        //   if (columnIndex === 0) {
        //     return [1, 3];
        //   }
        // }
        if (columnIndex === 0) {
          if (rowIndex % this.rowSpanNumber === 0) {
            return {
              rowspan: this.rowSpanNumber,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
      rowStyle({ row, rowIndex }) {
        return {
          backgroundColor: "#070640",
          color: "rgba(255,255,255,0.8)",
          fontFamily: 'PingFangSC-Regular'
        };
      },
      headerCellStyle({ row, rowIndex, column, columnIndex }) {
        if (rowIndex === 0 && columnIndex === 0) {
          return {
            backgroundImage: this.color,
            color: "#fff",
            borderColor: "#1E1D51",
          };
        } else {
          let color = {
            color: "#fff",
            backgroundColor: "#041370",
            padding: "9px 0",
            borderColor: "#1E1D51",
          };
          return color;
        }
      },
    },
  });
</script>
<style scoped lang="stylus">
  .execl {
    width: 905px;
    height: 324px;
    background-color: rgba(2, 0, 77, 0.4);
    box-shadow: inset 0px 0px 34px 0px rgba(17, 40, 255, 0.66);
    border: 2px solid #0d53b7;
    background-image: url("@/assets/tableVBackround.svg");
    border-radius: 0 0 10px 10px;
  }

  .execl-box {
    width: 864px;
    height: 287px;
    margin: 20px auto 0;
    border-color: #1e1d51;
    background: #02004D
  }

  :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
    background-color: #070640 !important;
  }

  .nameColor {
    color: #00ddff;
    cursor: pointer;
  }

  .precent {
    width: 90px;
    height: 23px;
    display: flex;
  }

  .precentCompentes {
    width: 35px;
    height: 4px;
  }

  body .el-table::before {
    z-index: inherit;
  }

  .el-table--border::after,
  .el-table--group::after {
    width: 0;
    height: 0;
  }

  :deep(.el-table__body-wrapper) {
    &::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: #070640;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #8383a5;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #8383a5;
    }
  }

  :deel(.el-table__fixed-right) {
    height: 100% !important;
    bottom: 7px !important;
    right: 7px !important;

    .el-table__fixed-body-wrapper {
      height: calc(100% - 43px) !important;
    }
  }

  /* 头部加粗 */
  :deep(.el-table .el-table__header tr) {
    font-weight: 600;
  }
</style>