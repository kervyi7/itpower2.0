import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAppConfig } from '../interfaces/app-config';
import { CommonModule, ViewportScroller } from '@angular/common';
import { IAdvantage } from '../interfaces/advantage';
import { ButtonComponent } from '../components/button/button.component';
import { CardComponent } from '../components/card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss', '../../assets/styles/hamburger.scss', '../../assets/styles/circles.scss'],
  imports: [CommonModule, ButtonComponent, CardComponent, TranslateModule, FormComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, AfterViewInit {
  @ViewChild('cardContainer') cardContainer!: ElementRef;
  @HostListener('window:resize')
  public onResize() {
    this.isMobile = this.isMobileResolution(window.innerWidth);
    this.isSmallMobile = this.isSmallMobileResolution(window.innerWidth);
  }

  @HostListener('window:scroll')
  public onScroll() {
    if (this.isMenuOpened) {
      return;
    }
    this.pagesTop = this.isTop();
  }

  @HostListener('mousedown', ['$event'])
  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
    this._pos = {
      left: this.cardContainer.nativeElement.scrollLeft,
      top: this.cardContainer.nativeElement.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };
  };

  @HostListener('mousemove', ['$event'])
  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const dx = e.clientX - this._pos.x;
      const dy = e.clientY - this._pos.y;
      this.cardContainer.nativeElement.scrollTop = this._pos.top - dy;
      this.cardContainer.nativeElement.scrollLeft = this._pos.left - dx;
    }
  };

  @HostListener('mouseup')
  mouseUpHandler() {
    this.mouseDown = false;
  }

  @Input() public config!: IAppConfig;
  private _colors: string[] = ["#C7D1E9", "#E5FDCC", "#F8EDD5", "#BFB9DC", "#E9CCCB", "#C7D1E9"];
  private _pos = { top: 0, left: 0, x: 0, y: 0 };
  public isSmallMobile = false;
  public date = new Date();

  public mouseDown = false;
  public advantages: IAdvantage[] = [];
  public pagesTop = true;
  public selectedLanguage = 'ua';
  public isMobile = false;
  public isMenuOpened = false;

  constructor(private _translate: TranslateService,
    private _scroller: ViewportScroller) {
  }

  public ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem("lang") || 'ua';
    this._translate.addLangs(['en', 'ua']);
    this._translate.setDefaultLang(this.selectedLanguage);
  }

  public ngAfterViewInit() {
    this.isMobile = this.isMobileResolution(window.innerWidth);
    this.isSmallMobile = this.isSmallMobileResolution(window.innerWidth);
    const maxColors = 5;
    let colorIndex = 0;
    for (let i = 0; i < this.config.advantagesCount; i++) {
      const item = { header: `ADVANTAGES.TITLE${i + 1}`, text: `ADVANTAGES.TEXT${i + 1}`, color: this._colors[colorIndex] };
      this.advantages.push(item);
      if (colorIndex == maxColors) {
        colorIndex = 0;
      } else {
        colorIndex++;
      }
    }
  }

  public goToLink(url: string, isBlank: boolean): void {
    if (isBlank) {
      window.open(url, "_blank");
    } else {
      window.open(url, "_self");
    }
  }

  public changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this._translate.use(lang);
    localStorage.setItem("lang", lang);
  }

  public scrollTo(target: string) {
    if (this.isMenuOpened) {
      this.toggleMenu();
    }
    setTimeout(() => {
      this._scroller.scrollToAnchor(target);
    }, 0);
  }

  public toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    if (this.pagesTop) {
      return;
    }
    this.pagesTop = !this.pagesTop;
  }

  public callTo(phone: string) {
    if (this.isMobile) {
      this.goToLink("tel:" + phone, false);
    }
  }

  private isMobileResolution(width: number): boolean {
    return width <= 1280;
  }

  private isSmallMobileResolution(width: number): boolean {
    return width <= 767;
  }

  private isTop(): boolean {
    return window.scrollY == 0;
  }
}
