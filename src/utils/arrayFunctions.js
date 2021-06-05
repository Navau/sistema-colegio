export const countDuplicateItemsArray = (value, array) => {
  let count = 0;

  array.forEach((arrayValue) => {
    if (arrayValue === value) {
      count++;
    }
  });

  return count;
};

export const removeArrayDuplicates = (array) => {
  return Array.from(new Set(array));
};

export const removeArrayDuplicatesObjectOrderByValue = (array, property) => {
  let arrayMap = [];

  switch (property) {
    case "text":
      arrayMap = array.map((item) => {
        return [item.text, item];
      });

      break;

    default:
      return null;
  }

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
};

export const removeItemsArray = (array, item) => {
  const index = array.indexOf(item);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};
