import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-live-result',
  templateUrl: './live-result.component.html',
  styleUrls: ['./live-result.component.css']
})
export class LiveResultComponent implements OnInit {

  status: string;
  active: boolean = true;
  votes: number;
  constructor(private _electionService: DashboardService) { }

  ngOnInit(): void {
      this.repeat();
  }

  async fetchDetails(){
  
    this._electionService.fetchLiveData().subscribe(data=>{
      this.status = data.data.status;
      this.votes = data.data.votes;
    }, error=>{
      console.error(error)
    }) ;
      
   
  }
  repeat(){
    setInterval(()=>{
      if(this.active){
        console.log("Im here")
        this.fetchDetails();
      }
     
    }, 30000)
  }


  ngOnDestroy():void{
   this.active = false;
  }
}
