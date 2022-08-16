import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { FilterService } from 'src/app/data/services/filter.service';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  totalJobs!: number;
  totalHiring!: number;
  totalShortlisted!: number;
  barChartOptions: EChartsOption = {
    title: {
      text: 'Job Application Status'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['Tester', 'Developer', 'Engineering Manager', 'Customer Support']
    },
    series: [
      {
        name: 'Total Applicants',
        type: 'bar',
        data: [11, 32, 13, 22]
      },
      {
        name: 'Shortlisted',
        type: 'bar',
        data: [6, 12, 3, 19]
      }
    ]
  };
  pieChartOptions: EChartsOption = {
    title: {
        text: 'All Jobs'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'All Jobs',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 19, name: 'Customer Support' },
          { value: 3, name: 'Engineering Manager' },
          { value: 12, name: 'Developer' },
          { value: 26, name: 'Tester' },
        ]
      }
    ]
  };

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.totalJobs = 9;
    this.totalHiring = 41;
  }

  getTotalJobs() {
    this.filterService.getPostJobCount()
      .subscribe({
        next: data => this.totalJobs = data
      });
  }

}
