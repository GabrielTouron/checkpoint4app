import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  link: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {link: this.link}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.link = result;
      if (this.link) {
        this.router.navigate(['/video/new'], {queryParams: {link: this.link}})
      }

    });
  }

}
