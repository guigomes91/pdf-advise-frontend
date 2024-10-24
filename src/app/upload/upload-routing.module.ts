import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPdfComponent } from './upload-pdf/upload-pdf.component';

const routes: Routes = [
  { path: '', component: UploadPdfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
