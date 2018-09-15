import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private userService: UserService, ) { }

  
  ngOnInit() {
    let code = this.route.snapshot.paramMap.get('code');
    this.userService.verificateUser(code).subscribe(res => {
    }, (err) => {
      console.log(err);
  });
  }



}
