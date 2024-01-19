
export interface Flight {
  id?: number;
  airline: string;
  date: string;
  capacity: string;
  code: string;

}

export interface FlightState {
  records: Flight[];
  loading: boolean;
  error: string | null;
  selectedRecord: Flight | null;
}



export interface FlightListItemsProps {
  flights: Flight[],
}
