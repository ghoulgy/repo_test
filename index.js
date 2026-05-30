const { execSync, spawn } = require('child_process');

console.log("Starting script...\n");

// ==========================================
// Method 1: Using execSync (Synchronous)
// ==========================================
// execSync runs the command in a shell and blocks the Node.js event loop 
// until the command finishes executing.
console.log("1. Launching Calculator via execSync...");
try {
    // Windows command to open calculator
    execSync('calc');
    console.log("   execSync finished executing.\n");
} catch (error) {
    console.error("   execSync failed:", error.message);
}

// ==========================================
// Method 2: Using spawn (Asynchronous)
// ==========================================
// spawn does not use a shell by default and executes asynchronously.
// It is ideal for launching independent background applications.
console.log("2. Launching Calculator via spawn...");

const calcProcess = spawn('calc.exe', [], {
    detached: true,  // Allows the child process to run independently of this Node script
    stdio: 'ignore'  // Ignores the child's input/output streams so it can fully detach
});

// Calling unref() removes this child process from Node's event loop reference count.
// This allows the Node script to finish and exit without waiting for you to close the Calculator.
calcProcess.unref();

console.log("   spawn dispatched successfully. Node.js can now exit while the calculator stays open.");
