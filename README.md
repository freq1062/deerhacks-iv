# deerhacks-iv
Deerhacks IV Project

## Inspiration
Our Real-Playing Game was inspired by an annoyance we have here at UTM: despite most of us being enrolled for over a semester, it still feels like we do not fully know the campus. UTM has a strong argument for being the most beautiful of all the University of Toronto campuses, with modern buildings and incredible nature trails. However, this remains useless if we do not seek out new places and instead just follow our daily routine going between classes. We wanted to make this app to ensure we make the most of our short stint here at UTM. While our initial goal was to make the most out of our short time at UTM by getting to know the campus, we later realized that the Real-Playing Game could also help us explore other places, such as the other campuses or even Toronto as a whole.

## What it does
Our Real-Playing Game follows the player as they walk around and discover new things on campus. The app tracks where the player has already been and displays new, unadventured paths for them to check out. It also provides the player with suggestions on where to go, indicated by the markers with popular locations on campus with the goal of encouraging the player to go there, following a different route than they would have. In turn, the app calculates what percentage of the area explored, offering the user the ability to not only compete with themself to see as much as possible but also with friends using the leaderboard.

## How we built it
We built our game using several technologies, including React for front-end and Flask for back-end development. In addition, we chose to use Leaflet.js and MapTiler for our mapping system and Gemini for our confirmation that the player indeed actually visited the tasked locations. Our process of building involved first and foremost a lot of planning on what exactly we wanted to create, including what we wanted the user to experience before even creating our repository. This was followed by a significant amount of research into the documentation of the technologies we wanted to use which was unimaginally helpful in completing the project.

## Challenges we ran into
During our project, we ran into quite a few hurdles. For one, few of us had much experience with all of the tools we were using and as a result, we spent a lot of time learning instead of actually programming which would have helped by the end. In addition, we encountered many obstacles while working on the path calculation system since the MapTiler documentation was difficult to understand at times.

## Accomplishments that we're proud of
We are most proud of the mechanisms we implemented for the player to gain rewards. For one, there is the new area explored reward which we thought was innovative compared to many of the current offerings since our game actually encourages going somewhere new as opposed to the same place repeatedly. We are also proud of our verification of task completion system as it makes it harder for people to illegitimately gain rewards.

## What we learned
In the process of creating this project, we learned things both technical and not. One important thing we learned was how to better delegate work. Throughout the process, there were few times (asides from sleep!) that any of us were not working on the project or learning from an event at DeerHacks. On the technical side, we also learned about the way mapping tools deal with elements like roadways, something we did not understand nearly as well prior.

## What's next for RPG: Real-Playing Game
Something we all want to do to improve upon our app is include augmented reality (AR). We feel that by including this technology, it would dramatically improve the imersiveness of our game. AR would enable us to do this by enabling us to make the real life locations shown in the game not just feel like places on a map. We also want to extend it far beyond UTM. Our goal not only includes the other University of Toronto campuses, or even other universities, but cities and other areas of the world as well.
