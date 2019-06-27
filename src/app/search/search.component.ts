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
      availableSelections:this.availableSearch.map((ele) => {return ele.label}),
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
    if(this.availableFields.length > 0){
      console.log(this.dynamicInUse.length,this.availableSearch.length);
        this.availableSearch = this.availableSearch.filter((element) => {
        return this.dynamicInUse.filter((filtersUsed) => {
          return filtersUsed.label == element.label;
        }).length == 0;
      });
      console.log(this.availableSearch);
      //console.log(this.dynamicInUse);
      this.dynamicInUse.forEach((element) => element.disabled=true);
      let filter:Partial<Filter> = {
      label:this.availableSearch[0].label,
      name:this.availableSearch[0].name,
      type:this.availableSearch[0].type,
      disabled:false,
      outputModel:this.availableSearch[0].label,
      availableSelections:this.availableSearch.map((ele) => {return ele.label}),
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
    this.dynamicInUse[this.dynamicInUse.length - 1] = this.availableSearch.filter((element) => {
      return element.label == value;
    }).map((obj) => {
      let filter:Partial<Filter>
      return filter = {
      label:obj.label,
      name:obj.name,
      type:obj.type,
      inputModel:obj.inputModel ? obj.inputModel : [],
      disabled:false,
      outputModel:obj.label,
      availableSelections:this.availableSearch.map((ele) => {return ele.label}),
      setValue:''
    }
    })[0];
  }

  grabFilterModel(search:string){}

  getOutputModel(name:any,value:any=''){
    //let obj = {name:value};
  }

  removeSelection(index:number,selection:any){
   // console.log(this.availableSearch);
    let position = this.dynamicInUse.indexOf(selection);
    if(position > -1){
      var removed = this.dynamicInUse.splice(position,1);
      //console.log("removed item is" ,removed[0]);
      var _filter = this.searchFields.filter((element) => {
        //console.log(element);
        return element.label == removed[0].label});
      this.availableSearch.push(_filter[0]);
      console.log)this.availableSearch);
    }
    // let _filter = this.availableSearch.filter((element) => {
    //   return element.label == selection.label;
    //   //console.log(_filter);
    //   this.availableSearch.push(_filter[0]);
    //   this.dynamicInUse.splice(index,1);
    //   this.dynamicInUse[this.dynamicInUse.length-1].disabled = !this.dynamicInUse[this.dynamicInUse.length-1].disabled
    // });
    // console.log(this.availableSearch)
     
  }
}
