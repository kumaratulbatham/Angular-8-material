import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit, OnDestroy {
    public pushRightClass: string;
    private authListenerSubs: Subscription;
    userIsAuthenticated = false;

    constructor(public router: Router, private translate: TranslateService,
        private authService: AuthenticationService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }
    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        this.authService.logout();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
