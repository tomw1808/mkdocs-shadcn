# About MkDocs-Shadcn

Hi, my name is Thomas and I'm a sucker for fast, developer friendly, great looking docs. 

Great looking docs are the reason I got lured into Web3 Development. Great looking docs are responsible for me learning tailwind. Great looking docs are essential for me to start on something new.

## Why MkDocs-Shadcn

On a HN-comment someone said something like "shadcn is the modern bootstrap". That person did not mean it in a good way. However, I think its great for docs! When I (as a developer) look at docs, I want consistent design. I want to "feel at home". 

Shadcn doing to Nextjs what boostrap did to regular websites means consistency. 

People expect a sidebar nowadays.

People expect a simple search functionality.

People expect to have code highlighting.

People expect to have a somewhat decent typography and a layout that's easy on the eyes.

Admittedly, I am not a designer, but with shadcn and tailwind, a lot of the things come out of the box.

But, why mkdocs-shadcn over regualr mkdocs or mkdocs material? 

## MkDocs-Shadcn vs MkDocs-Material

MkDocs Material is a free, open source, static content generator based on the Material theme. It's great looking, is powered by Markdown Python and with all the different blocks it can parse, it just looks great.

Making it work with server side dynamic code is a nightmare.

If you are hosting a project where you want interactive code samples, server side things like memberships, comments etc, you're out of luck (or need to add something with iframes etc). I did try parse the static html from mkdocs material via an expressjs webserver to add AWS Cognito membership areas. It was no fun.

What I actually wanted was to take my markdown files I worked on for two years, drop them into a nextjs project and "just parse them"™️. How hard can it be. Turns out, pretty hard. But here it is, MkDocs-Shadcn, my (limited) drop-in replacement for MkDocs-Material.

I think nextjs has evolved into a great framework for starting a smaller business with an MVP and a landing page. This is where MkDocs-Shadcn comes in. Out of the box you get great looking docs, add whatever else nextjs functionality you need, and have a great looking starter site for an MVP very very quickly.


## Coding with the help of AI and LLMs

This project was in part done with the help of Aider and Sonnet 3.5. Actually, Aider is responsible this project even started. One weekend I sat there and thought "lets see what Aider can do" and started with a simple prompt. And then more prompts followed. I learned Aider is a great way to do all the boilerplate code I don't want to write anymore and I intend to keep using it for bugfixes or feature requests. It's not so good for actual code architecture, but that's ok.

I'll keep using Aider. If you are writing a github issue or a feature request, it would be great to be able to copy/paste the request directly into Aider to prompt the LLM for (simple) changes, it will ease the development a lot.

## Community?

Is there a community or how to get in touch? There's none at the moment. I offer this project, which I will use to host my ethereum-blockchain-developer.com course documentation, as a free download and docs-starter project for everyone. 

May the world have better docs 🤘🏻