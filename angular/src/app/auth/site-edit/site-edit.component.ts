import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../core/_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.css']
})
export class SiteEditComponent implements OnInit {

  siteForm: FormGroup;
  submitted: boolean = false;

  currentSelectedOption = "";
  siteData: any = {};
  projectList: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.createForm2();
  }

  createForm2() {
    this.siteForm = this.fb.group({
      id: [''],
      projectName: ['', Validators.required],
      siteName: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
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


  // siteForm : projectName droplist
  onCurrentlySelected(currentVal: string) {
   
    this.currentSelectedOption = currentVal;
  }

  onUpdateSite() {
    this.submitted = true;
    if (this.siteForm.invalid) {
      return;
    }

    // console.log('site info' + JSON.stringify(this.siteForm.value));
    this.userService.updateSiteDetail(this.siteForm.value).subscribe((data: any) => {
     
      if (data['status'] == 'success') {
        this.toastr.success('site updated successfully', 'Success');
        this.router.navigate(['/auth/site-list']);
      }
    }, error => {
      this.toastr.error(error);
    });

  }

  ngOnInit(): void {
    this.getProjectList();
    this.getOneSiteInfo();
  }

  getOneSiteInfo() {
    this.route.params.subscribe(params => {
     let objId = params.id;
      this.userService.getOneSiteInfo(objId).subscribe(data => {
        this.siteData = data;
      });

    });

  }

}
