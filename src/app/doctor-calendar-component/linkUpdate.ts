export class linkUpdate {
    reservationId: string
    meetingLink: string;

    constructor(id: string, meet: string) {
        this.reservationId = id;
        this.meetingLink = meet;
    }
}