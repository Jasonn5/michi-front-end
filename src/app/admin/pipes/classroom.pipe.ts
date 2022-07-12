import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'classroomType'
})
export class ClassRoomPipe implements PipeTransform {

    transform(value: number): string {
        if (value == 1) {
            return 'Aula';
        }
        if (value == 2) {
            return 'Laboratorio';
        }
        if (value == 3) {
            return 'Auditorio';
        }
    }
}