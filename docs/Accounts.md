---
title: Accounts
layout: docs
origfile: Accounts.md
origtitle: Accounts
permalink: /docs/Accounts
redirect_from:
  - /wiki/Accounts/
---
* TOC
{:toc}
# Accounts

A Red Eclipse account is optional: you can always play without one. It gives you a **handle**, a name nobody else can take, which servers and other players see when it matters who you really are. Your standing, such as supporter or moderator, comes with it to every server. Accounts can also link your Steam and Discord accounts.

Your account proves who you are with a **key** that only you hold. The game keeps it in `auth.cfg`, in your Red Eclipse home folder, and signs you in with it on servers that use accounts.

## Registering

You need a handle and an email address. Your handle is 3 to 24 letters, numbers, `-` or `_`, and can't be changed later. Your email address is only used for the links described here, and is never shown to anyone.

**In the game:** open **Player setup**, then **Account**, enter your handle and email address and press **Register**.

**On the website:** go to https://www.redeclipse.net/account and fill in **Register**.

Either way, you get an email with a link to activate your account within 7 days. Until you do, the account can't be used, but nobody else can take its handle or email address. If it doesn't arrive, register again with the same handle and email for a new one. If someone used your address without asking, the email has a link to remove it straight away; otherwise it's removed after 7 days.

## Your key

When you follow the link and press **Activate my account**, the page shows your key **once**. Save it then:

- If you registered in the game and it's still running, it collects the key itself and saves it to `auth.cfg`. You're done.
- Otherwise, open the game's console with `` ` `` (the key above Tab), paste the `authkey` line the page shows and press Enter. The game saves it to `auth.cfg` for you.
- Or download the page's `auth.cfg` and put it in your Red Eclipse home folder:

| System | Home folder |
|---|---|
| Windows | `Documents\My Games\Red Eclipse` |
| Linux | `~/.redeclipse` |
| macOS | `~/Library/Application Support/Red Eclipse` |

The console shows the folder the game uses as "Home directory" when it starts; it may have another folder inside, such as `stable`.

Keep `auth.cfg` to yourself: anyone with your key can sign in as you. With the same `auth.cfg`, you can sign in on several computers.

## Lost your key?

Ask for a new one with your handle or email address: in the game under **Player setup**, **Account**, **Lost your key?**, or on the website's account page. If the account has an email address, it gets a link that lasts a day. Following it gives you a new key, the same way as activating, and the old one stops working everywhere.

## On the website

Sign in at https://www.redeclipse.net/account with your handle and key (the page can read them from your `auth.cfg`). There you can:

- **Set a display name**, which the website shows with your handle, such as `Someone Cool (someone)`. It can be up to 32 characters and change once an hour. Until you choose one, it's taken from the first name you're seen playing under, or your Discord name. In the game you go by your in-game name as always, and on Discord by your Discord name.
- **Link Steam**, by signing in to Steam.
- **Link Discord**, by signing in to Discord, or with a code: press **Get a /link code**, then type `/link <code>` to the Red Eclipse bot on our Discord within ten minutes. The game can make these codes too. `/unlink` on Discord removes it. Once linked, what you say in a server's thread on our Discord shows in the game as `Your Discord Name (handle)`, with your account's standing.
- **Change your email address.** The new address gets a link to confirm it, and the old one is told, with a link to stop the change.
- **Delete your account.** Its key stops working and its handle is free for anyone to register.

Linked Steam and Discord accounts are only shown to you, the master server's administrators and the Discord bot. See the [Privacy Policy](Privacy-Policy) for what an account holds.

## Standing

New accounts are players. Supporters, moderators and administrators are given their standing by the Red Eclipse Team; see [Privilege Levels](server-how-to/Privileges). Server operators can also give accounts a standing on their own servers.
