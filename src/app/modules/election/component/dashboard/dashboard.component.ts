import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as Highcharts from 'highcharts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: number;
  candidates: number;
  positions: number;
  voters: number;
  isLoading: boolean = true;
  dataSource: any = null;
  displayedColumns: string[]  = ["id", "name", "indexNumber", "faculty", "createdAt"];
  Highcharts: typeof Highcharts = Highcharts;
  lineChartOptions: object;
  
  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchComponents();
  }

  
  fetchComponents(){
    this._dashboardService.fetchComponents().subscribe(result=>{

        this.candidates = result.data.candidates;
        this.categories = result.data.categories;
        this.positions = result.data.positions;
        this.voters= result.data.activeVoters;
        this.dataSource = result.data.latestVoters;
        this.loadChart(result.data.transactions)


    },error=>{
      console.error(error)
    })
  }

  loadChart(transaction: Array<Number>){
      this.lineChartOptions = {

        chart: {
          type: 'area'
      },
      
      title: {
          text: ''
      },
    
      xAxis: {
          allowDecimals: false,
          labels: {
              formatter: function () {
                  return this.value; // clean, unformatted number for year
              }
          },
          accessibility: {
              rangeDescription: 'Range: 1940 to 2017.'
          }
      },
      yAxis: {
          title: {
              text: 'Number of voters'
          },
          labels: {
              formatter: function () {
                  return this.value ;
              }
          }
      },
      credits:{
        enabled: false
      },
      exporting: {
        enabled: true
      },
      tooltip: {
          pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
      },
      plotOptions: {
          area: {
              pointStart: 8,
              marker: {
                  enabled: false,
                  symbol: 'circle',
                  radius: 2,
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: [{
          name: 'Voters',
          data: [ ...transaction  ]
      }]
    
      }
    
  }

}
