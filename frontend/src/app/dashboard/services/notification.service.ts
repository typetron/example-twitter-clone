import { Injectable } from '@angular/core';
import { users as allUsers } from '../../util';

export interface Notification {
    icon: string;
    title: string;
    content: string;
    users: string[];
}

abstract class BaseNotification {
    abstract titleSuffix: string;

    constructor(public content: string, public users: string[]) {}

    get title(): string {
        return this.users.length === 1
            ? `${this.users[0]} ${this.titleSuffix}`
            : this.users.length === 2
                ? `${this.users[0]} and ${this.users[1]} ${this.titleSuffix}`
                : `${this.users[0]} and ${this.users.length - 1} others ${this.titleSuffix}`;
    }
}

class LikeNotification extends BaseNotification implements Notification {
    icon = 'like';
    titleSuffix = 'liked your tweet';
}

class RetweetNotification extends BaseNotification implements Notification {
    icon = 'retweet';
    titleSuffix = 'retweeted your tweet';
}

class CommentNotification extends BaseNotification implements Notification {
    icon = 'comment';
    titleSuffix = 'commented on your tweet';
}

class FollowNotification extends BaseNotification implements Notification {
    icon = 'user';
    titleSuffix = 'followed you';
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    factories = [LikeNotification, RetweetNotification, CommentNotification, FollowNotification];

    contents = [
        'Deserunt dignissimos eos eveniet harum, incidunt ipsa mollitia numquam repudiandae voluptas voluptatem.',
        'Atque dolores earum eligendi natus possimus sed vitae. Atque cum deserunt dignissimos dolorem magnam minus molestias mollitia, possimus quam quasi quos totam.',
        'Doloremque earum laborum necessitatibus nemo nesciunt officia quasi repudiandae rerum ullam. At officia repudiandae totam voluptates! Aut beatae commodi excepturi, quia rem velit. Atque cum dolorem obcaecati.',
    ];

    // ({
    //     type: ['like', 'retweet', 'comment', 'follow'][Math.ceil(Math.random() * 4 - 1)],
    //     content: this.contents[Math.ceil(Math.random() * this.contents.length) - 1],
    //     users: new Array(Math.ceil(Math.random() * 5 - 1)).fill(0),
    // })
    notifications = new Array(20).fill(0).map(i => {
        const factory = this.factories.random();
        const usersNames = new Array(Math.ceil(Math.random() * 5)).fill('').map(() => allUsers.random());
        return new factory('', usersNames);
    });

    getNotifications(): Promise<Notification[]> {
        return new Promise(resolve => setTimeout(() => {
            resolve(this.notifications);
        }, Math.random() * 750 + 250));
    }
}
