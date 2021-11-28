export interface IBooking {
    id : string;
    roomId : string;
    roomName : string;
    customerId : string;
    checkIn : Date;
    checkOut : Date;
    cancelled : boolean;
}