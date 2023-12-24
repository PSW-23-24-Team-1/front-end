import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Club } from '../model/club.model';
import { MarketplaceService } from '../marketplace.service';

@Component({
  selector: 'xp-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit{
  clubId: any
  club: Club = {id: 0, name: '', description: '', image: '', ownerId: 0}
  constructor(private route: ActivatedRoute, private service: MarketplaceService){}
  ngOnInit(): void {
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

}
