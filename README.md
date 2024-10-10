# Ai Shorts Generator in Next.js

## Tech Stack

- Clerk :- for Authentication
- Deepgram :- to generate audio file from prompt
- TailwindCSS :- for CSS
- Google Generative Ai :- to generate prompt
- Lottie Files :- for animated icons
- Neon Database :- for database to user info
- Drizzle ORM :- to create query & store data in neon database
- Shadcn :- UI Library
- assembly :- convert audio file in to subtitles
- Axios :- make http requests
- Firebase :- to store files (storage)
- Remotion :- to convert images into video

## How to run Locally

1. First fork or clone the repo then inside root folder run `npm install` to install the dependencies.
2. Then make a .env.local file in root dir & initialize variables. Grab your secret & publishable key from Stripe Dashboard & make two variables.
   - NEXT_PUBLIC_DRIZZLE_DATABASE_URL :- get it from neon website after registering.
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY :- get it from clerk website
   - CLERK_SECRET_KEY :- get it from clerk website
   - NEXT_PUBLIC_CLERK_SIGN_IN_URL :- get it from clerk website
   - NEXT_PUBLIC_CLERK_SIGN_UP_URL :- get it from clerk website
   - NEXT_PUBLIC_GEMINI_API_KEY :- get it from google cloud
   - NEXT_PUBLIC_DEEPGRAM_API_KEY :- get it from Deepgram
   - NEXT_PUBLIC_FIREBASE_API_KEY :- get it from Firebase
   - ASSEMBLY_AI_KEY :- get it from Assembly AI Website
3. You are done & ready to run inside the root folder run the command `npm run dev`.

**You can view the live site _[Dazzy Ai Shorts Generator Live](https://dazzyaishorts-generator.netlify.app/)_**

### Shopee UI

### Dashboard Page

![Dashboard Page](/public/dashboard.png)

### Create new video page

![Create new video Page](/public/create-new-video.png)

### Video Preview

![Video Preview](/public/video-preview.png)
