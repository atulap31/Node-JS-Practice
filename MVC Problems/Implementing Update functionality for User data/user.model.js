// Please don't change the pre-written code
// Import the necessary modules here

export const users = [
  {
    id: 1,
    name: "coding ninjas",
    email: "ninja@gmail.com",
    image: "https://entrackr.com/storage/2022/10/Coding-Ninjas.jpg",
  },
];

export const updateUsers = (user) => {
  // Write your code here
  // Find the index of the user with the matching id
  const userIndex = users.findIndex(u => u.id === parseInt(user.id));
  
  // If user not found, return false
  if (userIndex === -1) {
    return false;
  }
  
  // Update the user with new data
  users[userIndex] = {
    id: parseInt(user.id),
    name: user.name,
    email: user.email,
    image: user.image
  };
  
  // Return the updated user
  return users[userIndex];
};