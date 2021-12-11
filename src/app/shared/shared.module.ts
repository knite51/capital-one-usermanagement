import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LaddaModule } from 'angular2-ladda';

const sharedModules = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  LaddaModule,
]

@NgModule({
  declarations: [],
  imports: sharedModules,
  exports: sharedModules,
})
export class SharedModule { }
