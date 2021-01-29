export interface DrivingLicence {
  type: string;
  expeditionDate: Date;
  validUntil: Date;
}

export interface DrivingLicenceBackend {
  type: string;
  expedition_date: string;
  valid_until: string;
}
