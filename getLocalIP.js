// utils/getLocalIP.js
export const getLocalIP = () => {
    // Replace this with the actual URL you get from Expo CLI
    const expoURL = 'exp+moviehub://expo-development-client/?url=http%3A%2F%2F10.0.12.115%3A8081';
  
    // Extract the IP address from the URL
    const urlMatch = expoURL.match(/url=http%3A%2F%2F([^%]+)%3A8081/);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
    return 'localhost'; // Fallback value
};
  