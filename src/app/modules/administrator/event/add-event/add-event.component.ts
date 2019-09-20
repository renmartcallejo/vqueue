import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import * as $ from 'jquery';
import { environment } from '../../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../../../core/services/map.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() user: any;
  map;
  markedAddress;
  closed: boolean = false;
  mapMarker;

  event = {
    title: '',
    location: '',
    lng: '',
    lat: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  }

  alert = {
    type: '',
    message: ''
  }

  showAlert: boolean = false;

  constructor(private adminService: AdminService, private mapService: MapService, private userService: UserService) {
    mapboxgl.accessToken = environment.mapbox.accessToken;

   }

  ngOnInit() {
    let dateNow = this.initDateTimeNow('/');
    this.event.startDate = dateNow.date;
    this.event.endDate = dateNow.date;
    this.initializeMap();
  }

  initializeMap(){
    this.userService.userState
      .subscribe(user => {
        this.user = user;
      })
    this.map = new mapboxgl.Map({
      container: 'myMap',
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center: [120.98605383801407, 14.603771226305014],
      zoom: 10,
    });
      

    this.map.on('click', (event) => {    
      const coordinates = [event.lngLat.lng, event.lngLat.lat]

      console.log(event);
      this.mapMarker = new mapboxgl.Marker()  
      .setLngLat(coordinates)
      .addTo(this.map);

      let data = event.lngLat.lng + ',' +event.lngLat.lat+ '.json?types=poi&access_token='+ mapboxgl.accessToken + "";
      this.mapService.getSpecificPlace(data).then(payload => {
        this.markedAddress = payload;
        this.event.location = this.markedAddress.features[0].place_name;
        this.event.lng = event.lngLat.lng;
        this.event.lat = event.lngLat.lat;
      });

    });

  }

  ngOnChanges(){
    console.log(this.user);
  }

  toHide(){
    this.closed = true;

    this.closed ? this.close.emit(this.closed) : this.close.emit(false);
  }

  initDateTimeNow(attr){
    let format = {
      date: '',
      time: ''
    }
    let current_datetime = new Date()
    let formatted_date = (current_datetime.getMonth() + 1) + attr + current_datetime.getDate() + attr + current_datetime.getFullYear();
    let time = current_datetime.getHours() + attr + current_datetime.getMinutes() + attr + current_datetime.getSeconds();
    format.date = formatted_date;
    format.time = time;

    return format;
  }

  formatEventId(){
    let dateNow = this.initDateTimeNow("-");
    let timeNow = this.initDateTimeNow(":");
    let formatted_date = dateNow.date;
    let time = timeNow.time;
    let date = this.splitInput(formatted_date, '-') + this.splitInput(time, ':')
    return this.reverseString(date);
  }

  splitInput(str, split){
    return str.split(split).join('')
  }

  reverseString(str) {
    var splitString = str.split(""); 
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); 
    return joinArray; 
}

  addNewEvent(){

    // let user = {
    //   [this.user.email]: {
    //     [this.user.email]: this.user.email
    //   },
    // }

    let data = {
      'event_id': 'evt_'+this.formatEventId(),
      'added_by': this.user.email,
      'company': 'Test Inc.',
      'end_date': this.event.endDate,
      'end_time': this.event.endTime,
      'start_date': this.event.startDate,
      'start_time': this.event.startTime,
      'location': this.event.location,
      'longitude': this.event.lng,
      'latitude': this.event.lat,
      'queue': {
          'user':{
            'user_1': {
              name: 'test1',
              status: '0'
            },
            'user_2': {
              name: 'test2',
              status: '0'
            }
          }
      },
      'title' : this.event.title,
    }

    console.log(data);

    return this.adminService.addNewEvent(data)
      .then(response => { 
        if(response){
          this.clearEventValues();
          this.showAlert = true;
          this.alert = {
            type: 'alert-success',
            message: 'You have successfully added an event!'
          }
        }
        else{
          this.showAlert = false;
        }
      });
  }

  clearEventValues(){
    let dateNow = this.initDateTimeNow('/');
    this.event = {
      title: '',
      location: '',
      lng: '',
      lat: '',
      startDate: dateNow.date,
      startTime: '',
      endDate: dateNow.date,
      endTime: ''
    }
    this.mapMarker.remove();
  }
}
