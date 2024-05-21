
export  function hasAdminRole(roles) {
    if (Array.isArray(roles)) {
      // Check if any element in the array is "admin"
      return roles.includes('Administrator');
    } else if (typeof roles === 'string') {
      // Convert the string to lowercase and check for "admin"
      return roles.toLowerCase().includes('Administrator');
    } else {
      // Invalid input type
      return false;
    }
  }
  
  export  function hasManagerRole(roles) {
    if (Array.isArray(roles)) {
      // Check if any element in the array is "admin"
      return roles.includes('Manager');
    } else if (typeof roles === 'string') {
      // Convert the string to lowercase and check for "admin"
      return roles.toLowerCase().includes('Manager');
    } else {
      // Invalid input type
      return false;
    }
  }
  
  export function hasGuestRole(roles) {
    if (Array.isArray(roles)) {
      // Check if any element in the array is "admin"
      return roles.includes('Guest');
    } else if (typeof roles === 'string') {
      // Convert the string to lowercase and check for "admin"
      return roles.toLowerCase().includes('Guest');
    } else {
      // Invalid input type
      return false;
    }
  }