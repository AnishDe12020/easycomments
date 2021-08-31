### [Easy Comments](https://easycomments.anishde.dev) is a simple web app that allows you to add comments functionality to any website, be it a portfolio site or a blog

![MIT License Shields.io Badge](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub Repo stars](https://img.shields.io/github/stars/anishde12020/easycomments?style=social)

---

# 🎛️ Features

- Unlimited Sites
- Unlimited Comments
- Approval stage for comments (optional)
- Free and Open Source
- No Trackers and No Ads
- Route wise comments
- Ability to edit and delete a comment
- Markdown Support

# 🖼️ Screenshots
<details>
  <summary>Click to see screenshots</summary>
  <img src="https://i.imgur.com/T7FOqZz.png" alt="Home Page Screenshot" />
  <img src="https://i.imgur.com/avdZnni.png" alt="Sites Page Screenshot" />
  <img src="https://i.imgur.com/S4La8wt.png" alt="Manage Comments Page Screenshot" />
  <img src="https://i.imgur.com/V7Zbzpa.png" alt="My Comments Page Screenshot" />
  <img src="https://i.imgur.com/kbu0jtt.png" alt="Leave a Comment Page Screenshot" />
</details>

# ✔️ To-Do
- [ ] Support for reactions
- [ ] Comment threads
- [ ] Better markdown support, support for LaTeX

Open a discussion for a feature request and I will add it here!!!


---

# 📖 Guide

## Create an account

First click the Sign In button

![Sign in picture](https://i.imgur.com/WHAqDIT.png)

You will be redirected to an Auth0 Universal Login page where you can sign in with Google or else create an account with an email and password.

![Auth0 Universal Login Page Picture](https://i.imgur.com/ruYbR4L.png)

## Add a Site

You need to add a site to get a link for embedding the comments widget. Visit the [Sites Dashboard](https://easycomments.anishde.dev/sites) to add a site.

![Add Site Button Picutre](https://i.imgur.com/I0WCwQ4.png)

Here you need to just fill in the required fields. You can change some settings if you want to (can be changed later). After you are done, click Save.

![AddSiteModal Picture](https://i.imgur.com/LhfWHl9.png)

## Get the Embed URL

Now you need to click on the button that says "See Embed Url" and copy the Url from there. You can specify a route and also a preferred color scheme.

![See Embed Url Button Picuture](https://i.imgur.com/IftMzMm.png)

![See Embed Url Modal Picture](https://i.imgur.com/IcrMPTO.png)

You are almost done, you are now ready to embed the comments widget on your website

## Embed the Comments Widget

This can be done in many ways. The embed supports [Iframe Resizer](https://github.com/davidjbradshaw/iframe-resizer). I would recommend using this. You can refer the Iframe Resizer documentation for more information.

For React - https://github.com/davidjbradshaw/iframe-resizer-react

For Vue - https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/use_with/vue.md

For Angular - https://github.com/davidjbradshaw/iframe-resizer/issues/478#issuecomment-347958630

You can also embed this in any website which supports embeds (e.g. Notion)

---

# 🐛 Encountered a bug?

Open a [GitHub issue](https://github.com/AnishDe12020/easycomments/issues) in this repository. There is a bug report remplate so please stick to that.

# 🛡️ Contibuting

Pull requests are welcome!!! Please fork the project and create a seperate branch for the pull request. Please stick to just 1 new feature or fixing 1 big per pull request. If you want to make a big change, open a discussion thread in the [discussions section](https://github.com/AnishDe12020/easycomments/discussions) in the "Ideas" catogery. If you open a pull request and you are still working on it, please label it WIP (Work in Progress) and make it a draft.

---

# 💻 Running locally

First clone the repository using git or download the zip and extract it.

`https://github.com/AnishDe12020/easycomments.git`

You must have NodeJS and NPM installed. We use `yarn` for manageing dependencies but you can use `npm` as well.

To install dependencies -

- With `npm`

```
npm install
```

- With `yarn`

```
yarn
```

You will need to fill out some environment vairables. Refer to [`.env.example`](https://github.com/AnishDe12020/easycomments/blob/main/.env.example)

Firstly, you need to create a new [Auth0](https://auth0.com/) account if you already don't have one. You need to create a SPA application and fill out the required fields. You can refer to the [NextJS Auth0 Quickstart](https://auth0.com/docs/quickstart/webapp/nextjs) for a guide.

You also need to make a new project in firebase and create a web application in the same. You can refer to the [Firebase Web Setup Guide](https://firebase.google.com/docs/web/setup). You are also required to create a Firebase service account. This can be done in the Firebase Proect Settings -> Service Accounts. Make sure you download the JSON file and keep it somewhere safe as it contains sensitive information and you will not be able to download it again.

For the environment variable `NEXT_PUBLIC_SITE_EMBED_URL`, you can use the following value -

```
https://easycomments.anishde.dev/embed/EwI3VgCSuJkl85wh18Ru/
```

Now you can run the development server.

With `npm` -

```
npm run dev
```

With `yarn` -

```
yarn dev
```

Then visit [`localhost:3000`](http://localhost:3000) in your browser to see the site in a development environment.

### ⭐ If you liked the project, don't forget to star it!!!
