# SportBuff

## Want to see it live?

Go [here](https://vidquizz.vercel.app/)

If you append this param query at the end of the url

```
/?buff=<id>
```

being `<id>` a number between _1-5_, you will fetch different data when the Buff shows up.

## Tech/Libs and why I used them

- Nextjs | Because in my opinion is the best/most flexible react framework out there + faster to setup other techs like typescript, sass and tailwindcss, testing libs...

- typescript | For type checks, performance, and prevention of errors

- Jest + Enzyme | I went with these two for testing because it is what you guys use currently and I've used them in Vodafone too. For time purposes didn't implement cypress but that would of been my next step.

- tailwindcss | I saw that you provided bootstrap on the repo I guess to make my life easier to develop but since you guys mentioned that you were going to use styled-components at the company and gave me freedom to choose the tools I wanted, I switched this one for tailwindcss since I feel is less opinionated than bootstrap as it is atomic, it's simpler and I feel this ecosystem can scale better than using bootstrap since it matches well with Headless UI. Also has the performance benefits of using it with postcss as it extracts the unused css classes. Overall, I feel this is the best option to manage the repetitive css classes.

- styled-components | You mentioned you wanted or were using styled-componentes in the interview and I needed a css-in-js solution for the Chrono component as the css styles depend on the js data. I don't like the approach of using styled-components for all the css on a website, it is less performant and has a lot of boilerplate code. I prefer using it just in the places where it shines, which in my opinion is when, as in the Chrono example, we rely heavily in the js data to create our styles.

- sass | Easier to organise the styles as you can nest them.

## How to test the solution?

Clone the repo.

Then enter the folder

```
cd <repoName>
```

and run the project locally.

```
yarn && yarn dev
```

After that a window with the app should appear on your browser.

## Structure

I added all the components into the root/components folder since is not a huge project.

For bigger projects I usually either group them by using Atomic Design Methodology or create a UI component library that I can install on the project.

The **key components/** are _Chrono_, _ComposeBuffToVideo_, _Buff_ and the **main page** is root/page/index.tsx

In helpers you can find functions that I've needed at some point to convert the time formats.

Most of the configuration logic is within the Index page, in that file we track the time at which you want to show the Buff component, if the user started the timer, the state for showing the Buff on screen and the input and simple error values. I also create some refs to be able to control better the timer and the video.

In this page we load the:

- TimeInput | Controls the time that you can set up in order to show the Buff. It's limited by the HTML time input limits. In case we needed to setup more time than the allowed then I could create a custom one but for this example it was enough. For web it's styled as requested on the README and if you don't select a time an error message will appear telling you what went wrong.

Once you start the time the Start button gets disabled and the Buff will show up at the time that you stated. To introduce a new value you need to reset by clicking the Reset button.

- ComposeBuffToVideo | Is a component to compose anything to a video, in this case any Buff. Acts as the container so I added some customization like showing the buff on the left or right depending on the prop and it's rehusable for other videos as it takes the video url as a prop too. The component uses React.forwardRef so you can take control of it and manipulate it's DOM values too. You can pass a children, in this case I pass a Buff component and this one loads on top of the video.

- Buff | The Buff fetches the data from the API and builds the quizz component. It handles the timers specified on the README such as the 5 seconds to be able to click on an answer, the hability to close it or it will close itself after the time gets to 0 + 3 seconds more (so the animation of the fadeout when you run out of time shows). It handles also the styled and logic for the correct answer which by the way, didn't see any info about that on the API response so I appended a new key to the answer object to know which is the correct one so I could implement the styles. In a real scenario this would come on the response or we would make a request to the API to check if that one was the correct.

- Chrono | the component that uses styled-components. It handles the countdown UI component that tells you how much time you have left. It's animated with keyframes and sets an internal timer that it's initialised via a prop so you can update the time you want to give for each question.

In the hooks folder I made a useFetch Hook to make the API request.

The rest of the root files are mostly for config purposes.

## Quick thoughts

- It took me more than 5 hours, I wanted it to be as close as possible as the picture.

- I didn't know what the yellow circle with the number was, I thought maybe it was the Buff number or the number of possible answeres, I don't know.

- For time purposes I didn't implement perfect responsiveness and details like for example truncating the author div so it shows ... at the end if it is too long and this kind of UI improvements.

Hope you like it,
Ruben
