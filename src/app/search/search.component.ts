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
    {outputModel:'',label:'Name',searchField:{type:'TEXT',label:'Name',code:'name'}},
    {outputModel:'',label:'Carrier Code',searchField:{type:'TEXT',label:'Carrier Code',code:'code'}},
    {outputModel:'',label:'Defined By',searchField:{type:'TEXT',label:'Defined By',code:'definedby'}},
    {outputModel:'',label:'Status',options:['active','inactive'],searchField:{type:'SELECT',label:'Status',code:'status'}},
    {outputModel:'',label:'Carriers',options:['UPS','DHL','Fedex'],searchField:{type:'MULTI',label:'Carriers',code:'carrier'}}
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
      options:this.availableSearch[0].options ? this.availableSearch[0].options : [],
      disabled:false
    }
    //console.log(filter);
    this.dynamicInUse.push(filter);
  }

  addFieldsDynamic(filterUse,value){
    console.log(this.dynamicInUse[this.dynamicInUse.length-1]);
    if(this.dynamicInUse.length < this.availableFields.length){
        this.availableSearch = this.availableSearch.filter((element) => {
        return this.dynamicInUse.filter((filtersUsed) => {
          return filtersUsed.label == element.label;
        }).length == 0;
      });
      console.log(this.availableSearch);

      //console.log(temp);
      this.dynamicInUse.forEach((element) => element.disabled=true);
      let filter:Partial<Filter> = {
      label:this.availableSearch[0].label,
      code:this.availableSearch[0].code,
      type:this.availableSearch[0].searchField.type,
      //options:this.availableSearch[0].options ? this.availableSearch[0].options : [],
      disabled:false
    }
    if(this.availableSearch[0].options){
      if(this.availableSearch[0].options.length > 0)
        filter['option'] = this.availableSearch[0].options;
      else
        filter['option'] = [];
    }
    this.dynamicInUse.push(filter);
    }
  }

  
  setModelDynamic(filterInUse,value){
    //console.log(filterInUse);
    //console.log(value);
    //this.dynamicInUse[this.inUse.length-1].outputModel = value;
    
    //console.log(filterInUse);
    console.log(value);
    this.dynamicInUse[this.dynamicInUse.length - 1] = this.availableSearch.filter((element) => {
      return element.label == value;
    }).map((obj) => {
      //console.log(obj);
      let filter:Partial<Filter>
      return filter = {
      label:obj.label,
      code:obj.code,
      type:obj.searchField.type,
      options:obj.options ? obj.options : [],
      disabled:false
    }
    })[0];
    console.log(this.dynamicInUse[this.dynamicInUse.length - 1])
  }

  grabFilterModel(search:string){}
}
