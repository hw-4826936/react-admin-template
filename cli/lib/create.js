import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 创建新项目
 */
export async function createProject(projectName, templatePath, options) {
  // 如果没有提供项目名称，提示用户输入
  if (!projectName) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: 'my-react-admin-app',
        validate: (input) => {
          if (!input.trim()) {
            return 'Project name cannot be empty';
          }
          if (!/^[a-z0-9-]+$/.test(input)) {
            return 'Project name can only contain lowercase letters, numbers, and hyphens';
          }
          return true;
        },
      },
    ]);
    projectName = answer.projectName;
  }

  const targetPath = path.resolve(process.cwd(), projectName);

  // 检查目标目录是否已存在
  if (await fs.pathExists(targetPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Directory ${projectName} already exists. Overwrite?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('Operation cancelled.'));
      process.exit(0);
    }

    await fs.remove(targetPath);
  }

  const spinner = ora('Creating project...').start();

  try {
    // 复制模板文件
    spinner.text = 'Copying template files...';
    await copyTemplate(templatePath, targetPath, projectName);

    // 替换项目名称等变量
    spinner.text = 'Configuring project...';
    await replaceVariables(targetPath, projectName);

    spinner.succeed(chalk.green(`Project ${projectName} created successfully!`));

    // 安装依赖
    let shouldInstall = false;
    if (!options.skipInstall) {
      const { install } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'install',
          message: 'Install dependencies now?',
          default: true,
        },
      ]);

      shouldInstall = install;

      if (install) {
        const installSpinner = ora('Installing dependencies...').start();
        try {
          process.chdir(targetPath);
          execSync('pnpm install', { stdio: 'inherit' });
          installSpinner.succeed(chalk.green('Dependencies installed successfully!'));
        } catch (error) {
          installSpinner.fail(chalk.red('Failed to install dependencies'));
          console.log(chalk.yellow('You can install dependencies manually with: pnpm install'));
          shouldInstall = false;
        }
      }
    }

    // 显示下一步操作
    console.log('\n' + chalk.cyan('Next steps:'));
    console.log(chalk.gray(`  cd ${projectName}`));
    if (options.skipInstall || !shouldInstall) {
      console.log(chalk.gray('  pnpm install'));
    }
    console.log(chalk.gray('  pnpm dev'));
    console.log('');
  } catch (error) {
    spinner.fail(chalk.red(`Failed to create project: ${error.message}`));
    process.exit(1);
  }
}

/**
 * 复制模板文件
 */
async function copyTemplate(templatePath, targetPath, projectName) {
  // 需要排除的文件和目录
  const excludePatterns = [
    'node_modules',
    'dist',
    '.git',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',
    '.DS_Store',
    '*.log',
  ];

  await fs.ensureDir(targetPath);

  const files = await fs.readdir(templatePath);

  for (const file of files) {
    // 跳过排除的文件
    if (excludePatterns.some((pattern) => file.includes(pattern))) {
      continue;
    }

    const srcPath = path.join(templatePath, file);
    const destPath = path.join(targetPath, file);

    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.copy(srcPath, destPath);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}

/**
 * 替换文件中的变量
 */
async function replaceVariables(targetPath, projectName) {
  const filesToReplace = ['package.json', 'README.md', 'index.html'];

  // 将项目名称转换为各种格式
  const projectNameKebab = projectName.toLowerCase().replace(/\s+/g, '-');
  const projectNamePascal = projectName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  for (const file of filesToReplace) {
    const filePath = path.join(targetPath, file);
    if (await fs.pathExists(filePath)) {
      let content = await fs.readFile(filePath, 'utf-8');

      // 替换变量
      content = content.replace(/react-admin-template/g, projectNameKebab);
      content = content.replace(/React Admin Template/g, projectNamePascal);

      await fs.writeFile(filePath, content, 'utf-8');
    }
  }
}
