# Localis

*by Matthew Campbell, Gary Cazzulino & Amrit Maharjan*

This is a Queensland University of Technology capstone project completed in conjunction with [Localis](https://www.localis.co/), a data localisation company based in Brisbane, Australia.

The application comprises a data visualisation dashboard with custom frontend and backend solutions developed for local governments and businesses interested in data for the tourism industry in Queensland, Australia. 

The app's features include rich data visualisations of key tourism metrics in the form of bar charts, scatter plots and pie graphs, as well as the ability to generate large language model analyses of the data which can also be downloaded as PDF reports.   

#### Our stack consists of:

- React and Tailwind CSS for UI components created for the dashboard
- Recharts for graphing
- Node.js/Express for backend APIs 
- A MySQL database
- OpenAI API for large language model data analysis

#### Technical enhancements include:

- Authentication and authorisation with JWT
- Deployment with Heroku
- State management using React Context API
- Security considerations including hashing

#### Known issues:

- Sidebar not resizing properly at the /dashboard endpoint in the deployed version of the app
- No completely robust solution developed to date for downloading PDF AI reports of data

The project is live and can be viewed [here](https://localis-capstone-f7a22eb1b92e.herokuapp.com/). 

To view the dashboard you will need to create an account, but feel free to just use a fake email address. 

Questions or feedback can be directed here: info@mattdev.it