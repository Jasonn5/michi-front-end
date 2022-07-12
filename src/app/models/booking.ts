import { User } from "../authentication/models/user";
import { ClassRoom } from "./classsroom";
import { Matter } from "./matter";

export class Booking {
    id?: number;
    matter: Matter;
    classroom: ClassRoom;
    date: Date;
    startTime: number;
    endTime: number;
    reason: string;
    user: User;
}