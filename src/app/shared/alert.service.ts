import { Injectable } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccess(msg){
    //this.toastr.success(msg);
  }
}
