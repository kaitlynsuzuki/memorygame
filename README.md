# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Kaitlyn Suzuki**

Time spent: **21** hours spent in total

Link to project: https://memorygame1.glitch.me/

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [X] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [X] Dark mode and light mode implemented
- [X] Three difficulty levels that differ in number of buttons and length of sound
- [X] Piano version that mimics a piano in tone and plays back "Twinkle Twinkle Little Star"


## Video Walkthrough
![](https://i.imgur.com/xDfNsHN.gif) 
**Dark mode, losing message, and different difficulties**  
![](https://i.imgur.com/hWQcMPI.gif)   
**Piano version**  
![](https://i.imgur.com/irO86j5.gif)  
**3 strikes until losing**  

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
https://www.w3schools.com/js/js_switch.asp
https://coolors.co/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
https://stackoverflow.com/questions/5898656/check-if-an-element-contains-a-class-in-javascript/5898748
https://pages.mtu.edu/~suits/notefreqs.html

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

   * The biggest challenge I experienced throughout this process was managing the multiple difficulty levels. In my implementation of the game, the user can choose between the easy, medium, and hard versions, with the more difficult versions including more buttons, less time to play the sound, and a longer pattern.  The aspect of this that was hardest for me to manage, was the different difficulty states that displayed differing amounts of buttons and allowing for the user to toggle between the different levels. In the function that controls the difficulty level, I utilized two switch statements that when given a new difficulty level would change which buttons included the hidden class, to change the visibility of the buttons. I then needed to test the buttons controlling the difficultly levels to make sure it was possible to switch between all three levels, while maintaining the correct layout. The most difficult part was controlling the logic within the switch statement so I did not end up removing the hidden class from an element that did not currently have it, so I wrote out the logic, in the pursuit of making the switch statment efficient and effective.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

  * During this process, I was most surprised by the fact that this website only required one page, so I am very interested in learning how to create more complex websites that include multiple pages. Because of the experience I have with object oriented programming, javascript was relatively easy to pick up, so I am curious to explore the language deeper and then compare the experience to python or java. I would also like to learn how to implement more complex functionality within elements of a webpage using javascript, as I know it is quite powerful. I also found the AudioContext library to be interesting and I would love to explore the different javascript libraries to then create even more complex web apps. Because this project was solely front end, I would like to know more about what exactly the back end does to then understand how the two work together as a full stack application.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

  * If given the chance I would spend extra time making the website more aesthetically pleasing. I have an interest in informatics and design, but I do not have the CSS skills to turn my ideas into a reality yet. The general design is somewhat bland and almost dated, so I would love to spruce up the buttons, with shadows or animation, and position them better. In addition, I would like to turn the darkmode button into a switch, which I did some research on, but ultimately opted out. This would adhere to the industry standard of darkmode switches and would be interesting as it includes the “input” tag, which I only know a little about. I unfortunately did not get the chance to include the timed feature, which seemed a bit complicated, so I would also try to research this a bit and hopefully implement this. While I am satisfied with the functionally of my code, there are perhaps optimizations I could have made to make my code more clean, efficient, or understandable, so I would try to read through my code and try to improve it.



## License

    Copyright [Kaitlyn Suzuki]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
