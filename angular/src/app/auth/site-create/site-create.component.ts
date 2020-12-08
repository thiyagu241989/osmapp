import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../core/_services';
import { ToastrService } from 'ngx-toastr';
// var osm = require('osm');
declare var ol: any;
let myWindow = window as any;

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-site-create',
  templateUrl: './site-create.component.html',
  styleUrls: ['./site-create.component.css']
})
export class SiteCreateComponent implements OnInit {

  projectForm: FormGroup;
  submitted2: boolean = false;


  siteForm: FormGroup;
  submitted: boolean = false;

  currentSelectedOption = "";

  latitude: number = 18.5204;
  longitude: number = 73.8567;

  map: any;

  projectList: any = {};

  searchList: any = {};

  searchProjectName;
  modalReference: NgbModalRef;
  closeResult: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.createForm();
    this.createForm2();
  }

  createForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createForm2() {
    this.siteForm = this.fb.group({
      projectName: ['', Validators.required],
      siteName: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }

  get s() {
    return this.projectForm.controls;
  }

  get f() {
    return this.siteForm.controls;

  }

  // Get project List -------------------------------------
  getProjectList() {
    this.userService.getProjectInfo().subscribe(data => {
      this.projectList = data;
    });
  }

  // create project openModal Popup  ------------------------------
  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
   
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
      this.getProjectList();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //-------------------------------------------------------------------------

  onSubmitProject() {
    this.submitted2 = true;
    if (this.projectForm.invalid) {
      return;
    }

    this.userService.addProjectDetail(this.projectForm.value).subscribe((data: any) => {
    
      if (data['status'] == 'success') {
        this.modalReference.close();
        this.toastr.success('Project added successfully', 'Success');
        this.getProjectList();
        // this.router.navigate(['/auth/project-list']);
      }
    }, error => {
      this.toastr.error(error);
    });

  }



  // siteForm : projectName droplist
  onCurrentlySelected(currentVal) {
   
    this.currentSelectedOption = currentVal.value;
  }

  onSubmitSite() {
    this.submitted = true;
    if (this.siteForm.invalid) {
      return;
    }

   
    this.userService.addSiteDetail(this.siteForm.value).subscribe((data: any) => {
     
      if (data['status'] == 'success') {
        this.toastr.success('site added successfully', 'Success');
        this.router.navigate(['/auth/site-list']);
      }
    }, error => {
      this.toastr.error(error);
    });

  }




  onCurrentlySearch(currentVal) {
   
    this.searchProjectName = currentVal.value;
    this.userService.getSearchSiteInfoByProject(this.searchProjectName).subscribe(data => {
      this.searchList = data;
  
      this.osmSearchInit(this.searchList[0].latitude, this.searchList[0].longitude);
    });

  }

  osmSearchInit(latitudeVal, longitudeVal) {

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([latitudeVal, longitudeVal]),
        zoom: 8
      })
    });
    this.addPoint(latitudeVal, longitudeVal);

  }


  osmInit() {

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
    this.addPoint(this.latitude, this.longitude);

  }

  //assets/img/map.png
  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/img/map.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }


  ngOnInit() {
    // this.osmInit();
    this.getProjectList();
  }



}
