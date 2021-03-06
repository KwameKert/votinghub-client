import { Component, OnInit } from '@angular/core';

import { ParticlesConfig} from '../../modules/config/particles-config';

declare var particlesJS: any;
@Component({
  selector: 'app-voting-layout',
  templateUrl: './voting-layout.component.html',
  styleUrls: ['./voting-layout.component.css']
})
export class VotingLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.invokeParticles();
  }

  invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }


}
