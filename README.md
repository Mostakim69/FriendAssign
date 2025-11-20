# Website Theme⭐ Online Group-Study assignment  Web App

Welcome to **FriendAssign**,, you will build a web application for online group study with friends (Every registered user is a friend of others). Users can create assignments, complete them, and grade their friends' assignments.
---

## 📌 Project Overview

| Detail                 | Information                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **GitHub Client site** | [FriendAssign-client](https://github.com/Mostakim69/FriendAssign)         |
| **Live Site client**   | [FriendAssign-firebase](https://assignmen-11-app.web.app/)                              |
| **GitHub server site** | [FriendAssign-server](https://github.com/Mostakim69/Friend-Assign-server)         |
| **Portfolio GitHub**   | [Md Mostakim Hosen-portfolio](https://github.com/Mostakim69/My-Portfolio-Website)         |
| **Portfolio Live**     | [Mostakim-Hosen-live](https://my-portfolio-website-9ba5f.web.app/)                         |
| **Created On**         | 20 May 2025, 10:32 AM GMT+6                                                        |
| **Location**           | Mohanpur, Rajshahi, Bangladesh                                              |

## 🌐 Live Site

[🔗 Deployed App](FriendAssign) _(https://assignmen-11-app.web.app/)_

---
<h1 align="center">📚 FriendAssign — Online Group Study Platform</h1>
<p align="center">
  <i>Collaborate, Create, and Grade Assignments with Friends</i>
</p>

---
---

## 📁 Project Structure

Here's a high-level overview of the project's file structure:

```
├── .env
├── .firebase
    └── hosting.ZGlzdA.cache
├── .firebaserc
├── .gitignore
├── README.md
├── eslint.config.js
├── firebase.json
├── index.html
├── package-lock.json
├── package.json
├── public
    └── vite.svg
├── src
    ├── App.css
    ├── App.jsx
    ├── Components
    │   ├── AllGroup.jsx
    │   ├── AllGroupDetails.jsx
    │   ├── Banner.jsx
    │   ├── Benifit.jsx
    │   ├── Dashboard.jsx
    │   ├── Faq.jsx
    │   ├── Features.jsx
    │   ├── Footer.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── Navbar.jsx
    │   └── Pending.jsx
    ├── Layout
    │   ├── AuthContext.jsx
    │   ├── AuthLayout.jsx
    │   ├── DashboardLayout.jsx
    │   └── HomeLayouts.jsx
    ├── animation
    │   ├── Walking.jsx
    │   ├── index.js
    │   ├── loginAnimation.json
    │   ├── loginAnimation2.json
    │   └── loginAnimation3.json
    ├── assets
    │   └── react.svg
    ├── firebase
    │   └── FireBase.config.js
    ├── index.css
    ├── main.jsx
    ├── pages
    │   ├── Contact.jsx
    │   ├── CreateAssignment.jsx
    │   ├── DashNav.jsx
    │   ├── ErrorPage.jsx
    │   ├── ForgotPassword.jsx
    │   ├── LiveStats.jsx
    │   ├── Login.jsx
    │   ├── MyAssignments.jsx
    │   ├── Profile.jsx
    │   ├── Register.jsx
    │   ├── Sidebar.jsx
    │   ├── Terms.jsx
    │   ├── Testimonials.jsx
    │   ├── TrendingAssignments.jsx
    │   └── UpdateGroup.jsx
    ├── provider
    │   └── MyProvider.jsx
    └── routes
    │   ├── PrivateRoute.jsx
    │   ├── ProtectedRoute.jsx
    │   └── Router.jsx
└── vite.config.js

```

---

<div align="center">
  <img src="https://i.postimg.cc/hvfGtWj6/Screenshot-2025-10-26-132210.png" width="100%" alt="Login Page" />
  <br/><br/>
  <img src="https://i.postimg.cc/MZN6mLHC/Screenshot-2025-10-26-132238.png" width="100%" alt="Register Page" />
  <img src="https://i.postimg.cc/66fsy1Rc/Screenshot-2025-10-26-131125.png" width="100%" alt="FriendAssign Banner" />
  <br/>
  <img src="https://i.postimg.cc/3rB6K05z/Screenshot-2025-10-26-131203.png" width="100%" alt="Assignment Page" />
  <img src="https://i.postimg.cc/L8djwvCG/Screenshot-2025-10-26-131511.png" width="100%" alt="All Assignment Details Page " />
  <img src="https://i.postimg.cc/FHgkqvJH/Screenshot-2025-10-26-131633.png" width="100%" alt="Profile page" />
  <img src="https://i.postimg.cc/kMBYWJ2j/Screenshot-2025-10-26-131659.png" width="100%" alt="Pendding Assignment Page" />
  <img src="https://i.postimg.cc/FzLx8Kc1/Screenshot-2025-10-26-131806.png" width="100%" alt="My Assignment Page" />
</div>


## 🧭 Routing Structure (with Layouts)

### 🔐 Auth Layout

- `/login` → `Login.jsx`
- `/register` → `Register.jsx`
- `/forgot-password` → `ForgotPassword.jsx`

### 🏠 Main Layout (Landing Pages)

- `/` → `Home.jsx`
- `/about` → `About.jsx`
- `/contact` → `Contact.jsx`
- `/faq` → `Faq.jsx`
- `/privacy-policy` → `PrivacyPolicy.jsx`
- `/terms-and-conditions` → `TermsCondintion.jsx`


### 📚 Blog Feature (via `BlogsLayout.jsx`)

- `/blogs` → `Blogs.jsx`
- `/blogs/:id` → `BlogDetails.jsx`
- `/create-blog` → `CreateBlog.jsx`


### 👤 Profile

- `/my-profile` → `MyProfile.jsx`
- `/update-profile` → `UpdateProfile.jsx`

---

## 🔑 Features

### ✅ Authentication

- Firebase Auth integration
- Login, Register, Forgot Password
- Auth-protected routes


### 📝 Blog System

- View all blogs
- Blog details with comments, read time, tags
- Create and share new blogs


---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Routing**: React Router&#x20;
- **Forms**: React Hook Form, React Day Picker
- **State Management**: React Context API (AuthProvider)
- **Animations**: Lottie
- **Toast Notifications**: React Hot Toast
- **Deployment**: GitHub Pages / Vercel / Netlify (configure as needed)
- **Build Tool**: Vite

---

## 📦 Installation

```bash
bun install  # or npm install
bun run dev  # or npm run dev
```

---

## 📌 TODOs

- ***

## 👏 Credits

- Design inspired by classic cooking & recipe books
- Icons via Lucide and Heroicons
- Lottie animations from LottieFiles

---

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ for food enthusiasts and aspiring chefs.

> "Food is symbolic of love when words are inadequate." — Alan D. Wolfelt

----- preivous version ------
---

---

## 🚀 Features

### 🔐 Authentication & Security

- **Email/Password Login**: Secure user authentication via Firebase.
- **Google Sign-In**: Quick access using Google accounts.
- **Protected Routes**: Restricts access to sensitive pages like profile and recipe details.
- **Password Reset**: Users can reset passwords through email verification.


### 👤 User Profile

- **Profile Page**: View and edit user information, including display name and photo.
- **Update Profile**: Modify personal details securely.

### 📄 Additional Pages

- **About**: Learn more about FlavorBook.
- **Contact**: Get in touch with the team.
- **FAQ**: Frequently Asked Questions.
- **Privacy Policy**: Understand how user data is handled.
- **Terms & Conditions**: Legal information regarding the use of FlavorBook.

### 🎨 UI/UX Enhancements

- **Responsive Design**: Optimized for various devices.
- **Tailwind CSS & DaisyUI**: Utilized for styling and component design.
- **Lottie Animations**: Engaging animations for better user experience.
- **Swiper**: Interactive sliders for showcasing content.

---


## <img src="https://media.giphy.com/media/VgCDAzcKvsR6OM0uWg/giphy.gif" width="50"> A Little More About Me...  

Hello i'm Md Mostakim Hosen.
<p>I'm a passionate Frontend Developer with a strong focus on creating clean, responsive, and user-friendly web interfaces. I enjoy building modern web applications using technologies like HTML, CSS, JavaScript, React.js, and Tailwind CSS. I believe in writing readable code, maintaining UI consistency, and ensuring a smooth user experience across all devices. I'm always eager to learn new tools and improve my skills to deliver better results.

</p>

```javascript
const mostakim = {
  pronouns: "he" | "him",
  code: [Javascript, Typescript, HTML, CSS, Python, Java],
  tools: [React, Node, Storybook, Styled-Components],
  architecture: ["microservices", "event-driven", "design system pattern"],
  techCommunities: {
                        coorganizer: "AfroPython",
                        speaker: "Latinity",
                        mentor: "EducaTRANSforma"
                      },
 challenge: "I am doing the #100DaysOfCode challenge focused on react and typescript"
}
```


<img src="https://i.postimg.cc/bvR5Q4QY/Whats-App-Image-2025-06-26-at-8-36-49-PM.jpg" alt="Banner"  width="100%" height="auto" />

## 🌐 Socials:
 [![email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:mdmostakimhosen35@gmail.com) 
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white)](https://facebook.com/MostakimHosennnn)
[![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white)](https://discord.gg/mostakim520807) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/posterboy3369) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/test) [![Pinterest](https://img.shields.io/badge/Pinterest-%23E60023.svg?logo=Pinterest&logoColor=white)](https://pinterest.com/mdmostakimhosen35) [![TikTok](https://img.shields.io/badge/TikTok-%23000000.svg?logo=TikTok&logoColor=white)](https://tiktok.com/@posterboy369) [![X](https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white)](https://x.com/test) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@PosterBoy3369) 

# 💻 Tech Stack:
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white)
 ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)  ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)  ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Adobe Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white) ![Canva](https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
# 📊 GitHub Stats:
![](https://github-readme-stats.vercel.app/api?username=Mostakim69&theme=swift&hide_border=true&include_all_commits=true&count_private=true)<br/>
![](https://nirzak-streak-stats.vercel.app/?user=Mostakim69&theme=swift&hide_border=true)<br/>
![](https://github-readme-stats.vercel.app/api/top-langs/?username=Mostakim69&theme=swift&hide_border=true&include_all_commits=true&count_private=true&layout=compact)

---
