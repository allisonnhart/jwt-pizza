**Curiousity Report**

For my curiosity report, I wanted to dive deeper into how minification helps as a means of security for front-end code. In class, we very briefly talked about how, even though pretty much all websites in Chrome are able to be inspected, you can’t steal their code because of things like minification.

**Overview/Purpose of Minification**

From my research, I learned that minification is essentially shrinking down your code by cutting out things like whitespaces and shortening variable names<sup>[\[1\]](#footnote-1)</sup>. For example:

This is before minification:

![minification example 1](https://github.com/user-attachments/assets/5ee42d32-22a2-4924-b3a4-7aeb4c1b845b)


And this is after minification:

![minification example 2](https://github.com/user-attachments/assets/dcbbbb34-9cd1-4dd4-9b2d-b3abcbc54c52)


<sup>[\[2\]](#footnote-2)</sup>

By taking these measures, developers can reduce the file size, and in turn, reduce the amount of time it takes to run their program. It can also help with security measures! Like the example above shows, it’s a lot harder to read/process minified code; on a much larger scale, it would be practically impossible to decipher what a company was trying to do with their front-end (thus protecting them against people trying to steal front-end code through the inspect tool).

**Cons to Minification**

With all of these benefits, I also learned that minification (through its characteristics) can actually slow down project production/introduce errors. For starters, minification can make it harder for developers to look back and interpret/debug their code. One of my research points talked about how, as much as whitespaces, comments, and thorough variable names can make things longer/a bit slower, they are there for a reason! Humans need things like these to understand the code that they’re working with; if only the computer knew how to read your code, you wouldn’t be able to make changes/adapt it as issues pop up.

Minification can also cause issues because it creates several dependencies, each with the ability to take the others out if not careful. I read about how “minification can break complicated scripts because of site-dependent variables like themes, plugins, and server environment”.<sup>[\[3\]](#footnote-3)</sup> With the need for minification to be separated between production and development environments, combined with the need for several plugins/extensions needing to be unified across environments, it becomes very easy to break down code/get stuck in a difficult-to-find error. There are several pieces in place that all need to work nicely together in order for minification to truly be successful.

**Side Note to Minification**

Within researching for this report, I found a Reddit thread of developers talking about minification. One user talked about how obfuscation (the unclarity resulting from minification), while sometimes beneficial for security, is not the purpose in minification (contrary to my initial impression). Its main focus is for the time/size reduction of a program. Another user noted that “many of us \[developers\] are including source maps, which unravels the obfuscation on the client”.<sup>[\[4\]](#footnote-4)</sup> So there are other factors at play securing the front-end code of a website alongside minification.

**How Google Protects their Front-End Code**

This brought me back around to my initial question; how do websites protect their code? I looked at Google and discovered that along with minification, they also use “a custom Google Front End (GFE) to filter malicious requests, implement\[…\] strict access controls”, and take several other rigid security measures to make sure that code is extremely difficult to access- and only accessible through proper authorized access.<sup>[\[5\]](#footnote-5)</sup>

**Conclusion**

Minification can be used as a means of security (mainly through obfuscation), but there are resources out there able to break down that minification and decipher your code regardless. It takes several other security measures/permissions across different developers to really ensure that the code you put up on a website can’t be stolen by a hacker from another country. At its core, minification’s main purpose is to help reduce file size and storage. If you can keep track of the different environments/plugins needed, along with a knowledge of what your code is doing, it’s a very handy tool and can help create project efficiency.

1. <https://www.imperva.com/learn/performance/minification/> [↑](#footnote-ref-1)

2. Minification examples from reference mentioned in footnote 1. [↑](#footnote-ref-2)

3. <https://www.cloudflare.com/learning/performance/why-minify-javascript-code/#:~:text=Encryption%20is%20a%20security%20feature,understand%20and%20debug%20the%20code> [↑](#footnote-ref-3)

4. <https://www.reddit.com/r/Frontend/comments/1fs7kos/why_do_we_minify_and_obfuscate_our_code_no_really/> [↑](#footnote-ref-4)

5. <https://cloud.google.com/docs/security/infrastructure/design#:~:text=Titan%20Security%20Key.-,Secure%20boot%20stack%20and%20machine%20identity,help%20keep%20customer%20data%20safe>. [↑](#footnote-ref-5)
