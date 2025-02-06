# How to contribute to MkDocs-Shadcn

If you want to contribute from outside to MkDocs-Shadcn, then please fork the repo, push your changes in your own fork and then create a pull request. As easy as that!

## Changelog

Add your changelog to the about/changelog.md file in the current release section

## Considerations

This project is a drop-in replacement for MkDocs-Material. Here it might have addition functionality, but it should always remain backwards compatible. That is, any existing mkdocs-material project should be able to take the docs and the mkdocs.yml file and put them in the mkdocs folder and it "just works". 

Anything that MkDocs-Shadcn does can be a forward-only drop in, but it should not break the actual functionality. 

## Vercel

MkDocs-Shadcn should be runnable on vercel. If your change is breaking this functionality it won't be merged in.