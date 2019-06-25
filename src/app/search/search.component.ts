import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  availableSearch:any[] = [
    {outputModel:'',label:'Name',code:'name',searchField:{type:'text',label:'Name',code:'name'}},
    {outputModel:'',label:'Carrier Code',code:'code',searchField:{type:'text',label:'Carrier Code',code:'code'}},
    {outputModel:'',label:'Defined By',code:'definedby',searchField:{type:'text',label:'Defined By',code:'definedby'}},
    {outputModel:'',label:'Status',code:'status',options:['active','inactive'],searchField:{type:'select',label:'Status',code:'status'}},
    {outputModel:'',label:'Carriers',code:'carrier',options:['UPS','DHL','Fedex'],searchField:{type:'multi',label:'Carriers',code:'carrier'}}
  ];
  searchFields = ['Name','Carrier','Status','DefinedBy'];
  availableFields:any[] = ['Name','Carrier','Status','DefinedBy'];
  filterSelected;
  inUse= new Array();
  dynamicInUse = new Array();
  dynamicObj = {
    outputModel:'Name',
    label:'Name',
    code:'name',
    searchField:{
      type:'text',
      label:'Name',
      code:'name'
      },
    availableFilter:['Name','Carrier','Status','DefinedBy'],
    disabled:false
  };

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.dynamicInUse.push(this.availableSearch[0]);
  }
  addFieldsDynamic(filterUse,value){
    if(this.dynamicInUse.length < this.availableFields.length){
        let temp = this.availableSearch.filter((element) => {
        return this.dynamicInUse.filter((filtersUsed) => {
          return filtersUsed.label == element.label;
        }).length == 0;
      });
      console.log(temp.map((obj) => {return obj.label}));
      let newObj = {
          outputModel:temp[0].label,
          label:'Name',
          code:'name',
          searchField:{
            type:'text',
            label:'Name',
            code:'name'
            },
          availableFilter:temp.map((obj) => {return obj.label}),
          disabled:false
  };
      //console.log(temp);
      this.dynamicInUse.forEach((element) => element.disabled=true);
      this.dynamicInUse.push(newObj);
    }
  }

  
  setModelDynamic(filterInUse,value){
    //console.log(filterInUse);
    //console.log(value);
    this.dynamicInUse[this.inUse.length-1].outputModel = value;
    console.log(this.dynamicInUse);
  }
}
