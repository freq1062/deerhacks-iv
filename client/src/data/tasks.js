// deerhacks-iv/client/src/data/tasks.js

const tasks = [
  {
    id: 1,
    locationName: "Sawmill Valley Trail",
    locationCoordinates: { latitude: 52.520008, longitude: 13.404954 },
    taskType: "go-to-place",
    description: "Go to the creek in the sawmill valley trail.",
    isCompleted: false, // Task completion status
  },
  {
    id: 2,
    locationName: "Walk Down Principal's Road",
    locationCoordinates: { latitude: 52.5205, longitude: 13.4055 },
    taskType: "take-photo",
    description: "Take a photo of the bridge.",
    isCompleted: false, // Task completion status
  },
  {
    id: 3,
    locationName: "Erindale Park",
    locationCoordinates: { latitude: 52.5195, longitude: 13.4060 },
    taskType: "find-item",
    description: "Find an acorn under an oak tree in Erindale Park.",
    itemToFind: "acorn",
    isCompleted: false, // Task completion status
  },
  {
    id: 4,
    locationName: "Picnic near Lake Ontario",
    locationCoordinates: { latitude: 52.5215, longitude: 13.4040 },
    taskType: "go-to-place",
    description: "Have a picnic near the lake.",
    isCompleted: false, // Task completion status
  },
  {
    id: 5,
    locationName: "Credit River",
    locationCoordinates: { latitude: 40.6892, longitude: -74.0445 },
    taskType: "take-photo",
    description: "Take a photo on the bridge over the credit river.",
    isCompleted: false, // Task completion status
  },
  // Add more tasks here as needed
];

export default tasks;
