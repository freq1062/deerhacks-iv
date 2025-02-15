// deerhacks-iv/client/src/data/tasks.js

const tasks = [
    {
      id: 1,
      locationName: "Park Entrance",
      locationCoordinates: { latitude: 52.520008, longitude: 13.404954 },
      taskType: "go-to-place",
      description: "Go to the main entrance of the park.",
      isCompleted: false, // Task completion status
    },
    {
      id: 2,
      locationName: "Fountain in the Park",
      locationCoordinates: { latitude: 52.5205, longitude: 13.4055 },
      taskType: "take-photo",
      description: "Take a photo of the central fountain.",
      isCompleted: false, // Task completion status
    },
    {
      id: 3,
      locationName: "Old Oak Tree",
      locationCoordinates: { latitude: 52.5195, longitude: 13.4060 },
      taskType: "find-item",
      description: "Find an acorn under the old oak tree.",
      itemToFind: "acorn",
      isCompleted: false, // Task completion status
    },
    {
      id: 4,
      locationName: "Cafe near Lake",
      locationCoordinates: { latitude: 52.5215, longitude: 13.4040 },
      taskType: "go-to-place",
      description: "Visit the cafe located near the lake and order a coffee.",
      isCompleted: false, // Task completion status
    },
    {
      id: 5,
      locationName: "Statue of Liberty Replica",
      locationCoordinates: { latitude: 40.6892, longitude: -74.0445 },
      taskType: "take-photo",
      description: "Take a creative photo with the Statue of Liberty replica.",
      isCompleted: false, // Task completion status
    },
    // Add more tasks here as needed
  ];
  
  export default tasks;
