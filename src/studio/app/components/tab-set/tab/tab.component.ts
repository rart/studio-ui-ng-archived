import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'studio-tab',
  styleUrls: ['./tab.component.scss'],
  template: `
    <div class="studio-tab" [class.active]="active">
      <ng-content></ng-content>
    </div>`
})
export class TabComponent implements OnInit {

  @Input() title: string;

  active: boolean = false;

  ngOnInit() {
  }

}
