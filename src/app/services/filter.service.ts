
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FilterService {
  _currentAvailableFilters;//behaviorsubject. keeps track of current state of available filters
  _currentInUseFilters; //behaviorsubject. keeps track of current state of filters in use
  _filterModelArray:any[]; // computational array for avaialbe filters
  _filtersInUseArray; //computational array for filters in use
  constructor() { 
    
  }
}