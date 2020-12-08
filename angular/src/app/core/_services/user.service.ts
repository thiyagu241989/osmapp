import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class UserService {

    ENVIRONMENT_URL = environment.apiUrl;

    headers: any;
    emails: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    getProjectInfo() {
        return this.http.get(`${this.ENVIRONMENT_URL}/projectinfo`)
            .pipe(map((data: any) => {
                return data;
            }));
    }

    getSiteInfo() {
        return this.http.get(`${this.ENVIRONMENT_URL}/siteInfo`)
            .pipe(map((data: any) => {
                return data;
            }));
    }

    addProjectDetail(data) {
        return this.http.post(`${this.ENVIRONMENT_URL}/projectinfo/add`, data);

    }

    addSiteDetail(data) {
        return this.http.post(`${this.ENVIRONMENT_URL}/siteInfo/add`, data);
    }


    updateSiteDetail(data) {
        return this.http.post(`${this.ENVIRONMENT_URL}/siteInfo/update/${data.id}`, data);
    }

    getOneSiteInfo(id) {
        return this.http.get(`${this.ENVIRONMENT_URL}/siteInfo/edit/${id}`);
    }

    getSearchSiteInfoByProject(name:any) {
        console.log(name);
        return this.http.get(`${this.ENVIRONMENT_URL}/siteInfo/view/${name}`);
    }

    // update(user: User) {
	//     return this.http.post(`api/users/update/${user.id}`, user);
    // }
    //-----------------------------------------------------------------------------------

    headerAuthorization() {
        console.log('token H:' + localStorage.getItem('token'));
        return new HttpHeaders().set("Authorization", localStorage.getItem('token'));
       
    }
    // ----------------------------------------------------------    
}