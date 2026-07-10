const winston = require("winston");
const path = require("node:path");
require("winston-daily-rotate-file");

// Collect exact secret values (if config.json is present) so they can be
// stripped from any log line. config.json is optional here — it is absent in
// CI/tests, where the regex patterns below still provide defense in depth.
const secretValues = [];
try {
    const { token } = require("../config.json");
    if (token) secretValues.push(token);
} catch {
    // No config.json available; rely on pattern-based redaction only.
}

// Common secret shapes to redact even if the exact value isn't known.
const SECRET_PATTERNS = [
    /[MNOm][\w-]{23,25}\.[\w-]{6}\.[\w-]{27,}/g, // Discord bot token
    /Bearer\s+[\w-]+\.[\w-]+\.[\w-]+/gi,          // Bearer JWT
    /sk-[A-Za-z0-9]{20,}/g,                       // OpenAI-style keys
    /\b[0-9a-f]{64}\b/gi,                          // 64-hex secrets
];

function redact(input) {
    if (typeof input !== "string") return input;
    let out = input;
    for (const value of secretValues) {
        if (value) out = out.split(value).join("***");
    }
    for (const pattern of SECRET_PATTERNS) out = out.replace(pattern, "***");
    return out;
}

const redactFormat = winston.format((info) => {
    if (typeof info.message === "string") info.message = redact(info.message);
    return info;
})();

// Resolve the log path relative to this file, not the process CWD, so logs land
// in <repo>/logs regardless of where the bot is started from.
const dashLog = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, "..", "logs", "dash-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
});

const dash = winston.createLogger({
    format: winston.format.combine(
        redactFormat,
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        dashLog,
        new winston.transports.Console(),
    ],
});

module.exports = {
    dashLogger: dash,
    redact,
};
