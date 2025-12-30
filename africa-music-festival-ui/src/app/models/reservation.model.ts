export interface Reservation {
  id: number;
  eventId: number;
  customerName: string;
  customerEmail: string;
  numberOfTickets: number;
  status: string;
}
