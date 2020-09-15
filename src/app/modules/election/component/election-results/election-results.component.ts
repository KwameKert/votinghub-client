import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/service';
import { DashboardService } from '../../dashboard.service';
import * as Highcharts from 'highcharts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Category } from 'src/app/models/Category';
import { Position } from 'src/app/models/Position';


@Component({
  selector: 'app-election-results',
  templateUrl: './election-results.component.html',
  styleUrls: ['./election-results.component.css']
})
export class ElectionResultsComponent implements OnInit {

  categories: Array<Category>;
  category: Category;
  position: Position;
  positionData: any;
  results: any;
  Highcharts: typeof Highcharts = Highcharts;
  barChartOptions: object;
  positions: any;

  constructor(private _crudService: CrudService, private _dashboardService: DashboardService,  private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.fetchCategories();
    
  }

  fetchCategories(): void{
    this._crudService.fetchAll("category").subscribe((data)=>{
        this.categories = data.data;
    }, error=>{
      console.error(error)
    })
  }


  filterCategory(category: Category){
    this.category = category ;
      category = this.categories.filter(cat => cat.id == category.id )[0];
      this.positions = category.positions;
  }


  fetchResults(){
    console.log(this.position)
  
    this._dashboardService.fetchResults(this.position.id).subscribe((data)=>{
        this.results = data.data;
        this.positionData = this.results.candidateResultList
        let series = [];
        for(let item of this.positionData ){
            series.push({name: item.name, data: [item.vote]});
        }

        this.loadCharts(series)
        console.log(series)
    }, error=>{
      console.error(error)
    })
  }

  fetchCandidates(data: any){

  }


  getCandidates(){
    

  }

  loadCharts(data: any){
    this.barChartOptions = {
      chart: {
        type: 'column'
    },
    title: {
        text: `Analysis for `+ this.position.name
    },
    xAxis: {
        categories: [
            
            'votes'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Votes'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} </b></td></tr>',
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
    series: [
      ...data
     ]
    }
  }


}
