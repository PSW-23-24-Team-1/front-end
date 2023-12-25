import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Club } from '../model/club.model';
import { MarketplaceService } from '../marketplace.service';
import { MatDialog } from '@angular/material/dialog';
import { ClubMembersDialogComponent } from '../club-members-dialog/club-members-dialog.component';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit{
  clubId: any
  user: User
  club: Club = {id: 0, name: '', description: '', image: '', ownerId: 0}
  constructor(private route: ActivatedRoute, private service: MarketplaceService, public dialog: MatDialog,
    private authService: AuthService){}
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
    });
    this.clubId = this.route.snapshot.paramMap.get('id');
    this.getClub()
  }
  getClub(): void {
    this.service.getClub(this.clubId).subscribe({
      next: (result: Club) => {
        this.club = result;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }
  openFollowingsDialog() {
    const dialogRef = this.dialog.open(ClubMembersDialogComponent, {
        data: {
            clubId: this.clubId,
            userId: this.user.id
        },
    });
  }

}
