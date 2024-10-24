import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPdfComponent } from './upload/upload-pdf/upload-pdf.component';
import { ChatRoomComponent } from './chat/chat-room/chat-room.component';

const routes: Routes = [
  { path: 'upload', component: UploadPdfComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: '**', redirectTo: '/upload' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
