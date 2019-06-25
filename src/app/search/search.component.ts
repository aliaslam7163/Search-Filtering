import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { of } from 'rxjs';
import { Filter } from '../models/filter.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //@ViewChildren() filterSelector2: QueryList;
  availableSearch:any[] = [
    {outputModel:'',label:'Name',code:'name',searchField:{type:'text',label:'Name',code:'name'}},
    {outputModel:'',label:'Carrier Code',code:'code',searchField:{type:'TEXT',label:'Carrier Code',code:'code'}},
    {outputModel:'',label:'Defined By',code:'definedby',searchField:{type:'TEXT',label:'Defined By',code:'definedby'}},
    {outputModel:'',label:'Status',code:'status',options:['active','inactive'],searchField:{type:'SELECT',label:'Status',code:'status'}},
    {outputModel:'',label:'Carriers',code:'carrier',options:['UPS','DHL','Fedex'],searchField:{type:'MULTI',label:'Carriers',code:'carrier'}}
  ];
  searchFields = ['Name','Carrier','Status','DefinedBy'];
  availableFields:any[] = ['Name','Carrier','Status','DefinedBy'];
  filterSelected;
  dynamicInUse = new Array();

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    //Lots of processing needs to be done before this
    //Grabbing filter model from server
    let filter:Partial<Filter> = {
      label:this.availableSearch[0].label,
      code:this.availableSearch[0].code,
      type:this.availableSearch[0].searchField.type,
      disabled:false
    }
    this.dynamicInUse.push(filter);
  }

  addFieldsDynamic(filterUse,value){
    if(this.dynamicInUse.length < this.availableFields.length){
        this.availableSearch = this.availableSearch.filter((element) => {
        return this.dynamicInUse.filter((filtersUsed) => {
          return filtersUsed.label == element.label;
        }).length == 0;
      });
      console.log(this.availableSearch.map((obj) => {return obj}));

      //console.log(temp);
      this.dynamicInUse.forEach((element) => element.disabled=true);
      let filter:Partial<Filter> = {
      label:this.availableSearch[0].label,
      code:this.availableSearch[0].code,
      type:this.availableSearch[0].searchField.type,
      disabled:true
    }
    this.dynamicInUse.push(filter);
    }
  }

  
  setModelDynamic(filterInUse,value){
    //console.log(filterInUse);
    //console.log(value);
    //this.dynamicInUse[this.inUse.length-1].outputModel = value;
    console.log(this.dynamicInUse);
  }

  grabFilterModel(search:string){}
}
