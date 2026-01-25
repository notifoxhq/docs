---
slug: we-launched
title: We've launched
authors: [mathis]
tags: [release, announcement]
---

Late last year I accidentally forgot to destroy a GPU EC2 instance that was part of a Kubernetes cluster to try out Ollama for a YouTube video (which you can watch [here](https://youtu.be/Yomo2DnL9NA)). This mistake of not deleting the instance ended up costing me well over $500. As you can imagine this left a sour taste in my mouth as this (for me at least) is serious cash!

I had even configured an AWS billing alert set at $30 months before, but that didn't help me much for several reasons:
- By the time I was done playing with the GPU instance I had already racked up a bill higher than my alert threshold, so when the alert came in via email I dismissed it
- I had only set 1 alert threshold, so the only other email I was ever going to get was the final one
- I had not configured SNS because of the steep costs, and the emails I was receiving didn't look nearly as important
- I had not built a habit of checking my AWS billing console.

So after the end of the month rolled around I was dumbfounded to see a huge AWS bill.

This led me on a journey of thinking of ways to prevent this from ever happening again. I immediately started toying around with running a Lambda function once a day to check my current balance, and try to predict the final balance based on the slope of my daily spend graph. This worked pretty well, but one piece of the puzzle was missing:

<!-- truncate -->

### The notifications!

Emails are a great alerting channel for non urgent matters, things you can put off a couple of days, or ultimately forget about all-together. Emails are simply not **in your face** enough to alert yourself of important events! And my AWS bill exceeding anything over a couple of $ was an important event to me. So I looked into how to send myself text messages.

I quickly realized that my main options were large providers such as Twilio and AWS SNS, both of which had incredibly high startup costs, strict regulatory requirements and a very high lead time. But there wasn't much else for me to do, so I went through the process of getting a 10DLC verification with Twilio. 3 weeks older and $30 poorer, I had a phone number I could send text from. Unfortunately, I was spending $2 a month renting this phone number out. In most months this happened to be more than my AWS bill.

It was at that point I realized there had to be something else, but I couldn't really find anything that fit my use-case. I wanted a self serve, quick to get started, fixed-cost free service that let me send myself text messages.

So I got to working on building a solution. And that's how we arrive at this blogpost.
After months of hard work, and late nights. I'm very proud to announce the official launch of [notifox.com](https://notifox.com).

As it stands, the [Alerts API](/docs/reference/alerts-api) is the main event of the launch. It allows you to send yourself (or a teammate) an SMS notification, and can be set up in minutes. It's exactly what I would have needed at the end of last year to prevent from getting a billing surprise. Our goal at Notifox is to empower people to build notification systems for the things they want to be notified about, without having to worry about telecom regulations, leasing phone numbers and setting up LLCs, etc and I think we have achieved that goal with this launch.

But we're far from done! We have a laundry list of ideas we want to implement to make Notifox even better! Here are some examples:
- oncall rotations
- email, slack, discord channels
- audience aliases
- automatic short linking
- AI powered thresholds
- native alertmanager support
- GitHub Actions integrations
- Golang and JavaScript SDKs
- and much much more

We are incredibly excited about the privilege of building out these features for developers just like us who are tired of being alienated by expensive enterprise software.

## Try It Yourself

If you've ever found yourself in a similar situation, needing simple SMS alerts without the enterprise complexity then Notifox is built for you. Getting started takes just a few minutes:

1. **[Sign up](https://console.notifox.com)** and create your account
2. **Add funds** ($5 minimum) to your account
3. **Verify your phone number** by adding an audience
4. **Send your first alert** using our simple API or [Python SDK](/docs/languages/python)

At $0.025 per SMS, you can send 200 alerts for just $5. No carrier verification, no number leasing, no monthly fees.

If you're already using Twilio or AWS SNS for simple alerting and want to save money, or if you've been putting off setting up SMS notifications because of the complexity, give Notifox a try. We'd love to hear your feedback and learn about the use cases you're solving.

You can find us on [GitHub](https://github.com/notifoxhq), [Discord](https://discord.gg/ZSp5SzxJBF), or reach out directly at support@notifox.com. Let's build better notification systems, together.