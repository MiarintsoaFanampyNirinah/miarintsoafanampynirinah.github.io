<script>
// Bloquer clic droit
document.addEventListener('contextmenu', event => event.preventDefault());

// Bloquer certaines touches
document.addEventListener('keydown', function (event) {
    if (
        event.keyCode === 123 || // F12
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I
        (event.ctrlKey && event.keyCode === 85) || // Ctrl+U
        (event.ctrlKey && event.keyCode === 83)    // Ctrl+S
    ) {
        event.preventDefault();
    }
});
</script>
