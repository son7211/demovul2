const { Octokit } = require("@octokit/core");
const { paginateRest } = require("@octokit/plugin-paginate-rest");

const core = require('@actions/core');
const github = require('@actions/github');

// const { Parser } = require('json2csv');

// const fs = require('fs');
const { context } = require("@actions/github/lib/utils");

const MyOctokit = Octokit.plugin(paginateRest);
const octokit = new MyOctokit({
    auth: core.getInput('github_token'),
    // userAgent: 'myApp v0.0.1',
    baseUrl: 'https://api.github.com'
});

// get code scanning results api

octokit.paginate('GET /repos/{owner}/{repo}/code-scanning/alerts', {
    owner: github.context.repo.owner, //core.getInput('repo_owner'),
    repo: github.context.repo.repo, //repo: core.getInput('repository_name'),
    per_page: 100,
});