![image](https://github.com/user-attachments/assets/86d99447-c3ae-48af-a601-86b7b633ed35)

Creating my own version of the Pomodoro Technique Application.
Will include a Pomodoro 25 min timer, 5 min break, and 15 min break.
A task bar for the user to add, update, and delete tasks.

Pomodoro Components:
- Start Timer
- Reset Timer
- Stop Timer
- Update Pomodoro Timer
- Reset timer when switching from one timer to another

Task Components:
- Add a task
- Delete a task
- Display the tasks 

The Pomodoro has been giving me struggles because I can't count down the timer. 
I think it's because of the useEffect component and I don't think it's functioning properly. 

The main change so far for the Pomodoro was adding mode components. So far I have the Pomodoro strictly set to
25 minutes and to go from there. With the added modes, now I can switch from Pomodoro to either the short break 
or the long break. I also updated the return in the Pomodoro to make it look more realistic as well.

In the useEffect components, I don't need time to be a dependency for it. Once it was removed, the timer 
started to decrement each second.

For the CSS, I first wanted to create independent stylesheets for both the Pomodoro and todo components,
but when I saw what it looked like once I completed it, both were just boxes on top of each other and it 
didn't look like a good webpage. Instead, I updated the app component's CSS to make it look more realistic. 

I made sure to keep the Pomodoro at the top of the page because when it was next to each other and I added 
a task, the Pomodoro would go down as I added more and more tasks. By keeping it at the top, I can add as many tasks and the page will keep extending, but the Pomodoro will remain in its place.

Added back the Pomodoro CSS to fix the button layout, to make the buttons look nicer.

Now I want to add the Todo CSS to fix the delete button when I add a task. 
I added a Todo.css to fix the space between the input and the delete button. 
As well as the add button to make it look neater. 

Now, I want to make it so when you click on either the Pomodoro, short, or long-timer, that it be the name
if the current timer. 
I deleted the three mode components for each of the timers. Instead, I created a set mode and time component to set
the new mode and new time when the user clicks on one of the buttons. So on click, it'll not only change the stop
watch time, but also the current title as well.
I also want to fix the to-do component because any time I add a long paragraph, everything gets clumped together. 

