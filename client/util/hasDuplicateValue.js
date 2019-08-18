const hasDuplicateValue = (propName, arrOfObjs, newObj) => {
  let seenDuplicate = false,
      testObject = {},
      testArr = arrOfObjs.concat(newObj);
  testArr.map(function(item) {
    let itemPropertyName = item[propName];
    if (itemPropertyName in testObject) {
      testObject[itemPropertyName].duplicate = true;
      item.duplicate = true;
      seenDuplicate = true;
    }
    else {
      testObject[itemPropertyName] = item;
      delete item.duplicate;
    }
  });
  return seenDuplicate;
};

export default hasDuplicateValue;
