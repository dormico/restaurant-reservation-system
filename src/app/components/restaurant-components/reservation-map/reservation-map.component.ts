import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldTypes } from 'src/app/models/restaurant.type';
import { RestaurantAdminService } from 'src/app/services/restaurant-admin.service';
import { Map } from "src/app/models/restaurant.type";

@Component({
  selector: 'app-reservation-map',
  templateUrl: './reservation-map.component.html',
  styleUrls: ['./reservation-map.component.css']
})
export class ReservationMapComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private ras: RestaurantAdminService) { }

  public mapSize: number = 9;
  public iterator: number[];
  public FieldTypes = FieldTypes;

  mapForm = this.fb.group({
    mapName: ['', Validators.required],
    mapImage: [''],
    fields: this.fb.array([])
  });

  ngOnInit(): void {
    this.initMap();
  }
  get mapName() {
    return this.mapForm.get('mapName').value as FormControl;
  }
  get fields() {
    return this.mapForm.get('fields') as FormArray;
  }
  private setMapSize() {
    this.iterator = [];
    this.fields.clear();
    for (let i = 0; i < this.mapSize; i++) {
      this.iterator.push(i);
      let row = this.fb.array([])
      for (let j = 0; j < this.mapSize; j++) {
        let group;
        if (this.ras.Restaurant.tables.fields.length == this.mapSize) {
          group = {
            type: this.fb.control(this.ras.Restaurant.tables.fields[i][j].type),
            data: this.fb.control(this.ras.Restaurant.tables.fields[i][j].data)
          }
        } else {
          group = {
            type: this.fb.control(FieldTypes.tile),
            data: this.fb.control(2)
          }
        }
        row.push(
          this.fb.group(
            group
          )
        );
      }
      this.fields.push(row);
    }
  }
  private initMap() {
    if (this.ras.Restaurant.tables.fields.length != 0) {
      this.mapSize = this.ras.Restaurant.tables.size;
      this.mapForm.patchValue({
        mapName: this.ras.Restaurant.tables.name
      });
    }
    this.setMapSize();
  }
  private getMapObject(): Map {
    let map: Map = {
      name: '',
      size: 0,
      fields: []
    }
    map.name = this.mapForm.value.mapName;
    map.image = this.mapForm.value.mapImage;
    map.size = this.mapSize;
    for (let i = 0; i < this.mapSize; i++) {
      let arr = [];
      for (let j = 0; j < this.mapSize; j++) {
        let fi = this.mapForm.value.fields.at(i)[j];
        arr.push({ type: fi.type, data: fi.data });
      }
      map.fields.push(arr);
    }
    return map;
  }
  private getRow(i: number) {
    return this.fields.at(i) as FormArray;
  }
  private getFieldType(row: number, i: number) {
    return this.getRow(row).at(i).get('type').value;
  }
  private getFieldData(row: number, i: number) {
    return this.getRow(row).at(i).get('data').value;
  }
  private setFieldType(row: number, i: number, value: string) {
    value == FieldTypes.table ? this.getRow(row).at(i).get('data').setValue(2) : this.getRow(row).at(i).get('data').setValue(0);
    this.getRow(row).at(i).get('type').setValue(value);
  }
  private setFieldData(row: number, i: number, value: string) {
    let newValue = this.getFieldData(row, i) + value;
    if(+newValue > 0) {
      this.getRow(row).at(i).get('data').setValue(newValue);
    }
  }
  public extendMap() {
    if (this.mapSize <= 15) {
      this.mapSize += 2;
      this.setMapSize();
    };
    console.log("Map size: " + this.mapSize);
  }
  public reduceMap() {
    if (this.mapSize >= 7) {
      this.mapSize -= 2;
      this.setMapSize();
    }
  }
  public switchField(row: number, index: number) {
    let field = this.getFieldType(row, index);
    switch (field) {
      case FieldTypes.tile: field = FieldTypes.wall; break;
      case FieldTypes.wall: field = FieldTypes.table; break;
      case FieldTypes.table: field = FieldTypes.door; break;
      case FieldTypes.door: field = FieldTypes.window; break;
      case FieldTypes.window: field = FieldTypes.toilet; break;
      case FieldTypes.toilet: field = FieldTypes.stairs; break;
      case FieldTypes.stairs: field = FieldTypes.food; break;
      case FieldTypes.food: field = FieldTypes.tile; break;
    }
    this.setFieldType(row, index, field);
  }
  public goToDashboard() {
    this.ras.addRestaurant();
    let rId = this.ras.Id;
    console.log("rId: " + rId);
    rId == '' ? rId = '0' : rId;
    this.router.navigateByUrl('restaurant/' + rId + '/dashboard');
  }
  public save() {
    let r = this.ras.Restaurant;
    r.tables = this.getMapObject();
    this.ras.Restaurant = r;
    this.goToDashboard();
  }
}