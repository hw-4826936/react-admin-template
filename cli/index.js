#!/usr/bin/env node

import { program } from 'commander';
import { createProject } from './lib/create.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
  .name('create-react-admin-app')
  .description('Create a new React Admin template project')
  .version('1.0.0')
  .argument('[project-name]', 'Project name')
  .option('-t, --template <template>', 'Template version', 'latest')
  .option('--skip-install', 'Skip dependency installation')
  .action(async (projectName, options) => {
    const templatePath = resolve(__dirname, 'template');
    await createProject(projectName, templatePath, options);
  });

program.parse();
