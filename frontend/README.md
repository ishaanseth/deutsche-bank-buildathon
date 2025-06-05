Scraper Code: https://colab.research.google.com/drive/1AW_CTyVEpZBzvzFLsHNblSOQydm1eIOF?usp=sharing

## Frontend code demo: 

[Demo Video](https://drive.google.com/file/d/10OWAJnRGKeUWSPYBDBuJBsWaH7j7ryC6/view?usp=sharing)

## Scraper explaination:

We are storing scraped news data in mongodb accroding to different ecnomomic, climate, legal conditions:

![WhatsApp Image 2024-10-21 at 09 52 24_e108bdc4](https://github.com/user-attachments/assets/10c937c3-d5fe-43a4-99b3-ae64e464aaff)

![WhatsApp Image 2024-10-21 at 09 52 01_d066a55f](https://github.com/user-attachments/assets/f2286bb8-cb49-40c5-9991-6b8819ce8bc1)

At each step we are using a fine tuned version of distil-bert to get sentiment score for each article and decide how it will effect the company's liquidty. He are we are only considering 'Mercedes' this model can be extened to other companies as well.

At the end the Model gives overall suggestions based on all the news artciles scraped:

![WhatsApp Image 2024-10-21 at 09 51 44_f3c41935](https://github.com/user-attachments/assets/c54d0815-ad6c-4b88-8877-5136ee874b36)

## To run to frontend code:
1. Clone the repo
2. Run `npm install`
3. To view the project run `npm run dev`
