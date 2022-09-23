import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBarComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
}
