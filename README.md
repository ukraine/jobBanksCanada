# Navigating Canada's Job Market: How I tried to automate Job Applications as a Software Engineer

Starting my job hunt in a new country felt like stepping into a massive library with no idea where to find the book I needed. Coming right after the neighboring country's violent invasion of Ukraine in 2022, I arrived with high hopes but quickly encountered a wall.

The job market here was a whole new world, and my usual approach just wasn't cutting it. Friends and settlement organizations suggested trying online job boards such as Job Bank Canada and Indeed.

## The concept of Job Application Automation with a Human Touch

I wasn't aiming to spam companies with my resume. Instead, I sought to automate certain aspects of the process to save time and target suitable jobs for me in a more personalized manner. Moreover, it wasn’t solely about finding a job; it was also about learning how to use technology and AI, in particular.

In sharing this story, I hope to inspire others to look at their challenges differently and maybe even find new ways to tackle them.

Here's how I pieced it together, combining RSS feeds, server-side scripts, custom Chrome extensions, and the innovative use of AI to enrich data and personalize applications:

## Step 1: RSS for Job Listings

Daily, a script on a Linux server I set up would fetch RSS feeds from Job Bank Canada, filtering opportunities based on my predefined keywords. It would store the data gathered into a cache file that another part of the system would work with later.

This step appreciates the enduring value of RSS, allowing me and other old-school guys to stay updated with minimal effort. So a big special thank you to the services and platforms like Job Bank for maintaining it

