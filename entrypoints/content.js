// entrypoints/content.js
export default defineContentScript({
  matches: ['*://www.linkedin.com/mynetwork/grow/'],
  main() {
      const button = document.createElement('button');
      button.innerText = 'Click All Connect Buttons';
      button.style.position = 'fixed';
      button.style.top = '50px';
      button.style.right = '20px';
      button.style.fontSize="1.5rem"
      button.style.fontWeight="500"
      button.style.padding="10px"
      button.style.zIndex = 1000;
      button.style.borderRadius = "20px"
      button.style.borderWidth="1px"
      button.style.borderStyle="solid"
      button.style.borderColor="#0a66c2"
      button.style.color="#0a66c2"
      button.style.backgroundColor="white"

      button.addEventListener('click', async () => {
          const connectButtons = document.querySelectorAll('button[aria-label^="Invite"][aria-label$="to connect"]');
          if (connectButtons.length === 0) {
              alert('No connectable profiles available.');
              return;
          }
          for (const btn of connectButtons) {
              btn.click();
              await new Promise(resolve => setTimeout(resolve, 3000)); // Delay of 3 seconds
          }
      });

      document.body.appendChild(button);
  },
});
