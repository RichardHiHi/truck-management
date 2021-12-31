import * as yup from 'yup';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export function clearAll() {
  return localStorage.clear();
}

export function getEmail() {
  return localStorage.getItem('email');
}

export function setEmail(email: string) {
  return localStorage.setItem('email', email);
}

export const validationSchema = yup.object({
  TruckPlate: yup
    .string()
    .required('* TruckPlate is required')
    .matches(
      /^[0-9]{2}[A-Z][0-9]-[0-9]{4,5}$/g,
      'TruckPlate is not valid(30A1-12345 or 30A1-1234)'
    ),
  CargoType: yup.array().min(1).required('* CargoType is required'),
  Driver: yup.string().trim().required('* Driver is required'),
  TruckType: yup
    .number()
    .min(10, 'TruckType Must be more than 10 ton')
    .max(100, 'TruckType Must be less than 100 ton')
    .required('* TruckType is required'),

  Price: yup
    .number()
    .min(1, 'Price Must be more than 0')
    .required('* Price is required'),
  Dimension: yup
    .string()
    .trim()
    .required('* Dimension is required')
    .matches(
      /^\d\d?(\.\d)?-\d(\.\d)?-\d(\.\d)?$/g,
      'Dimension is not valid(10-1-1 or 10.5-1.5-2.5)'
    ),
  ParkingAddress: yup
    .string()
    .trim()
    .min(10, 'ParkingAddress must be at least 10 characters')
    .required('* ParkingAddress is required'),
  ProductionYear: yup
    .number()
    .max(2021, 'ProductionYear Must be from 1999 to 2021')
    .min(1999, 'ProductionYear Must be from 1999 to 2021')
    .required('* ProductionYear is required'),
  Status: yup.string().trim().required('* Status is required'),
  Description: yup.string().trim().required('* Description is required'),
});
