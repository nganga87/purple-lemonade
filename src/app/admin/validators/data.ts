
export const initialValidators = [
  { id: 'VAL-001', name: 'ValidatorCorp', status: 'Active', rating: 4.9, validations: 1254, successRate: '99.8%' },
  { id: 'VAL-002', name: 'UKVerify', status: 'Active', rating: 4.8, validations: 890, successRate: '99.5%' },
  { id: 'VAL-003', name: 'DEPrüfung', status: 'Active', rating: 4.9, validations: 765, successRate: '99.9%' },
  { id: 'VAL-004', name: 'KenyaCertify', status: 'Pending Review', rating: 0, validations: 0, successRate: 'N/A' },
  { id: 'VAL-005', name: 'GlobalCheck', status: 'Suspended', rating: 3.2, validations: 2345, successRate: '85.2%' },
];

export const initialAppointments = [
  { id: 'APT-001', address: '123 Main St, Anytown, US', status: 'Pending Assignment', date: '2024-08-22', assignedTo: 'N/A' },
  { id: 'APT-002', address: '456 Oak Ave, Springfield, US', status: 'Assigned', date: '2024-08-23', assignedTo: 'ValidatorCorp' },
  { id: 'APT-003', address: '10 Downing St, London, GB', status: 'Completed', date: '2024-08-20', assignedTo: 'UKVerify' },
  { id: 'APT-004', address: '789 Pine Ln, Lakeside, US', status: 'Completed', date: '2024-08-19', assignedTo: 'ValidatorCorp' },
  { id: 'APT-005', address: '1600 Amphitheatre Pkwy, Mountain View, US', status: 'Pending Assignment', date: '2024-08-22', assignedTo: 'N/A' },
  { id: 'APT-006', address: 'Brandenburg Gate, Berlin, DE', status: 'Assigned', date: '2024-08-21', assignedTo: 'DEPrüfung' },
  { id: 'APT-007', address: '221B Baker St, London, GB', status: 'Completed', date: '2024-08-18', assignedTo: 'UKVerify' },
];
