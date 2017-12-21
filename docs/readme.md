---
title: readme
origfile: readme.md
layout: docs
---
* TOC
{:toc}
Welcome to the Red Eclipse Documentation repository.

The pages contained here are automatically built and updated on the [Website repository](https://github.com/red-eclipse/red-eclipse.github.io).

When editing pages here, there are a few guidelines you should follow.

## The Style
I didn't set a style guide to begin with because I was unsure of what to expect and unaware of any cross-compatibility issues. As I mentioned, the documentation will be automatically deployed to the Beta Website, and this involves going through a few steps using 
GitHub Pages. Basically there are two "pre-processors", [Jekyll](https://jekyllrb.com/docs/home/), and [Kramdown](https://kramdown.gettalong.org/syntax.html). It is necessary to understand the unique syntax of each when crafting your markdown pages.

### Headers
All headers should be presented in ATX format, Setex format is not supported. This means you create headers with the hash symbol (`#`), and not a line followed by a series of dashes (`-`). It is important to note that the title of the page will always be the 
first-level header (a single `#`), and your documents should always start with second-level headers (two `##`).

```
## First-level header in document
Text that goes after that.

### Second-level header in document
Text that describes what the second level is about.
```

### Tables
Your tables need to have an empty line before the first entry. Jekyll does not support rendering all table types without this being done.

#### Correct
```
Blah blah blah...

| Header | Information |
|--------|-------------|
| Item 1 | Item 1 data |
| Item 2 | Item 2 data |
| Item 3 | Item 3 data |
```

#### Incorrect
```
Blah blah blah...
| Header | Information |
|--------|-------------|
| Item 1 | Item 1 data |
| Item 2 | Item 2 data |
| Item 3 | Item 3 data |
```

### Images
It is inevitable that you are going to want to include images in your documents, and in most cases you are going to need to resize them in the page, which isn't something that is inherently supported by markdown. In these cases you can use the `<img>` HTML tag 
with some conditions:

- The tag should only be used if you need to do some sort of styling (like resizing, etc)
- You should **not** link to an outside source. Any images needed should be copied to the `images` directory in the docs repository.

### Paths
All paths need to be relative to each other. The docs repository is converted to GitHub Pages and sits in the `docs` directory, not at the root.

### Table of Contents
Kramdown supports the automatic generation of these, and the pages are automatically generated to include them. You do **not** need to create your own at the top of your pages.

