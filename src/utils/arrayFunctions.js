export const countDuplicateItemsArray = (value, array) => {
  let count = 0;
<<<<<<< HEAD
=======

>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  array.forEach((arrayValue) => {
    if (arrayValue === value) {
      count++;
    }
  });
<<<<<<< HEAD
  return count;
};

export const removeArrayDuplicatesByIDStudent = (array) => {
  let arrayMap = [];
  arrayMap = array.map((item) => {
    return [item.idStudent, item];
  });
  const arrayMapAux = new Map(arrayMap);
  const uniques = [...arrayMapAux.values()];
  const uniquesOrder = uniques.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
  return uniquesOrder;
=======

  return count;
>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
};

export const removeArrayDuplicates = (array) => {
  return Array.from(new Set(array));
};

export const removeArrayDuplicatesObjectOrderByValue = (array, property) => {
  let arrayMap = [];
<<<<<<< HEAD
=======

>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  switch (property) {
    case "text":
      arrayMap = array.map((item) => {
        return [item.text, item];
      });
<<<<<<< HEAD
      break;
=======

      break;

>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
    default:
      return null;
  }

  const arrayMapAux = new Map(arrayMap);
<<<<<<< HEAD
  const uniques = [...arrayMapAux.values()];
=======

  const uniques = [...arrayMapAux.values()];

>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  const uniquesOrder = uniques.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
<<<<<<< HEAD
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
=======

    if (a.value < b.value) {
      return -1;
    }

    return 0;
  });

>>>>>>> 82947a1dc3060c0b2c9e27154fe459c98e02727e
  return uniquesOrder;
};

export const removeItemsArray = (array, item) => {
  const index = array.indexOf(item);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};
