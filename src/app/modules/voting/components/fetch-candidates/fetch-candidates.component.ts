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
  code: string;
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
  noCandidate: Candidate = {
    id: 0,
    name: "none",
    imageUrl: ""
  }
  
  isLinear = false;
  voteForm: FormGroup;

  constructor(private _voterService: VoterService, private _router: Router, private _formBuilder: FormBuilder,  public dialog: MatDialog,private route: ActivatedRoute, private _toastr: ToastrService) { }
  
   ngOnInit(): void {
    
    this.token = this.route.snapshot.paramMap.get('token');
    this.code = this.route.snapshot.paramMap.get('code');

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
    this._voterService.fetchCandidates(this.token, this.code).subscribe(result=>{
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
        if(sessionStorage.getItem("next")){
          this.switchForms(sessionStorage.getItem("next"));
        }
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
    
  }

  submitResults(){

    this.isLoading = true;
    let candidateArray: Array<number> = [];
    // let selectedCadidates = JSON.parse(sessionStorage.getItem("candidates"))
    for(let candidate in this.selectedCadidates){
      candidateArray.push(this.selectedCadidates[candidate])
    }

    console.log(candidateArray)

    this.voteForm.patchValue({
      token: this.token,
      candidates: candidateArray
    })

    this._voterService.castVote(this.voteForm.value).subscribe(result=>{
      this._toastr.success("Vote casted  😊 ","",{
          timeOut:2000
        })

        sessionStorage.removeItem('candidates');
        sessionStorage.removeItem('next');
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
      height: '500px',
      data: this.candidatesName
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(toStepper)
      if(result){

        if(persistData){
          if(sessionStorage.getItem('candidates')){
            this.selectedCadidates = {...this.candidatesId, ...JSON.parse(sessionStorage.getItem("candidates"))}
          }else{
          this.selectedCadidates = {...this.candidatesId}
          }
          
          sessionStorage.setItem('candidates', this.selectedCadidates);
          sessionStorage.setItem('next', toStepper);
          console.log("submitting the selected candidates " ,this.selectedCadidates)
          this.submitResults();
        }else{
          if(sessionStorage.getItem('candidates')){
            this.selectedCadidates = {...this.candidatesId, ...JSON.parse(sessionStorage.getItem("candidates"))}
          }else{
          this.selectedCadidates = {...this.candidatesId}
          }
          this.candidatesName = {};
          this.switchForms(toStepper)
          sessionStorage.setItem('candidates', JSON.stringify(this.selectedCadidates));
          sessionStorage.setItem('next', toStepper);
          // console.log("adding " , sessionStorage.getItem('next'),JSON.parse(sessionStorage.getItem('candidates')));
          console.log("adding selected candidates " ,this.selectedCadidates)
          
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
      this.srcStepper = "d-none";
      this.internationalStepper = "d-block";
      this.switchCategoryLogo(this.internationalCategory[0].cat_name)
    }
  }
}
