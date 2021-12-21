export interface UserLogin {
  email: string;
  password: string;
}

export interface UserInfor {
  email: string;
  password: string;
  token: string;
  username?: string;
}

export interface UserResponse {
  user: UserInfor;
}

export interface IVehicle {
  TruckPlate: string;
  CargoType: string[];
  Driver: string;
  TruckType: number;
  Price: number;
  Dimension: string;
  ParkingAddress: string;
  ProductionYear: string;
  Status: string;
  Description: string;
  id?: number;
}
