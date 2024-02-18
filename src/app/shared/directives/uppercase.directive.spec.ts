import { UppercaseDirective } from './uppercase.directive';
import { ElementRef } from '@angular/core';

describe('UppercaseDirective', () => {
  it('should create an instance', () => {
    // Create a mock element ref usefull for texting like the input element
    const mockElementRef = new ElementRef(document.createElement('input'));
    const directive = new UppercaseDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
