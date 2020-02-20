import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr:ToastrService) { }

  showSuccess(msg){
    this.toastr.success(msg);
  }

  showError(msg){
    this.toastr.warning(msg);
  }
}
