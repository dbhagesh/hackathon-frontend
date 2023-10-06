// function to genrate hash value for a string
export const getStringHash = (str: string) => {
  let hash = 0;
  try {
    if (str.length > 0) {
      for (let x = 0; x < str.length; x++) {
        const ch = str.charCodeAt(x);
        hash = (hash << 5) - hash + ch;
        hash = hash & hash;
      }
    }
  } catch (e) {
    // console.log(e);
  }
  return hash;
};

// function to generate unique hash value
export const getUniqueHash = (companyId = 0, userId = "") => {
  const randomNum = Math.random().toString(16).slice(-6);
  try {
    let now: string;
    if (
      typeof performance === "object" &&
      typeof performance.now === "function"
    ) {
      now = performance.now().toString().replace(".", "");
    } else {
      now = Date.now().toString();
    }
    const userRecruiterStr = `${companyId}-${userId}`;
    const mixedStr = `${randomNum}-${now}-${userRecruiterStr}`;
    const mixedHash: number = getStringHash(mixedStr);
    return `${Math.abs(mixedHash)}${randomNum}`;
  } catch (err) {
    // console.error(err);
    return randomNum;
  }
};

export const generatePageUID = () => {
  return `pid${getUniqueHash()}`;
};

export const generateUUID = () => {
  let u = "",
    i = 0;
  while (i++ < 16) {
    const c = "xxxxxx4xxxyxxxxx"[i - 1],
      r = (Math.random() * 16) | 0,
      v = c === "x" ? r : r & (0x3 | 0x8);
    u += c === "4" ? c : v.toString(16);
  }
  return `fed${u}`;
};

export function isDefined<T>(value: T | undefined | null): value is T {
  if (value === null) {
    return false;
  }
  if (value === undefined) {
    return false;
  }
  if ((typeof value).toLowerCase() === "number") {
    if (value === Infinity || value === -Infinity) return false;

    return isNaN(value as number);
  }
  return true;
}

export function getUniqueValuesByKey(arr: any[], key: string) {
  const uniqueValues = new Set();
  arr.forEach((obj) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      uniqueValues.add(obj[key]);
    }
  });
  return Array.from(uniqueValues);
}

export function deepEqual(obj1: any, obj2: any, ignoreKeys: any[] = []) {
  // Check if both objects are of type 'object'
  if (typeof obj1 != typeof obj2) {
    // console.log("DIFF TYPE : ", obj1, obj2);
    return false;
  } else if (typeof obj1 != "object") {
    // if (obj1 != obj2) console.log("NOT EQUAL :", obj1, obj2);
    return obj1 == obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of properties is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all properties and their values are equal
  for (const key of keys1) {
    if (ignoreKeys.includes(key)) {
      // console.log("FOUND : ", key);
      continue;
    }
    if (!deepEqual(obj1[key], obj2[key])) {
      // console.log("KEY :", key);
      // console.log("VALUES : ", obj1[key], " ", obj2[key]);
      return false;
    }
  }

  return true;
}
