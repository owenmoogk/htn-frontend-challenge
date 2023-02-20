# Hack The North - Frontend Challenge

## Development Process
The development process of this frontend web application followed a similar path as the engineering design process.

When deciding how to approach the problem, I looked at the requirements and layed out some features that were critical. I decided on a few features, and looked at others, but ruled them out due to a variety of reasons.

**Note**: When testing / using the website, to log in the following credentials are needed:
- Username: owen
- Password: owenpassword

#### Key Features
- Searching - It is important that users be able to find the data that they want fast and effectively. This is especially important for growth, as the more events the harder it will be to find them.
- Sorting - Sorting by start time, or by category. This is useful for anyone looking for the next events happening, so they can decide what they would like to attend, and also to people looking for a specific type of event.
- User login - Some events are only for users who are logged in. Thus, events that are not for these users need to be filtered out.

#### Considered Features
- Fancier display (calendar layout) - Last year, Hack the North had all the events laid out in a calendar format. Some people would argue that this is more visually appealing, which I would agree with. However, it does not scale to mobile and requires a lot of scrolling no matter the device. This is why I opted to simplify the design to a list which can be sorted.

#### Tools Used
This web app was created using ReactJS. This was chosen in part because I have experience building apps with it before, but also because of its ability to be modular. It is very easy to integrate a React app into another, due to the component structure. This also allowed for simple state updates when data was fetched, reloading components that needed changing without reloading the entire site.

#### Problems Encountered
Some problems that I ran into included scaling the website for mobile viewing. Many mobile websites are poorly designed (due to the fact that almost every developer is developing on a large monitor). I also designed first with computer users in mind, and then later had to go back and modify the code for mobile users. I solved this by creating a class for components that did not need displaying on mobile, and then setting a breakpoint for the alternate rendering scheme. With more time, I would have completely redesigned for mobile viewers, making the UI more intuitive.

#### Design Tradeoffs
One design decision that was made during this was the sorting algorithm. I opted for a version of bubble sort. This design decision was made because it would be unreasonable to think that events at a hackathon could exceed a few hundred. Because of this, it seemed more sensible to write code that was readable and that could be easily modified, instead of a slightly faster algorithm. With any reasonable size of events, the time difference would not be noticeable from a user's perspective.

## Additional Features
Given more time, there are some features that I would love to add. The first one is an improved UI. I consider myself an avid programmer and believe that I have strong coding and scripting skills, but I must admit that my design and artsy side is lacking. I would have loved to consult others about the UX and UI of the frontend, however was limited by time. I would like to continue developing these skills, and a way that I am doing this is by continually iterating on projects to make them better and better. I would love to do the same with this, making the mobile viewing and overall appearance more streamlined and ideally more attractive.

I also think with more event types (like last year's HTN calendar), colour coding would be useful. For only three different types of events, I don't believe that it is very important, but when scaling could be a great addition.

Lastly, I've been looking into and learning lots about GraphQL lately. I did not believe that I had enough experience and know how about GraphQL to integrate it into this project, however, using this could also be a great improvement.

Although I've had plenty of experience building web apps, they have mostly been for a small group of people (some even only for myself). Because of this, I have not had experience scaling and testing frontend applications. I am eager to learn more about this in the future, and would love to see the solutions that that Hack The North implements to ensure scaling performance.

## Closing Thoughts
Thank you for reviewing this application! I look forward to hearing back from you. Although I believe my project implemented all the required features well, I think that there is always lots of room to improve, and I am very keen to learn alongside other frontend developers.
