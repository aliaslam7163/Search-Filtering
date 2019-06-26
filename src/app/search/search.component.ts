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
    {label:'Name',name:'name',type:'TEXT'},
    {label:'Carrier Code',name:'code',type:'TEXT'},
    {label:'Defined By',name:'definedby',type:'TEXT'},
    {label:'Status',name:'status',type:'SELECT',inputModel:['active','inactive']},
    {label:'Carriers',name:'carriers',type:'MULTI',inputModel:['UPS','DHL','Fedex']}
  ];
  searchFields = this.availableSearch;
  availableFields:any[] = ['Name','Carrier','Status','DefinedBy'];
  filterSelected;
  dynamicInUse = new Array();

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    //Lots of processing needs to be done before this
    //Grabbing filter model from server
    let filter:Partial<Filter> = {
      label:this.availableSearch[0].label,
      name:this.availableSearch[0].name,
      type:this.availableSearch[0].type,
      disabled:false,
      outputModel:this.availableSearch[0].label,
      availableSelecitons:this.availableSearch.map((ele) => {return ele.label}),
      setValue:''
    }
    if(this.availableSearch[0].inputModel){
      if(this.availableSearch[0].inputModel.length > 0)
        filter['inputModel'] = this.availableSearch[0].inputModel;
      else
        filter['inputModel'] = [];
    }
    this.dynamicInUse.push(filter);
  }

  addFieldsDynamic(filterUse,value){

    //console.log(this.dynamicInUse[this.dynamicInUse.length-1]);
    if(this.dynamicInUse.length <= this.availableFields.length){
        this.availableSearch = this.availableSearch.filter((element) => {
        return this.dynamicInUse.filter((filtersUsed) => {
          return filtersUsed.label == element.label;
        }).length == 0;
      });
      //console.log(this.availableSearch);
      console.log(this.dynamicInUse);
      
      this.dynamicInUse.forEach((element) => element.disabled=true);
      let filter:Partial<Filter> = {
      label:this.availableSearch[0].label,
      name:this.availableSearch[0].name,
      type:this.availableSearch[0].type,
      disabled:false,
      outputModel:this.availableSearch[0].label,
      availableSelecitons:this.availableSearch.map((ele) => {return ele.label}),
      setValue:''
      //outputModel:{name:this.availableSearch[0].label}
      }
      if(this.availableSearch[0].inputModel){
        if(this.availableSearch[0].inputModel.length > 0)
          filter['inputModel'] = this.availableSearch[0].inputModel;
        else
            filter['inputModel'] = [];
        }
      this.dynamicInUse.push(filter);
    }
  }

  
  setModelDynamic(filterInUse,value){
    //console.log(filterInUse);
    //console.log(value);
    //this.dynamicInUse[this.inUse.length-1].outputModel = value;
    
    //console.log(filterInUse);
    //console.log(value);
    this.dynamicInUse[this.dynamicInUse.length - 1] = this.availableSearch.filter((element) => {
      return element.label == value;
    }).map((obj) => {
      //console.log(obj);
      let filter:Partial<Filter>
      return filter = {
      label:obj.label,
      name:obj.name,
      type:obj.type,
      inputModel:obj.inputModel ? obj.inputModel : [],
      disabled:false,
      outputModel:obj.label,
      availableSelecitons:this.availableSearch.map((ele) => {return ele.label}),
      setValue:''
    }
    })[0];
    console.log(this.dynamicInUse[this.dynamicInUse.length - 1])
  }

  grabFilterModel(search:string){}

  getOutputModel(name:any,value:any=''){
    //let obj = {name:value};
  }
}
