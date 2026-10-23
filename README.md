# A Little Something for Esha

A birthday surprise website made with HTML, CSS, and vanilla JavaScript. It works without a backend or paid assets.

## Edit the website text

The page text is kept in `index.html`. Search for the `EDITABLE COPY` comments to find the opening screen, letter, appreciation placeholders, gift labels, wishes placeholders, final message, and footer.

- Replace bracketed text such as `[Add a personal wish here.]` with your own words.
- The three messages revealed by the gift boxes are together in the `giftNotes` array at the top of `src/script.js`.
- Music button labels and their screen-reader labels are also in `src/script.js` and `index.html`.

The page currently displays no birthday date or countdown.

## Run the website

In Replit, select **Run** to start the site and view it in Preview. To run it from the Shell, use:

```sh
pnpm --filter @workspace/esha-birthday-surprise run dev
```

## Publish the website

After checking the Preview, select **Publish** in the top-right of the Replit editor. Review the publishing options, then publish and open the live link to confirm it looks right.

The background music is optional and only starts when the visitor selects the music button.
