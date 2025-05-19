import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should render a list of games from the service', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const games = element.querySelectorAll('.game');

    expect(games.length).toBe(component.games.length);
  });

  it('should render a game of week', async () => {
    expect(element.querySelector('h1')).toBeFalsy();

    fixture.detectChanges();
    await fixture.whenStable();

    const h1 = element.querySelector('h1');

    expect(h1).toBeTruthy();
    expect(h1?.textContent).toBe('GAME OF THE WEEK');

    const image = element.querySelector(
      `img[alt="${component.gameOfTheWeek?.name}"]`
    );
    expect(image).toBeTruthy();
  });
});
