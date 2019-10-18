import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppConstants } from './constants/app.constant';
import { GlobalErrorHandler } from './helpers';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
    ],
    declarations: [
    ],
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [AuthenticationService, AppConstants,
                { provide: ErrorHandler, useClass: GlobalErrorHandler },
            ],
        };
    }
}
