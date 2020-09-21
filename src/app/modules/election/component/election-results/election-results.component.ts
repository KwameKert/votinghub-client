import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/service';
import { DashboardService } from '../../dashboard.service';
import * as Highcharts from 'highcharts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Category } from 'src/app/models/Category';
import { Position } from 'src/app/models/Position';

export interface PositionResult{
  id: number;
  name: string;
  candidateList: Array<any>;
}


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
  categoryData: Array<PositionResult>;
  results: any;
  Highcharts: typeof Highcharts = Highcharts;
  barChartOptions: object;
  positions: any;
  resultList: any = [];

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


  // filterCategory(category: Category){
  //   this.category = category ;
  //     category = this.categories.filter(cat => cat.id == category.id )[0];
  //     this.positions = category.positions;
  // }


  fetchResults(){
    //console.log(this.position)
  this.ngxService.start();
    this._dashboardService.fetchResults(this.category.id).subscribe((data)=>{
      this.resultList = [];
      this.results = data.data;
        
      for(let item of this.results){
        this.positionData = item.candidateResultList
        let series = [];
        for(let pos of this.positionData ){
            series.push({name: pos.name, data: [pos.vote]});
        }
        let options = this.loadCharts(item.name, series)
        this.resultList.push({name: item.name, options, candidates: item.candidateResultList});
      }
      console.log(this.resultList)

       
    }, error=>{
      console.error(error)
    }).add(()=>{
      this.ngxService.stop();
    })
  }

  fetchCandidates(data: any){

  }


  getCandidates(){
    

  }

  loadCharts(position: string, data: any){
    console.log(data);
    return this.barChartOptions = {
      chart: {
        type: 'column'
    },
    title: {
        text: `Analysis for `+ position
    },
    credits: {
      enabled: false
    },
    xAxis: {
        categories: [
            
            'Candidates'
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
