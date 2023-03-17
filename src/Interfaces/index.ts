export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Company {
  id: number;
  name: string;
  siteUrl: string;
  taxId: string;
}

export interface Local {
  id: number;
  name: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  streetAddress: string;
  companyId: number;
  number?: number;
}

export interface ApiCompaniesData {
  data: Company[];
}

export interface ApiLocalsData {
  data: Local[];
}
