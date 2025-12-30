import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
