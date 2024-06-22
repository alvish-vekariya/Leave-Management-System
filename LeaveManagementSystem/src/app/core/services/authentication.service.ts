import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IloginData, IsignupData } from '../interfaces/authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = 'http://localhost:3000/user/';
  private leaveurl: string = 'http://localhost:3000/leave/'

  constructor(private http :HttpClient) { }

  isLogged : boolean = JSON.parse(localStorage.getItem('islogged') as string | "false");
  username: string = JSON.parse(localStorage.getItem('username') as string | "");

  signup(value: IsignupData){
    return this.http.post(`${this.url}signup`, value);
  }

  login(value : IloginData){
    return this.http.post(`${this.url}login`, value)
  }

  getUser(value: string){
    return this.http.get(`${this.url}getUser?username=${value}`);
  }

  getLeaves(){
    return this.http.get(`${this.leaveurl}admin/getLeaves`);
  }

  logout(value: string){
    return this.http.post(`${this.url}logout?userId=${value}`, "");
  }

  userLeaves(userId: string){
    return this.http.get(`${this.leaveurl}user/getLeaves?userId=${userId}`);
  }

  leaveApprove(id: string, status: string){
    return this.http.put(`${this.leaveurl}admin/reviewLeave`,{leaveId: id, status:status});
  }

  applyleave(data : any){
    return this.http.post(`${this.leaveurl}user/addLeaves`, data);
  }

  getCustomLeave(data: any){
    return this.http.get(`${this.leaveurl}user/getLeavesCustom?userId=${data.userId}&status=${data.status}`);
  }
}
