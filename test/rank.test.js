const test = require("node:test");
const assert = require("node:assert");

const command = require("../src/commands/rank.js");
const { redact } = require("../src/logger.js");

// These tests run fully offline — no Discord token, no network.

test("rank command exposes correct slash-command metadata", () => {
    const json = command.data.toJSON();
    assert.strictEqual(json.name, "rank");
    assert.ok(json.description.length > 0);
    assert.strictEqual(typeof command.execute, "function");
    // The command requires exactly one string option (the name#tag#region input).
    assert.strictEqual(json.options.length, 1);
    assert.strictEqual(json.options[0].required, true);
});

test("logger redacts secret-shaped strings", () => {
    const line = "Auth failed with Bearer aaa.bbb.ccc and sk-ABCDEFGHIJKLMNOPQRSTUVWX";
    const redacted = redact(line);
    assert.ok(!redacted.includes("Bearer aaa.bbb.ccc"));
    assert.ok(!redacted.includes("sk-ABCDEFGHIJKLMNOPQRSTUVWX"));
    assert.ok(redacted.includes("***"));
});
