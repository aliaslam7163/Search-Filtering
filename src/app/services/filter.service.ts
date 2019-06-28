import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  _currentAvailableFilters;//behaviorsubject. keeps track of current state of available filters
  _currentInUseFilters; //behaviorsubject. keeps track of current state of filters in use
  _filterModelArray:any[]; // computational array for avaialbe filters
  _filtersInUseArray; //computational array for filters in use

  constructor() {}

  getAvailableSearch(){
    this._currentAvailableFilters =  [
    {label:'Client No.',name:'client',type:'CLIENT'},

    {label:'Transaction ID',name:'trxNo',type:'TEXT'},

    {label:'Job Name',name:'jobType',type:'MULTI',buttonLabel:'name',itemLabel:'name',inputModel:[{name: "Consolidated Pick Cartons and Loose Units",value: "CONSOLIDATED_PICK_CARTONS_LOOSE"},{name: "Consolidated Pick In Progress",value: "CONSOLIDATED_PICK_IN_PROGRESS"},{name: "Consolidated Pick Pallets",value: "CONSOLIDATED_PICK_PALLETS"},{name: "Load Shipment",value: "LOAD_SHIPMENT"},{name: "Packaging",value: "PACKAGING"},{name: "Pick Cartons and Loose Units", value: "PICK_CARTONS_LOOSE"},{name: "Pick Loose Units", value: "PICK_LOOSE_UNITS"},{name: "Pick Pallets", value: "PICK_PALLETS"},{name: "Pending Inventory Research", value: "PIR"},{name: "Put Away Handling Unit", value: "PUT_AWAY_HANDLING_UNIT"}]},

    {label:'Job Status',name:'status',type:'MULTI',inputModel:[{name:'New',value:'NEW'},{name:'Available',value:'AVAILABLE'},{name:'In Progress',value:'IN_PROGERESS'},{name:'Complete',value:'COMPLETE'},{name:'Cancelled',value:'CANCELLED'}],itemLabel:'name',buttonLabel:'name'},

    {label:'Date Range',name:'dateRange',type:'SELECT',inputModel:[{name: "All", value: "NONE"},{name: "Today", value: "TODAY"},{name: "Last Two Days", value: "LAST_TWO_DAYS"},{name: "Last Seven Days", value: "LAST_SEVEN_DAYS"}]},

    {label:'Distribution Center',name:'dcNo',type:'SELECT',inputModel:[{oid: "3210007412511210610", dcNo: -23826, name: "JDC_-23826", value: -23826},{oid: "2490006175411050810", dcNo: -3, name: "Seahawks", value: -3},{oid: "6290006175411050810", dcNo: -2, name: "Randomly Created", value: -2},{oid: "1008751540113170101", dcNo: 1, name: "BASIC DC #1 US DEFAULT", value: 1},{oid: "1005675024016080100", dcNo: 2, name: "TEST DC # 2 STANDARD", value: 2},], itemLabel:'dcNoName',maxHeight:'250px'},

    {label:'Region',name:'region',type:'TEXT'},

    {label:'Drop Location',name:'dropOff',type:'TEXT'},

    {label:'Load No',name:'loadNo',type:'TEXT'}
  ];
  let _dataCopy = this._currentAvailableFilters;
  return _dataCopy;
  }

  clientTypeAhead(incomingRequest:any){
     return console.log(`http://qacombo001.dr1.ei:8121/edmsuiserv/pages/edms-setup.html#!/dc/${incomingRequest}`);
  }
}