import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateTokenComponent } from './components/generate-token/generate-token.component';
import {VotingRoutingModule} from './voting-routing.module';
import {ParticlesDirective} from './particles-directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GenerateTokenComponent, ParticlesDirective],
  imports: [
    CommonModule,
    VotingRoutingModule,
    SharedModule
  ]
})
export class VotingModule { }
