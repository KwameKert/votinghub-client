import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: number;
  candidates: number;
  positions: number;
  votes: number;
  isLoading: boolean = true;
  dataSource: any = null;
  displayedColumns: string[]  = ["id", "name", "indexNumber", "faculty"];

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchComponents();
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['active','inactive'];
  public pieChartData: number[]  = [9, 80];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    }
  ];

  
  fetchComponents(){
    this._dashboardService.fetchComponents().subscribe(result=>{

        this.pieChartData = [result.data.activeVoters.length, result.data.inactiveVoters.length]  
        this.candidates = result.data.candidates;
        this.categories = result.data.categories;
        this.positions = result.data.positions;
        this.votes = result.data.votes;
        this.dataSource = result.data.activeVoters;

        console.log(this.pieChartData)
    },error=>{
      console.error(error)
    })
  }

}
