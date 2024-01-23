export function getFullname(data) {
  if (data && data.lastName && data.firstName) {
    const middleInitial =
      data.middleName && data.middleName.length > 0 ? data.middleName[0] : "";
    return `${data.lastName}, ${data.firstName} ${middleInitial}`;
  } else {
    return "";
  }
}

export function getAddress(data) {
  return `${data.street}, ${data.barangay}`;
}

export const getWeightClass = (weight, gender) => {
  if (!weight || weight <= 0) {
    return "Invalid Input";
  }

  if (gender === "Male") {
    if (weight >= 43 && weight <= 47) {
      return "Pinweight";
    } else if (weight > 47 && weight <= 51) {
      return "Bantamweight";
    } else if (weight > 51 && weight <= 55) {
      return "Featherweight";
    } else if (weight > 55 && weight <= 60) {
      return "Extra Lightweight";
    } else if (weight > 60 && weight <= 65) {
      return "Half Lightweight";
    } else {
      return "Open Weight";
    }
  } else if (gender === "Female") {
    if (weight >= 37 && weight <= 40) {
      return "Pinweight";
    } else if (weight > 40 && weight <= 44) {
      return "Bantamweight";
    } else if (weight > 44 && weight <= 48) {
      return "Featherweight";
    } else if (weight > 48 && weight <= 52) {
      return "Extra Lightweight";
    } else if (weight > 52 && weight <= 56) {
      return "Half Lightweight";
    } else {
      return "Open Weight";
    }
  } else {
    return "Invalid Gender";
  }
};

export function getAge(birthday) {
  const birthDate = new Date(birthday);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if birthday for the current year has occurred or not
  const hasBirthdayOccurred =
    currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate());

  // If birthday for the current year has not occurred, subtract 1 from the age
  if (!hasBirthdayOccurred) {
    age--;
  }

  return age;
}
