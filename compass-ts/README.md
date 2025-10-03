# Compass

Compass is a [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

All course content is located in the `/src/data/lessons.ts` file and the `/src/data/lessons` folder.

All interview content is located in the `/src/data/interviews.ts` file and the `/src/data/interviews` folder.

## Images

This template uses the Next.js `<Image>` component to render images.

If your images are hosted remotely, update the `images.remotePatterns` setting in `next.config.ts` to match the correct URL. If you're serving images locally, you can remove the `images` key entirely.

When adding images to lesson markdown files, be sure to include the image size after the alt text, as the Next.js `<Image>` component requires this:

```md
![My alt tag|1000x500](my-image.png)
```

To support both light and dark mode images, insert `.{scheme}` before the file extension:

```md
![My alt tag|1000x500](my-image.{scheme}.png)
```

Then provide two versions of the image:

- `my-image.light.png` for light mode
- `my-image.dark.png` for dark mode

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation
