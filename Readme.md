Welcome to the Red Eclipse Website repository. This is a work in progress to update the website in preparation for v2.1.

This repository is automatically deployed by [GitHub Pages](https://pages.github.com/) to our [Website](https://redeclipse.net/) and includes pages built from the [Documentation Repository](https://github.com/redeclipse/docs).

When editing pages here, there are a few guidelines you should follow. It is also important to understand how the pre-processors work, like [Jekyll](https://jekyllrb.com/docs/home/) and [Kramdown](https://kramdown.gettalong.org/documentation.html). The configuration for everything is held in [_config.yml](https://github.com/redeclipse/redeclipse.github.io/blob/master/_config.yml).

## Front Matter
It is important to include the appropriate YAML [Front Matter](https://jekyllrb.com/docs/frontmatter/) and set at least the following values:

- **title:** The title of the page, which also acts as the first header.
- **layout:** Which [layout](https://github.com/redeclipse/redeclipse.github.io/tree/master/layouts) to use.
- **permalink:** Where the page sits when then site is built (please omit file extensions like '.html' and '.md').

### Layouts
Layouts are generally HTML templates that are used by inserting content and generating a static HTML page. You can see which layouts are available in the [layouts directory](https://github.com/redeclipse/redeclipse.github.io/tree/master/layouts).

- **default:** Used for rendering normal pages within the site, and, as the name implies, is the default if omitted from the front matter.
- **docs:** Used by the files generated from the [Documentation Repository](https://github.com/redeclipse/docs).
- **dynredir:** As the normal "redirect_to" does not allow the insertion of [variables](https://jekyllrb.com/docs/variables/), you can create an HTML file with this layout and define the URL in the content area.
- **home:** A special template used for the home page to arrange all the fancy stuff.
- **redirect:** Used by [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from), see their [usage](https://github.com/jekyll/jekyll-redirect-from#usage) for more information.

## File Types
You should use markdown when possible to create pages, and use HTML pages only if the situation merits it.

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


# Server browser

The system operates in a multi-stage process to minimize the load on the Master server while ensuring maximum data accuracy.


### 1. Python Poller (Backend)
The **Python Poller** acts as the heart of the system:
* **Master Discovery:** It retrieves the list of all active server IPs from the Red Eclipse Master Server.
* **UDP Queries:** The data is retrieved via **UDP** to get live stats and data.
* **JSON Output:** Collected data is saved into structured **JSON files**. This decouples data collection from the display, ensuring the website stays fast.

### 2. Server browser (Frontend)
The **Frontend** serves as the user interface for the community:
* The Server browser on the homepage parses the generated JSON files.
* Data is rendered into a user-friendly, responsive layout.
* Players can see exactly where the action is without needing to open the game client.

### 3. Notifications
Beyond just displaying data, the system includes a **Threshold-based Notification Mode**:
* **Threshold Check:** The poller monitors player counts against a set limit (e.g., "Notify when 4+ players are online").
* **Trigger:** Once the player count hits the threshold, the system triggers a notification (Browser notification or Discord Webhook).

---

## System Benefits

* **Efficiency:** UDP pings and JSON caching keep web performance high, regardless of game server response times.
* **Automation:** Players don't have to manually refresh; the system "calls" the community when a player joins.
* **Mobile Ready:** The frontend is optimized so that server lists and stats remain perfectly readable on smartphones.

---


# Running the Homepage (Jekyll)

The website is built using **Jekyll**, a Ruby-based static site generator. Ensure **Ruby** and **RubyGems** are installed on your system.

## Installing

Clone the git repository and navigate to the top-level directory. Install the dependencies using Bundler:

    bundle install

*Note: If you don't have Bundler, install it first with `gem install bundler`.*

## Running

To launch the local development server, run:

    bundle exec jekyll serve --watch

By default, the web UI will be available at `http://localhost:4000`. Jekyll will automatically watch for file changes and regenerate the site.

---

# Running the Server Browser (Python poller)

The data poller is a **Python** application. Ensure **Python 3.8+** is installed.

## Installing

Clone the repository containing the poller and install the necessary Python packages:

    pip install -r requirements.txt

## Running

The poller communicates with the master server via UDP and generates the JSON data used by the frontend. Run it with:

    python3 getservers.py

### Advanced Usage

To enable the legacy notification mode (watching for player thresholds) and debug output:

    python3 getservers.py [-h] [-d]
    
    options:
    -h, --help   show this help message and exit
    -d, --debug

By default, the script writes its JSON output to the directory used by the homepage. Edit the configuration variables at the top of `getservers.py` or provide command-line arguments to change paths and notification thresholds.
