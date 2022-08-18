import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxSpinnerService } from 'ngx-spinner';
import { BarChartData } from 'src/app/data/models/barchart-data.model';
import { PieChartData } from 'src/app/data/models/piechart-data.model';
import { FilterService } from 'src/app/data/services/filter.service';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  totalJobs!: number;
  totalApplication!: number;
  totalShortlisted!: number;
  barChartOptions!: EChartsOption;
  pieChartOptions!: EChartsOption;
  
  constructor(
    private filterService: FilterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getBarChartData();
    this.getPieChartData();
    this.getTotalJobs();
  }

  getTotalJobs() {
    this.filterService.getPostJobCount()
      .subscribe({
        next: data => this.totalJobs = data
      });
  }

  getBarChartData() {
    this.filterService.getBarChartData().subscribe({
      next: (data: BarChartData) => {
        this.totalApplication = data.applicantCount.reduce((a, b) => a + b, 0);
        this.totalShortlisted = data.shortListedCount.reduce((a, b) => a + b, 0);
        this.barChartOptions = {
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
            data: data.jobTitles
          },
          series: [
            {
              name: 'Total Applicants',
              type: 'bar',
              data: data.applicantCount
            },
            {
              name: 'Shortlisted',
              type: 'bar',
              data: data.shortListedCount
            }
          ]
        };
        this.spinner.hide();
      }
    });
  }

  getPieChartData() {
    // this.filterService.getPieChartData().subscribe({
    //   next: (data: PieChartData) => {
    //     let pieData: any[] = [];
    //     for (let i = 0; i < data['jobTitles'].length; i++) {
    //       const temp: any = {
    //         value: data['rejectionPercentage'][i],
    //         name: data['jobTitles'][i]
    //       }
    //       pieData.push(temp);
    //     }
        this.pieChartOptions = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
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
              // data: pieData
              data: [
                { value: 19, name: 'Customer Support' },
                { value: 3, name: 'Engineering Manager' },
                { value: 12, name: 'Developer' },
                { value: 26, name: 'Tester' },
              ]
            }
          ]
        };
      
      // }
    // });
  }

}
