import { Component, OnInit } from '@angular/core';

import { ParticlesConfig} from '../../../config/particles-config';


declare var particlesJS: any;
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.invokeParticles();
  }

  invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }


}
