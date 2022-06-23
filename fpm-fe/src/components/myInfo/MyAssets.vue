<template>
  <div>
    <h2>내 자산 TOP3</h2>
    <doughnut-chart v-bind:chartData="this.topList.chartData" v-bind="this.topList.chartOptions" />
    <div>
        <div v-for="asset in topList.chartData.datasets.data" :key="asset">{{ asset }}</div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '../common/DoughnutChart.vue';

export default {
    components: {
        DoughnutChart
    },
    data() {
        return{ // 실제로는 데이터 불러와야됨
            topList: {
                chartData: {
                    datasets: [
                        {
                            data: [1, 2, 3],
                            backgroundColor: ['Red', 'Yellow', 'Blue']
                        }
                    ],
                },
                chartOptions: {
                    responsive: false
                }
            }
        }
    }
}
</script>

<style>

</style>