import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../../stakeholder/model/person.model';
import {
  faEnvelope,
  faUserCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../stakeholder/message-dialog/message-dialog/message-dialog.component';
@Component({
  selector: 'xp-user-club-row',
  templateUrl: './user-club-row.component.html',
  styleUrls: ['./user-club-row.component.css']
})

export class UserClubRowComponent {
  currentUserId: number;
    @Input() user: User;
    @Input() person: Person;
    @Input() followId: number;
    @Input() followStatus: boolean;
    @Input() enableFollow: boolean = false;
    @Output() unfollowOrFollowEvent = new EventEmitter<number>();

    faEnvelope = faEnvelope;
    faUserPlus = faUserPlus;
    faUserCheck = faUserCheck;

    constructor(public dialog: MatDialog) {}

    openMessageDialog(reciverID: number): void {
        this.dialog.open(MessageDialogComponent, {
            data: {
                userId: this.currentUserId,
                reciverId: reciverID,
            },
        });
    }

    unfollowOrFollow(id: number): void {
        this.unfollowOrFollowEvent.emit(id);
    }
}
