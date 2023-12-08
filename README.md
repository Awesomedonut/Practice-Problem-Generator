# Probloom: AIGC-Powered Practice Problem Generator 
## Generating practice problems to help your academic career bloom! :D

Group project for CMPT 276

Vercel hosting link: https://practice-problem-generator.vercel.app/

Local Setup Instructions:

1. Ensure you meet the following prerequisites:
    1. You've installed the latest version of Node.js 
2. Clone the repo
3. Navigate to the project directory
4. Install the dependencies using `npm install`
5. Configure the environment:
    1. `.env.local` file in the root of the project
    2. Add an OpenAPI key to the file using `NEXT_PUBLIC_OPENAI_API_KEY=some_secret_key`
        1. Note: contact Jin for the key and be sure not to commit this file to the repo
    3. Add another variable `NEXT_PUBLIC_HIDE_DEFAULT_QUIZ=1`. This variable helps to format the site by facilitating hiding and showing the quiz section.
5. Run Probloom using `npm run dev`
6. Open a browser and go to `http://localhost:3000`

Testing Instructions:

To run the integration test:
`npm run cypress -- --e2e`

To run the unit test:
`npx jest`

Project Objectives: Create a web app that students can use to generate practice problems! This leads to effective study and academic sucess! :D

Tech Stack: 
Front end: HTML, CSS, TypeScript, Next.js
Back end: TypeScript, Node.js
APIs: OpenAI, PDF.js
Hosting: Vercel, .NET CORE

Contributors:
Zoe Wong (zswong)
Lucas De Biasio (LucasDeBiasio)
Julie Wu (joolzmusic)
Yan Jin Song (Awesomedonut)
