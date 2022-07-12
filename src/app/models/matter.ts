import { User } from "../authentication/models/user";
import { ClassroomSchedule } from "./classroomSchedule";

export class Matter {
    id?: number;
    name: string;
    numberStudents: number;
    group: string;
    user: User;
    classroomSchedules: ClassroomSchedule[]
}