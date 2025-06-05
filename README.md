# LiquiFin

## Description
LiquiFin is a news scraper for a specific company/sector which then goes to AI for sentiment analysis and finally is presented in the frontend website showing if the news are good or bad, and then provide suggestions like if you should invest or liquidate your assets on that company.

## Buildathon Achievement
Won 2nd Place in the Deutsche Bank AI-Finance Buildathon (Problem Statement 3).

## Demo Video
[Watch the Demo](https://drive.google.com/file/d/10OWAJnRGKeUWSPYBDBuJBsWaH7j7ryC6/view?usp=sharing)

## Technologies Used
- **Frontend:** Next.js
- **Backend:** Python (Jupyter Notebook)
- **Database:** MongoDB
- **AI/Sentiment Analysis:** DistilBERT

## Core Features
- Scrapes news for a specific company or sector.
- Performs AI-driven sentiment analysis on the gathered news.
- Presents analysis results (positive/negative news impact) on a web frontend.
- Provides investment/liquidation suggestions based on the sentiment.

## Setup & Run Instructions

### Frontend
1. Clone the repo.
2. Navigate to the `frontend` directory: `cd frontend`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

### Backend
Backend setup instructions (e.g., running the Jupyter Notebook `backend/financial_news_analyzer.ipynb` and ensuring MongoDB is running) will be added here.

## Scraper Code
The scraper was developed in a Google Colaboratory environment. You can find the notebook here:
[Scraper Notebook](https://colab.research.google.com/drive/1AW_CTyVEpZBzvzFLsHNblSOQydm1eIOF?usp=sharing)
