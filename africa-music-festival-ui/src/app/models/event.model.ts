export interface FestivalEvent {
  id: number;
  city: string;
  country: string;
  venue: string;
  openingActs: string;
  attendanceRaw: string;
  revenueRaw: string;
  tour: string;
  availableTickets: number;
  name?: string;
  eventDate?: string;
  ticketPrice?: number;
  status: 'ACTIVE' | 'CANCELLED';
}
