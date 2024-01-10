export function getFullname(data) {
  return `${data.lastName}, ${data.firstName} ${data.middleName[0]}`;
}

export function getAddress(data) {
  return `${data.street}, ${data.barangay}`;
}
