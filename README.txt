==========================================================
  GAYATRIDUGAR.COM — SIMPLE INSTRUCTIONS (no tech needed)
==========================================================

THE PAGES
  index.html    Home (hero + chapters menu + mixed gallery)
  gayatri.html  Gayatri tab
  family.html   Family tab
  punit.html    Punit tab
  wpeople.html  W People tab
  parth.html    Parth tab (text only)

WHERE FILES GO
  photos/               -> used by the HOME page only
      portrait.jpg        big photo in the hero
      1.jpg ... 10.jpg    home "Moments" gallery
      wide.jpg            full-width banner

  media/gayatri/        -> Gayatri tab
  media/family/         -> Family tab
  media/punit/          -> Punit tab
  media/wpeople/        -> W People tab

  In each of those 4 folders name files like this:
      1.jpg, 2.jpg, 3.jpg ...   (photos)
      v1.mp4, v2.mp4 ...        (videos)

----------------------------------------------------------
IMPORTANT — TELL THE SITE HOW MANY FILES YOU ADDED
----------------------------------------------------------
Each page has ONE line that controls this. Example inside
gayatri.html:

    <body data-media="gayatri" data-photos="8" data-videos="2">

Added 5 more photos? Change data-photos="8" to the new total.
No videos for a tab? Set data-videos="0" and the Films
section disappears automatically.

Or just tell opencode: "I put X photos and Y videos in the
family folder" — it updates everything for you.

----------------------------------------------------------
SEE IT RIGHT NOW
----------------------------------------------------------
Double-click index.html. Empty tabs show elegant numbered
frames until you add files — that's normal.

----------------------------------------------------------
CHANGE TEXTS
----------------------------------------------------------
Right-click any .html file > Open with > Notepad.
Ctrl+F for words you see on screen, edit, save, refresh.
(Parth's message: edit parth.html, replace the line with
"[ Parth's message will live here. ]")

----------------------------------------------------------
GO LIVE (free)
----------------------------------------------------------
1. Buy gayatridugar.com (~$12/yr) at namecheap.com.
2. Open https://app.netlify.com/drop
3. Drag the WHOLE "gayatridugar-site" folder onto it.
4. Make a free Netlify account when asked.
5. Netlify: Site configuration > Domain management >
   Add a domain > gayatridugar.com > follow prompts.
6. Copy the DNS records Netlify shows into Namecheap's
   Advanced DNS page.
7. Wait a few hours -> live worldwide.

UPDATES LATER: Netlify > your site > Deploys > drag the
updated folder again.