[Example of an RSS URL with a keyword](https://www.jobbank.gc.ca/jobsearch/feed/jobSearchRSSfeed?fage%3D2%26fcid%3D5741%26fcid%3D5753%26fcid%3D12348%26fcid%3D12351%26fcid%3D20945%26fcid%3D24755%26fcid%3D296544%26fcid%3D296623%26fn21%3D21233%26fn21%3D21234%26fn21%3D22220%26term%3Dweb%26sort%3DD%26rows%3D100&sa=D&source=editors&ust=1712177363672906&usg=AOvVaw30km108n20ZSnXLKLLNKT8) 

### Technologies used

*   PHP
*   PHP Simple XML
*   Linux Bash Scripting
*   Crontabs

## Step 2: The Manual Touch: Reviewing Matches

Despite the automation intention, I chose to review the matches manually, ensuring that only the most relevant opportunities were considered. At least at the beginning. This blend of automation and personal oversight was enough for maintaining quality in the job hunt. I figured out there were too many vague jobs that didn't sound legit to me.

Technically the script reads the cached file and displays the number of items found for each keyword. At first I was copying job posting details manually, but I gave up doing so for each listing. Even so sometimes the same position can be seen twice or more if it contains different keywords, so…

### Technologies used

*   PHP

## Step 3: Crafting a Custom Chrome Extension

![AD_4nXdcZjmCWNhCHue4lV6-NubGJgmr75CMEconC7pKjjZdPOeKKvgi5o-zx9Lj7mtgRrs4-Nq5HrNuQB-A8dg6uncdJtXQGinYSOz1Iei1EA5HYWqIFobUNh4W92rKeDhsa92OSj9t-2Scv4SISbfJMl0eTqfs](https://lh7-us.googleusercontent.com/docsz/AD_4nXdcZjmCWNhCHue4lV6-NubGJgmr75CMEconC7pKjjZdPOeKKvgi5o-zx9Lj7mtgRrs4-Nq5HrNuQB-A8dg6uncdJtXQGinYSOz1Iei1EA5HYWqIFobUNh4W92rKeDhsa92OSj9t-2Scv4SISbfJMl0eTqfs?key=ztMFgSE0-QFvPjLHrdcH3A)

Screenshot of the extracted data ([link](https://lh3.googleusercontent.com/5Dd47d3tikwEqPX6mCTQCR5G0HmVJmd95WNbcMVzQJx1KMU9D0UvyV1o3lyNFLLh2cmHwNoRveJgPSMcVxUM_1gF%3Ds1280-w1280-h800&sa=D&source=editors&ust=1712177363674502&usg=AOvVaw0GCaRTRx8dDH9VCbRtopl1))

..to expedite the review process and eliminate duplicates, I developed a simple parsing Chrome extension. The details it captured included the position name, salary range, contact info, and other essential data. I opted to automate this aspect in later versions of the system and either discard or repurpose the extension.

Once I obtained the data, if I deemed the listing worthwhile, a click would save it directly to a Google Spreadsheet. Initially, I didn't want to set up a separate database for this project. Therefore, this convenient and widely used Google product suited my needs, allowing me to maintain simplicity

### The extension:

[Install the extension](https://chromewebstore.google.com/detail/canada-job-%25E2%2580%2594-track-jobs-i/lnlddjilnbfoklnfljfolahkchldobgc&sa=D&source=editors&ust=1712177363675108&usg=AOvVaw1ntRT3uuYzCZnVPXkykCyS)

[View Github source code](https://github.com/ukraine/jobBanksCanada)

### Technologies used

*   Google Spreadsheets API
*   Google Chrome’s extension
*   JavaScript

## Step 4: Enriching Data with Server-Side Scripts and AI

I then enhanced my spreadsheet's listings using a server-side script to extract insights from employer websites, such as career page addresses, additional contact details, and social media links. More technical details like the server software and programming languages used were also gathered

![AD_4nXeqmMbH-xUfUNOkABnoWgA3yGqfiRDlPDmmbAPPbjvHKBiArUiSr4Y9blzbenL--hHklKgiby9SzaE_H2TxVt0nojbVVtSyyVPZecGDRCD08BvGv4Qf0vMSYWOxdQ7UOU76Brp4A_gXy8LBHS2duGUNLHQ](https://lh7-us.googleusercontent.com/docsz/AD_4nXeqmMbH-xUfUNOkABnoWgA3yGqfiRDlPDmmbAPPbjvHKBiArUiSr4Y9blzbenL--hHklKgiby9SzaE_H2TxVt0nojbVVtSyyVPZecGDRCD08BvGv4Qf0vMSYWOxdQ7UOU76Brp4A_gXy8LBHS2duGUNLHQ?key=ztMFgSE0-QFvPjLHrdcH3A)

The major breakthrough came from integrating OpenAI's API, which summarized websites and classified industries, enriching each saved job listing with valuable context. To optimize OpenAI token usage, I trimmed the content to focus on the most relevant sections for analysis, avoiding excess from footers or irrelevant links

### Technologies used

*   PHP cURL
*   Prompt Engineering
*   OpenAI API
*   Google Spreadsheets API

## Step 5: Personalizing Cover Letters and resumes objectives

To avoid the impersonal nature of mass applications, I used OpenAI's API selectively to tailor cover letters, inserting placeholders for the company name, industry, and the software they utilize. When you know the product or service the company produces, you understand the value you may provide to it.

![AD_4nXeXAEW5VpDzLFeNj5fo7zcmgDJrl5tjrrp3Nf0x9B1C5jL7GzS91_Jb6d-a9qQMJOinHbjFGk3e0AtGP8NIfMcXMv5P0hSRTaSQF_S8Jw_jXy-4l6jBP0wB0v9zYMGeFd14Wn3NGiq1MWMHJ3mNRUue_k19](https://lh7-us.googleusercontent.com/docsz/AD_4nXeXAEW5VpDzLFeNj5fo7zcmgDJrl5tjrrp3Nf0x9B1C5jL7GzS91_Jb6d-a9qQMJOinHbjFGk3e0AtGP8NIfMcXMv5P0hSRTaSQF_S8Jw_jXy-4l6jBP0wB0v9zYMGeFd14Wn3NGiq1MWMHJ3mNRUue_k19?key=ztMFgSE0-QFvPjLHrdcH3A)

That was the only way to stand out among other applicants who use the semi-cold outreach approach. This strategy demonstrated genuine interest in each employer even if I visited the website automatically in less than a second.

### Technologies used

*   OpenAI API
*   PHP

## Step 6: Generating PDFs for Applications

Aware of the limitations and risks associated with direct links in emails, I opted for a more conservative approach: converting resumes and cover letters into PDFs. Despite my preference for digital simplicity, the goal was to ensure my applications reached their destination with a reduced chance of being sidelined into spam folders or worse.

The PDF files generated were cached on the server side to be attached to my emails.

### Technologies used

*   PHP
*   DomPDF
*   Ubuntu Linux
*   JavaScript

## Step 7: Enhancing Communication and Email Dispatch

After the initial steps of data enrichment and personalization it is now time for the critical phase — communication.

Upon selecting a potential opportunity, a predefined email template loaded into a textarea, ready for any final, personal touches.

The interface was similar to gmail's one, where email addresses and the subject lines were populated automatically. I used the position name, my name and the company name in the subject. Sometimes I had to visit the website of a company of my interest again to ensure I don’t like or sound mistaken.

Anyway, I reviewed and, if necessary, customized each message before proceeding. This part can be automated later too. At least I thought I would do so.

![AD_4nXezDVkTyuRj-Zyx1Xr45gV5wtiEWOBSJr-C7q866M2JzJcSQLlOEkdon3MFdkXc1wIYa3i6iR-mIIuTPt4pZs8TUx3Fzbvp43VIWHqYAZ3hxGl2EDJRzxixsXLSjUSmm6KnNEdXf5wKA--BhKkOX_ts6M0](https://lh7-us.googleusercontent.com/docsz/AD_4nXezDVkTyuRj-Zyx1Xr45gV5wtiEWOBSJr-C7q866M2JzJcSQLlOEkdon3MFdkXc1wIYa3i6iR-mIIuTPt4pZs8TUx3Fzbvp43VIWHqYAZ3hxGl2EDJRzxixsXLSjUSmm6KnNEdXf5wKA--BhKkOX_ts6M0?key=ztMFgSE0-QFvPjLHrdcH3A)

To further avoid the stigma of automated spam, emails were dispatched at random intervals. This careful timing was designed to mimic human irregularity, reducing the likelihood of triggering spam filters and increasing the chance of email deliverability

### Technologies used

*   Gmail’s SMTP
*   CronJobs
*   Water.css
*   PHP

## Step 8: Refining Email opening Tracking

Another gem of my job application toolkit was an email tracking system. I implemented a technique to outsmart tracker caching, subtly changing the tracking image's color scheme embedded in my email signature with each dispatch.

![AD_4nXe_N23Lhf8rPxyROyEHxzSEcHnfyykYPLcopN7zmhdodqE1cFYccwPbm_gJEgFCIqmaD2yaskCBO4V8PN4b1iSmifp1IfU7Owfid1TAiLXVBd5GWR1xeqT3t1NQ-x-2zYG0dPWQv_n1CU5dyhKbVPnGKuc9](https://lh7-us.googleusercontent.com/docsz/AD_4nXe_N23Lhf8rPxyROyEHxzSEcHnfyykYPLcopN7zmhdodqE1cFYccwPbm_gJEgFCIqmaD2yaskCBO4V8PN4b1iSmifp1IfU7Owfid1TAiLXVBd5GWR1xeqT3t1NQ-x-2zYG0dPWQv_n1CU5dyhKbVPnGKuc9?key=ztMFgSE0-QFvPjLHrdcH3A)

This ensured each email open was uniquely recorded, triggering a script to log the activity directly into my Google Spreadsheet against the respective employer. This method provided precise insights into who engaged with my emails, how many times, significantly informing the effectiveness of my approach.

While this tactic faced limitations with Gmail, it proved highly effective with other providers, particularly corporate ones.

### Technologies used

*   cURL
*   Google Spreadsheets API
*   PHP

## Conclusion Insights

Sending each resume out of over 400 felt like giving away a great book to someone who's already received 400 others. The rare responses  I got were like small beams of light—rare but motivating. Adding a tracking system helped me see if my book even stood out in the pile.

It was a journey of patience, perseverance, and a personal test showing that job platforms like Job Bank might not be the best for IT jobs. It seems employers prefer traditional methods like recruiters, LinkedIn, or employee referrals.

Automating my job search was a huge learning curve. It was more than just speeding up applications; it was about making technology an ally in a personal quest. By blending RSS feeds, a Chrome extension, AI, and clever email strategies, I made my job hunt more efficient, yet personal.

The experience taught me valuable lessons about using technology wisely and staying true to myself. It's not about replacing the personal touch with technology, but enhancing it, showing that with the right approach, we can push beyond what we thought was possible.

[Version 1: draft](https://docs.google.com/document/d/1UdR_5meaRg5y9kMv-XGOk_8Ju0imft7o_1auyBddZX0/edit%23heading%3Dh.mkmdcpx4tcez&sa=D&source=editors&ust=1712177363681632&usg=AOvVaw13i7O3tjfBx4ZrulC07glH)
