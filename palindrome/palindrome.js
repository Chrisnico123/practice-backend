function isPalindrome(x) {
    if (x < 0) return false;
    
    const str = x.toString();

    // Gunakan konsep quick sort
    let left = 0;
    let right = str.length - 1;
  
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
  
    return true;
  }
  
  console.log(isPalindrome(121));  // true
  console.log(isPalindrome(-121)); // false
  console.log(isPalindrome(10));   // false
  