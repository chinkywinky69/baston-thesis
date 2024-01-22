const getWeightClass = (weight, gender) => {
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

const getCategory = (age) => {
  switch (true) {
    case age >= 3 && age <= 12:
      return "Kids";
    case age >= 13 && age <= 18:
      return "Junior";
    case age > 18:
      return "Senior";
    default:
      return "Invalid Age";
  }
};

export const assignProperty = (playersArray) => {
  return playersArray.map((item) => {
    return {
      ...item,
      weightClass: getWeightClass(item.weight, item.gender),
      category: getCategory(item.age),
    };
  });
};
