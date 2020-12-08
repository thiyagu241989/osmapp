import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../core/_services';

@Component({
  selector: 'app-projectsite-list',
  templateUrl: './projectsite-list.component.html',
  styleUrls: ['./projectsite-list.component.css']
})
export class ProjectsiteListComponent implements OnInit {

  siteList:any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  getSiteList() {
    this.userService.getSiteInfo().subscribe(data => {
      this.siteList = data;
    
    });
  }

  ngOnInit(): void {
    this.getSiteList();
  }

}
