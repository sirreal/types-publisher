"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const yargs = require("yargs");
const secrets_1 = require("./lib/secrets");
const settings_1 = require("./lib/settings");
const webhook_server_1 = require("./lib/webhook-server");
const util_1 = require("./util/util");
if (!module.parent) {
    const remote = yargs.argv.remote;
    const port = parseInt(process.env.PORT, 10);
    if (!port) {
        throw new Error("Must provide PORT");
    }
    const url = remote ? "http://typespublisher.azurewebsites.net" : `http://localhost:${port}`;
    util_1.done(main(url));
}
function main(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield secrets_1.getSecret(secrets_1.Secret.GITHUB_SECRET);
        const body = JSON.stringify({ ref: `refs/heads/${settings_1.sourceBranch}` });
        const headers = { "x-hub-signature": webhook_server_1.expectedSignature(key, body) };
        const resp = yield node_fetch_1.default(url, { method: "POST", body, headers });
        console.log(yield resp.text());
    });
}
//# sourceMappingURL=make-server-run.js.map