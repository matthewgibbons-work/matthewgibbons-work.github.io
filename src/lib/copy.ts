// The Copy buttons: the site's only JavaScript besides the light/dark toggle.
// One module for every button (CopyButton, and the bars MarkdownBody puts above code blocks).
// Imported from more than one component, it still runs once per page.
// Buttons start hidden, so without JS there's never a button that does nothing.

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy-target]')) {
  const block = document.getElementById(button.dataset.copyTarget ?? '');
  const status = button.parentElement?.querySelector('.copy-status');
  if (!block || !status) continue;

  // Clear, then set on the next frame, so screen readers announce every click.
  const announce = (message: string) => {
    status.textContent = '';
    requestAnimationFrame(() => (status.textContent = message));
  };

  // The button itself says "Copied" for 2 seconds, so success is hard to miss (CB-1).
  const label = button.textContent;
  let reset: number | undefined;

  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      // A fenced block ends with a newline; drop it so a pasted prompt doesn't send early.
      await navigator.clipboard.writeText((block.textContent ?? '').replace(/\n+$/, ''));
      announce(button.dataset.copied ?? 'Copied.');
      button.textContent = 'Copied ✓';
      clearTimeout(reset);
      reset = window.setTimeout(() => (button.textContent = label), 2000);
    } catch {
      // Clipboard blocked: select the text so one keypress copies it. Open a
      // collapsed <details> first (Spark 1's inline prompt), or nothing is selected.
      block.closest('details')?.setAttribute('open', '');
      const range = document.createRange();
      range.selectNodeContents(block);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      announce('Couldn’t copy automatically. The text is selected: press Cmd+C (Mac) or Ctrl+C (Windows).');
    }
  });
}
