const fs = require("fs");
const path = require("path");

const LIVE_API_URL = "https://live-api-wildlifenl.uu.nl";
const TEST_API_URL = "https://test-api-wildlifenl.uu.nl";

function normalizeBranch(value) {
    if (!value) {
        return "";
    }

    const trimmed = String(value).trim();
    const heads = trimmed.match(/(?:^|.*\/)refs\/heads\/([^\s]+)$/) || trimmed.match(/^refs\/heads\/([^\s]+)$/);
    if (heads) {
        return heads[1];
    }

    if (trimmed.startsWith("ref:")) {
        return normalizeBranch(trimmed.slice(4).trim());
    }

    return trimmed;
}

function branchFromGit() {
    const gitDir = path.join(process.cwd(), ".git");

    try {
        const head = fs.readFileSync(path.join(gitDir, "HEAD"), "utf8").trim();
        if (head.startsWith("ref:")) {
            return normalizeBranch(head);
        }
    } catch (error) {
        return "";
    }

    try {
        const log = fs.readFileSync(path.join(gitDir, "logs", "HEAD"), "utf8");
        const lines = log.trim().split(/\r?\n/);
        for (let index = lines.length - 1; index >= 0; index -= 1) {
            const refMatch = lines[index].match(/refs\/heads\/([^\s]+)/);
            if (refMatch) {
                return refMatch[1];
            }
        }
    } catch (error) {
        return "";
    }

    return "";
}

function detectBranch() {
    const candidates = [
        process.env.OPENSHIFT_BUILD_REFERENCE,
        process.env.SOURCE_REF,
        process.env.GIT_BRANCH,
        process.env.GITHUB_REF_NAME,
        process.env.CI_COMMIT_REF_NAME,
        process.env.BRANCH_NAME,
    ];

    for (const candidate of candidates) {
        const branch = normalizeBranch(candidate);
        if (branch) {
            return branch;
        }
    }

    return branchFromGit();
}

function apiUrlForBranch(branch) {
    if (branch === "main" || branch === "master") {
        return LIVE_API_URL;
    }

    return TEST_API_URL;
}

const envPath = path.join(process.cwd(), ".env");

if (process.env.REACT_APP_API_URL || fs.existsSync(envPath)) {
    console.log("Using the API URL already configured for this environment.");
    process.exit(0);
}

const branch = detectBranch();
const apiUrl = apiUrlForBranch(branch);

fs.writeFileSync(envPath, `REACT_APP_API_URL="${apiUrl}"\n`);
console.log(`Branch "${branch || "unknown"}" uses ${apiUrl}`);
