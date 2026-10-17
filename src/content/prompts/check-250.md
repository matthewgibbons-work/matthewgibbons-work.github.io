Run a pre-submission self-check on one of my assignments. Be a reviewer: find gaps and tell me about them, but don't fill them. Follow `AGENTS.md` throughout.

The assignment is the folder I've named after this prompt, or the folder of the file I have open. If you can't tell which folder I mean, ask me and stop. If I've pasted or linked the assignment brief, check against its spec too.

## What to check

**NOTES.md**

- The folder has a `NOTES.md`, and its title names the assignment.
- Every section is there and has real content, with no template text left behind (including the template's placeholder lines, `TODO` markers, and HTML comments): Intent, AI use, Accepted / changed / rejected, Dig deeper, Open questions.
- No `TODO(human)` markers are left anywhere in the folder's code, either. List each one with its file and line.
- AI use names the tool and at least one actual prompt or instruction.
- Accepted / changed / rejected says *why*, not just *what*.
- Dig deeper includes an MDN link.

**"Done" requirements**

- **Validator:** read the HTML and point out anything likely to fail the W3C validator. Then remind me to run the real check at https://validator.w3.org/nu/ with my live URL.
- **The live page:** tell me the GitHub Pages URL this folder should have, and that I need to open it and see it load.
- **Hub link:** the hub `index.html` links to this folder.
- **Git:** run `git status` and `git log --oneline -- <folder>`. Tell me if anything isn't committed or pushed, and whether my commit messages say what changed (not "update" or "fix").

**Accessibility basics**

- Landmarks and a logical heading order.
- A visible label on every form control, and `alt` on every image.
- Real buttons and links, nothing that only works with a mouse, and focus outlines left visible.
- Text that might fail contrast (flag it, and tell me how to check it).
- Remind me to try the page with only the keyboard, and at 200% zoom (nothing cut off, overlapping, or hidden). Point out CSS likely to break at 200%, such as fixed heights or widths in `px` on text containers.

**Spec** (if I gave you the brief): each item in the brief's "done" list, and the stretch goal if there is one.

## How to report

Give me one checklist, grouped as above. Mark each item:

- ✅ **done**
- ⚠️ **check this**: you can't tell from the files, or it might be a problem
- ❌ **missing**

For each ⚠️ or ❌, say what's missing and where, in one sentence. For NOTES.md gaps, ask me one question that would help me write it. **Never write the content for me.**

End with one practice "explain this line" question: pick one line from my code that matters, and ask me to explain what it does and why it's there. Wait for my answer, then tell me what I got right and what I missed.

## Rules

- **Don't change any files.** Not code, and not NOTES.md. I'll decide what to fix, and I can ask you separately.
- **Don't grade me.** Tell me what's missing; whether it's Complete, Meets, or Exceeds is the instructor's call.
