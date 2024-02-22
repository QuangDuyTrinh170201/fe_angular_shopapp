import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  //adminComponent: string = 'orders';
  userResponse?:UserResponse | null;
  constructor(
    private userService: UserService,       
    private tokenService: TokenService,    
    private router: Router,
  ) {
    
   }
  ngOnInit() {
    this.userResponse = this.userService.GetUserResponseFromLocalStorage();    
    //default router
    this.router.navigate(['/admin/orders']);
   }  
  logout() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.GetUserResponseFromLocalStorage();    
    this.router.navigate(['/']);
  }
  showAdminComponent(componentName: string): void {
    //this.adminComponent = componentName;orders,categories
    if(componentName=='order') {
      this.router.navigate(['/admin/orders']);
    } else if(componentName=='category') {
      this.router.navigate(['/admin/categories']);
    }else if(componentName=='product') {
      this.router.navigate(['/admin/products']);
    }
    
  }
}
