#!/usr/bin/env node
/**
 * Bump version in package.json without invoking npm/pnpm.
 * Usage: node scripts/bump-version.cjs [patch|minor|major|<version>]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const arg = process.argv[2] || 'patch';

function bump(version, kind) {
  const m = version.match(/^(\d+)\.(\d+)\.(\d+)(.*)?$/);
  if (!m) throw new Error(`Invalid semver: ${version}`);
  let major = Number(m[1]);
  let minor = Number(m[2]);
  let patch = Number(m[3]);
  switch (kind) {
    case 'patch':
      patch += 1;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    default:
      if (/^\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/.test(kind)) return kind;
      throw new Error(`Unsupported bump type: ${kind}`);
  }
  return `${major}.${minor}.${patch}`;
}

pkg.version = bump(pkg.version, arg);
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
process.stdout.write(`v${pkg.version}\n`);