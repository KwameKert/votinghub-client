import { Component, OnInit } from '@angular/core';
import { VoterService } from '../../voter.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { ParticlesConfig} from '../../../config/particles-config';


declare var particlesJS: any;

@Component({
  selector: 'app-fetch-candidates',
  templateUrl: './fetch-candidates.component.html',
  styleUrls: ['./fetch-candidates.component.scss']
})
export class FetchCandidatesComponent implements OnInit {

  voteForm: FormGroup ;
  
  constructor(private _voterService: VoterService, private _router: Router) { }
  

  public ngOnInit(): void {
    this.invokeParticles();
   
  }
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
}
