import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hero-uppercase]',
  standalone: true,
})
export class UppercaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    let value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = value.toUpperCase();
  }
}
