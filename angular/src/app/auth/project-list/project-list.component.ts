import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../core/_services';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projectList:any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

    getProjectList() {
      this.userService.getProjectInfo().subscribe(data => {
        this.projectList = data;
      });
    }

  ngOnInit(): void {
    this.getProjectList();
  }

}
