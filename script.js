const form = document.querySelector("#generate");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const textarea = document.getElementById("userText");

    const wallpaper = formData.get("wallpaper");
    const killKey = formData.get("killKey") || "q";


    // ⛔ OVERWRITE previous content (not append)
    textarea.value = `\n# Set background with feh\nexec_always --no-startup-id feh --bg-scale ${wallpaper}
    \n# Kill focused window\nbindsym $mod+Shift+${killKey} kill
    `;
});

function saveToFile() {
    const content = document.getElementById("userText").value;

    const baseConfig = `# i3 config\nset $mod Mod4`;
    const finalContent = `${baseConfig}\n${content}`.replace(/\n/g, "\r\n");

    const blob = new Blob([finalContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "config";
    a.click();

    URL.revokeObjectURL(url);
}
