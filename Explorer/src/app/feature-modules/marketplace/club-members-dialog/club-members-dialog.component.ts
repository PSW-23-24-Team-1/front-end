import { Component, Inject, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClubMember } from '../model/club-member.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { StakeholderService } from '../../stakeholder/stakeholder.service';
import { Following } from '../../stakeholder/model/following.model';
import { FollowerCreate } from '../../stakeholder/model/follower-create.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../../stakeholder/model/person.model';
export interface ModalData {
  clubId: any
  userId: number
}
@Component({
  selector: 'xp-club-members-dialog',
  templateUrl: './club-members-dialog.component.html',
  styleUrls: ['./club-members-dialog.component.css']
})
export class ClubMembersDialogComponent implements OnInit{
  clubId: any
  userId: number
  user: User = {id: 0, role: 'tourist', username: '', isActive: true, profilePicture:''}
  person: Person = {id: 0, email: '', name: '', surname: '', user: this.user, userId: 0}
  m: ClubMember[] = []
  followings: Following[] = []
  members: Following[] = []
  followingsCount: number;
  constructor(
    private service: MarketplaceService,
    private stakeholderService: StakeholderService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ) {}
  ngOnInit(): void {
    this.userId = this.data.userId;
    this.clubId = this.data.clubId;
    this.loadFollowings()
    this.loadMembers()
    setTimeout(() => {
      this.createMemberFollowingsList()
    }, 500);
  }
  loadMembers(){
    this.service.getClubMembers(this.clubId).subscribe({
      next: (result: PagedResults<ClubMember>) => {
        this.m = result.results;
      },
      error: (errData) => {
        console.log(errData)
      }
    })
  }
  loadFollowings() {
    this.stakeholderService.getFollowings(this.userId).subscribe(result => {
        this.followings = result.results;
        this.followingsCount = this.followings.length;
        this.followings.forEach(item => {
            item.followingStatus = true;
        });
    });
  }
  createMemberFollowingsList(){
    
    let f: Following = {id: 0, following: this.user, followingPerson: this.person, followingStatus: false}
    this.members = []
    this.m.forEach(member => {
        f.id = 0
        f.following.id = member.userId
        f.following.username = member.username
        f.followingPerson.name = member.firstName
        f.followingPerson.surname = member.lastName
        f.followingPerson.id = member.userId
        f.followingStatus = false
        this.followings.forEach(following => {
          if(member.userId == following.following.id){
            f.followingStatus = true
            f.id = following.id
          }
        });
        if(member.userId != this.userId){
          this.members.push(f)
        }
    });
  }
  unfollowOrFollow(userId: number): void {
    var clicked = this.members.find(f => f.following.id == userId);
    if (clicked != undefined) {
        if (clicked.followingStatus) {
            this.stakeholderService.deleteFollowing(clicked.id).subscribe({
                next: () => {
                    if (clicked != undefined) {
                        clicked.followingStatus = false;
                    }
                },
            });
        } else {
            this.addFollowing(clicked);
        }
    }
  }
  addFollowing(following: Following): void {
      const followCreate: FollowerCreate = {
          followedById: this.userId,
          userId: following.following.id,
      };
      this.stakeholderService.addFollowing(followCreate).subscribe({
          next: (result: FollowerCreate) => {
              if (result.id != undefined) {
                  following.id = result.id;
              }
              following.followingStatus = true;
          },
      });
  }
}
