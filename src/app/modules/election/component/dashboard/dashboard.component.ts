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
  votes: number;
  isLoading: boolean = true;
  dataSource: any = null;
  displayedColumns: string[]  = ["id", "name", "indexNumber", "faculty", "createdAt"];
  Highcharts: typeof Highcharts = Highcharts;
  pieChartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: ''
  },
  tooltip: {
      pointFormat: '{series.name}:  <b>({point.y}) {point.percentage:.1f}%</b> '
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: false
          },
          showInLegend: true
      }
  },
  series: [{
      name: 'Association',
      colorByPoint: true,
      data: [{
          name: 'ESA',
          y: 61.41,
          sliced: false,
          selected: true
      }, {
          name: 'BSA',
          y: 11.84
      }, {
          name: 'ACS',
          y: 10.85
      }]
  }]
  };

  barChartOptions = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Monthly Average Rainfall'
  },
  subtitle: {
      text: 'Source: WorldClimate.com'
  },
  xAxis: {
      categories: [
          'Ghanaians',
          'International Students',
         
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Students '
      }
  },
  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'Ghanaians',
      data: [25]

  }, {
      name: 'International  Students',
      data: [83.6]

  }]
  }

  lineChartOptions = {

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
              return this.value / 1000 + 'k';
          }
      }
  },
  tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
  },
  plotOptions: {
      area: {
          pointStart: 1940,
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
      data: [ 4761, 4717, 4368, 4018
      ]
  }]
  
  }
  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchComponents();
  }

  
  fetchComponents(){
    this._dashboardService.fetchComponents().subscribe(result=>{

        this.candidates = result.data.candidates;
        this.categories = result.data.categories;
        this.positions = result.data.positions;
        this.votes = result.data.votes;
        this.dataSource = result.data.activeVoters;

    },error=>{
      console.error(error)
    })
  }

}
