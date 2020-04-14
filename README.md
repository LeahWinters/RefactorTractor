In this group project, we were given a functioning application but our assigned project goal was to completly refactor it so that we could have a better understanding of ES6, iterator methods, JQuery, and accessiblity of an application. We strived to make our code as dynamic as we could as well. 

![Refactor-Gif](https://user-images.githubusercontent.com/55927708/79261792-5b2e2d80-7e5e-11ea-96ca-73951d24a013.gif)

The application allows the user to keep track of how many steps they've taken, how many stairs they climbed, how much water they drank, and how many hours of sleep they got each day. It also allows them to set goals, see thier friends goals, and what thier friends have achieved.

## Contributors: 

Léah Winters: https://github.com/LeahWinters
Olivia Webster: https://github.com/oliviacweb
Kyle Wong: https://github.com/KyleWong2510

### To view this application follow the steps below!

## Clone This Repo

That's right, _clone_ not fork. You will use this repo multiple times, but you can only fork a repository once. So here is what you need to do to clone the repo and still be able to push changes to your repo:

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Remove the default remote: `git remote rm origin` (notice that `git remote -v` not gives you back nothing)
1. Create a new repo on GitHub with the name of `[what you want to name the repo]` to be consistent with naming
1. Copy the address that you would use to clone down this repo - something like `git@github.com:...`
1. Add this remote to your cloned down repo: `git remote add origin [address you copied in the previous step]` - do not include the brackets

Now try to commit something and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.

## Setup

After one person has gone through the steps of cloning down this repo and editing the remote, everyone should clone down the repo. 

Then install the library dependencies. Run:

```bash
npm install
```

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see a page with some `h1` text and a pink background. If that's the case, you're good to go. Enter `control + c` in your terminal to stop the server at any time.


