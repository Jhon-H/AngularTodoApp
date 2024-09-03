import { Pipe, PipeTransform } from '@angular/core';
import {
  TransparentColor,
  transparentColors,
} from '@shared/interfaces/colors.interface';

@Pipe({
  name: 'tagColor',
  standalone: true,
})
export class TagColorPipe implements PipeTransform {
  transform(color: string, fallbackColor: TransparentColor): TransparentColor {
    if ((transparentColors as string[]).includes(color)) {
      return color as TransparentColor;
    }

    return fallbackColor;
  }
}
