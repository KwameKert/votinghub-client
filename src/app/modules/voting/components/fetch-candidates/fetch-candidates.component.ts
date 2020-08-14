import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../voter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ParticlesConfig} from '../../../config/particles-config';
import { Position } from 'src/app/models/Position';
import { Candidate } from 'src/app/models/Candidate';
import { MatDialog } from '@angular/material/dialog';
import { ViewResultsComponent } from '../view-results/view-results.component';
import { ToastrService } from 'ngx-toastr';


declare var particlesJS: any;

@Component({
  selector: 'app-fetch-candidates',
  templateUrl: './fetch-candidates.component.html',
  styleUrls: ['./fetch-candidates.component.scss']
})
export class FetchCandidatesComponent implements OnInit {

  indexNumber: string;
  faculty: string;
  internationalStudent: boolean;
  token: string ;
  type: string;
  isLoading: boolean = false;
  candidatesName: any = {};
  candidatesId: any ={};
  selectedCadidates: any = {};
  srcCategory: any;
  isInternational: boolean;
  facultyCategory: any ;
  internationalCategory: any  ;
  srcStepper: string = "";
  logoUrl = "assets/images/gtuc-src.png";
  facultyStepper: string = "d-none";
  internationalStepper: string = "d-none";
  
  isLinear = false;
  voteForm: FormGroup;

  constructor(private _voterService: VoterService, private _router: Router, private _formBuilder: FormBuilder,  public dialog: MatDialog,private route: ActivatedRoute, private _toastr: ToastrService) { }
  
   ngOnInit(): void {
    
    this.token = this.route.snapshot.paramMap.get('token');
   // this.invokeParticles();
    console.log(this.token)
    this.fetchCandidates();
   this.loadForm();
  }

  loadForm(){

    this.voteForm = this._formBuilder.group({
      token: '',
      indexNumber: '',
      faculty: '',
      internationalStudent: '',
      candidates: ''
    })
    
  }


   invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }

  fetchCandidates(){

    this.isLoading = true;
    
 
    this._voterService.fetchCandidates(this.token).subscribe(result=>{

      if(result.status == 302){

        this._router.navigate(["htau/success"])
      }else if(result.status == 417){

        this._router.navigate(["htau/error"])
      }
      else{

        let nomineeList = result.data;
       
        this.srcCategory = nomineeList.filter((nominee)=>{
          return nominee.cat_name == "SRC"
        })

        this.facultyCategory = nomineeList.filter((nominee)=>{
          if(nominee.cat_name == "BSA" ||  nominee.cat_name == "ESA" ||nominee.cat_name == "ACS" ){
            return nominee;
          }
        })

        this.internationalCategory  = nomineeList.filter((nominee)=>{
          return nominee.cat_name == "ISA"
        })

        if(this.internationalCategory){
          this.isInternational = true;
        }

        console.log("src", this.srcCategory);
        console.log("isa", this.internationalCategory);
        console.log("faculty", this.facultyCategory);
      }

    }, error=>{
      console.error(error)
    }).add(()=>{
      this.isLoading = false
    })
  }

  addCandidate(position: Position, candidate: Candidate){
      this.candidatesName[position.name] = candidate.name;
      this.candidatesId[position.name] = candidate.id;
      console.log(this.candidatesName)
  }

  submitResults(){

    this.isLoading = true;
    let candidateArray: Array<number> = [];

    for(let candidate in this.selectedCadidates){
      candidateArray.push(this.selectedCadidates[candidate])
    }

    this.voteForm.patchValue({
      token: this.token,
      candidates: candidateArray
    })

   
    console.log(this.voteForm.value)

    this._voterService.castVote(this.voteForm.value).subscribe(result=>{
      console.log(result.data);

      this._toastr.success("Vote casted  😊 ","",{
          timeOut:2000
        })
      //this._router.navigate(["htau"])
      this._router.navigate(["htau/success"])
      
    }, error=>{
      this._router.navigate(["htau"])
      console.error(error)
    }).add(()=>{
      this.isLoading = false;
    })
    
  }

  viewResults(persistData: boolean,  toStepper: string){
    const dialogRef = this.dialog.open(ViewResultsComponent, {
      width: '600px',
      height: '400px',
      data: this.candidatesName
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.submitResults();
      if(result){
        if(persistData){
          this.selectedCadidates = {...this.candidatesId}
          this.submitResults();
        }else{
          this.selectedCadidates = {...this.candidatesId}
          this.candidatesName = {};
          this.switchForms(toStepper)
        }
      }
      
    }, error=>{
      // this._toastr.error("Oops an error. 🥺","",{
      //   timeOut:2000
      // })
    });

  }

  switchCategoryLogo(faculty: string){
    console.log(faculty)
    if(faculty == "ESA"){
      this.logoUrl =  "assets/images/esa.png";
    }else if(faculty == "BSA"){
      this.logoUrl =  "assets/images/bsa.png";
    }else if(faculty == "ISA"){
      this.logoUrl =  "assets/images/isa.png";
    }
  }

  switchForms(toStepper: string){
    if(toStepper == "facultyStepper"){
      this.srcStepper = "d-none";
      this.facultyStepper = "d-block";
      this.switchCategoryLogo(this.facultyCategory[0].cat_name)
    }else if( toStepper == "internationalStepper"){
      this.facultyStepper  = "d-none";
      this.internationalStepper = "d-block";
      this.switchCategoryLogo(this.internationalCategory[0].cat_name)
    }
  }
}
