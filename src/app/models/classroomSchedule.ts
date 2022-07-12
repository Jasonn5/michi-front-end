import { ClassRoom } from "./classsroom";

export class ClassroomSchedule {
    id?: number;
    day: number;
    startHour: number;
    endHour: number;
    classRoom: ClassRoom;
}