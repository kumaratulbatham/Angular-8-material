import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from './shared/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    // @HostListener('window:unload', ['$event'])
    // unloadHandler(_event) {
    //     localStorage.clear();
    // }

    constructor(private translate: TranslateService, private authService: AuthenticationService) {
        translate.setDefaultLang('en');
    }

    ngOnInit() {
        this.authService.autoAuthUser();
    }
}
