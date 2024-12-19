export default defineContentScript({
    matches: ['*://www.linkedin.com/mynetwork/grow/'],//if this LinkedIn link is opened then it showed the 'Connect With All' 
    main() {
        let stopConnecting = false;
  
        // Create "Click All Connect Buttons" button
        const connectButton = document.createElement('button');
        connectButton.innerText = 'Connect With All';
        // give button styles
        connectButton.style.position = 'fixed';
        connectButton.style.top = '50px';
        connectButton.style.right = '20px';
        connectButton.style.fontSize = '1.5rem';
        connectButton.style.fontWeight = '500';
        connectButton.style.padding = '10px';
        connectButton.style.zIndex = 1000;
        connectButton.style.borderRadius = '20px';
        connectButton.style.borderWidth = '1px';
        connectButton.style.borderStyle = 'solid';
        connectButton.style.borderColor = '#0a66c2';
        connectButton.style.color = '#0a66c2';
        connectButton.style.backgroundColor = 'white';
  
        connectButton.addEventListener('click', async () => {
            stopConnecting = false; // Reset the stop flag
            const connectButtons = document.querySelectorAll('button[aria-label^="Invite"][aria-label$="to connect"]');
            if (connectButtons.length === 0) { //if no connect people then shows alert message
                alert('No connectable profiles available.');
                return;
            }
            for (const btn of connectButtons) {
                if (stopConnecting) break; // Stop the loop if flag is set
                btn.click();
                await new Promise(resolve => setTimeout(resolve, 3000)); // Delay of 3 seconds
            }
            if (!stopConnecting) alert('Finished connecting with all profiles.');//if all connect profile it shows finished
        });
  
        // Create "Stop Connecting" button
        const stopButton = document.createElement('button');
        stopButton.innerText = 'Stop Connecting'; 
        // give button styles
        stopButton.style.position = 'fixed'; 
        stopButton.style.top = '110px';
        stopButton.style.right = '20px';
        stopButton.style.fontSize = '1.5rem';
        stopButton.style.fontWeight = '500';
        stopButton.style.padding = '10px';
        stopButton.style.zIndex = 1000;
        stopButton.style.borderRadius = '20px';
        stopButton.style.borderWidth = '1px';
        stopButton.style.borderStyle = 'solid';
        stopButton.style.borderColor = '#c0392b';
        stopButton.style.color = '#c0392b';
        stopButton.style.backgroundColor = 'white';
  
        stopButton.addEventListener('click', () => {
            stopConnecting = true; // Set the stop flag to true
            alert('Stopped connecting with profiles.'); // shows stop message
        });
  
        // Append buttons to the document
        document.body.appendChild(connectButton);
        document.body.appendChild(stopButton);
    },
  });
  