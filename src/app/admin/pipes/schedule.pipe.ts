import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'schedule'
})
export class SchedulePipe implements PipeTransform {

    transform(value: number): string {
        if (value == 1) {
            return 'Lunes';
        }
        if (value == 2) {
            return 'Martes';
        }
        if (value == 3) {
            return 'Miercoles';
        } 
        if (value == 4) {
            return 'Jueves';
        }
        if (value == 5) {
            return 'Viernes';
        }
        if (value == 6) {
            return 'Sabado';
        }
    }
}