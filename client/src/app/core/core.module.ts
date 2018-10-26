import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'; 


@NgModule({
  imports: [
    CommonModule,
  	MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ], 
  declarations: [HeaderComponent, FooterComponent]
})

export class CoreModule { 

	constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
      }
    }
}
