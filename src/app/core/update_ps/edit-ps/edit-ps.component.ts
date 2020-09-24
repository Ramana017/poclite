import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-edit-ps',
  templateUrl: './edit-ps.component.html',
  styleUrls: ['./edit-ps.component.sass']
})
export class EditPsComponent implements OnInit {
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
}
