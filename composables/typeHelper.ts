export function getInputType(value: string) {
  // Email Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check for Email
  if (emailRegex.test(value)) {
    return "email";
  }

  // Check for Indonesian Phone Number
  if (/^(?:\+62|62|0)8[1-9][0-9]{7,10}$/.test(value)) {
    return "phone";
  }

  // Default to Text
  return "username";
}

// ~/utils/convertPhoneNumber.js
export function convertPhoneNumber(value: string) {
    // Check if it's a valid Indonesian phone number
    const phoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;
    
    if (!phoneRegex.test(value)) {
      throw new Error('Invalid Indonesian phone number format');
    }
  
    // Remove leading `+62` or `0` and ensure the number starts with `62`
    if (value.startsWith('62')) {
      return value.replace('62', '+62');
    } else if (value.startsWith('0')) {
      return value.replace('0', '+62');
    }
    
    // If it already starts with `62`, return as is
    return value;
  }
  
