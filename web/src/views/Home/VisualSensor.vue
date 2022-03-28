/* eslint-disable no-console */
<template>
  <div>
    <el-select
      v-model="sensorID"
      placeholder="请选择传感器"
      @change="getV(sensorID)"
    >
      <el-option
        v-for="item in sensorData"
        :key="item.id"
        :label="item.name"
        :value="item.sensor_id"
      >
      </el-option>
    </el-select>
    <div id="myChart" :style="{ width: '600px', height: '500px' }"></div>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {
      sensorData: [],
      sensorID: "",
      echartV: [1, 2, 3, 4, 5, 6],
    };
  },
  mounted() {
    this.drawLine();
    this.getSensor();
  },
  methods: {
    async getSensor() {
      const res = await this.$http.get("sensor/find");
      if (res.status == 200) {
        this.sensorData = res.data;
        // eslint-disable-next-line no-console
        // console.log(this.sensorData);
      }
    },
    getV(id) {
      // eslint-disable-next-line no-console
      // console.log(id);

      for (let i = 0; i < this.sensorData.length; i++) {
        if (this.sensorData[i].sensor_id == id) {
          //清空数组
          this.echartV.splice(0, this.echartV.length);
          //添加数据
          this.echartV.push(this.sensorData[i].humidity);
          this.echartV.push(this.sensorData[i].light);
          this.echartV.push(this.sensorData[i].ph);
          this.echartV.push(this.sensorData[i].power);
          this.echartV.push(this.sensorData[i].temperature);
          this.echartV.push(this.sensorData[i].wind);
          // eslint-disable-next-line no-console
          // console.log(this.echartV);
          // eslint-disable-next-line no-console
          this.drawLine();
        }
      }
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "传感器数据可视化" },
        tooltip: {},
        grid: {
          y2: 140,
        },
        xAxis: {
          type: "category",
          data: ["humidity", "light", "ph", "power", "temperature", "wind"],
          axisLabel: {
            interval: 0,
            rotate: -30,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    "#4962FC",
                    "#4B7CF3",
                    "#4962FC",
                    "#4B7CF3",
                    "#4962FC",
                    "#4B7CF3",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
            name: "",
            type: "bar",
            data: this.echartV,
          },
        ],
      });
    },
  },
};
</script>
<style  scoped>
ul,
li {
  list-style: none;
}
</style>